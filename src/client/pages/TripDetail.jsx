import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getTripDetails from '@wasp/queries/getTripDetails';
import createAccommodation from '@wasp/actions/createAccommodation';
import createTransport from '@wasp/actions/createTransport';

export function TripDetail() {
  const { tripId } = useParams();
  const { data: trip, isLoading, error } = useQuery(getTripDetails, { tripId });
  const createAccommodationFn = useAction(createAccommodation);
  const createTransportFn = useAction(createTransport);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateAccommodation = () => {
    createAccommodationFn({
      tripId,
      name: 'New Accommodation',
      address: 'New Address',
      checkIn: new Date().toISOString(),
      checkOut: new Date().toISOString(),
    });
  };

  const handleCreateTransport = () => {
    createTransportFn({
      tripId,
      type: 'New Transport',
      departure: new Date().toISOString(),
      arrival: new Date().toISOString(),
    });
  };

  return (
    <div>
      <h1>Trip Details</h1>
      <p>Trip ID: {tripId}</p>

      <h2>Accommodations</h2>
      {trip.accommodations.map((accommodation) => (
        <div key={accommodation.id}>
          <p>Name: {accommodation.name}</p>
          <p>Address: {accommodation.address}</p>
          <p>Check-in: {accommodation.checkIn}</p>
          <p>Check-out: {accommodation.checkOut}</p>
        </div>
      ))}

      <button onClick={handleCreateAccommodation}>Create Accommodation</button>

      <h2>Transport</h2>
      {trip.transports.map((transport) => (
        <div key={transport.id}>
          <p>Type: {transport.type}</p>
          <p>Departure: {transport.departure}</p>
          <p>Arrival: {transport.arrival}</p>
        </div>
      ))}

      <button onClick={handleCreateTransport}>Create Transport</button>

      <Link to='/'>Go back to Dashboard</Link>
    </div>
  );
}