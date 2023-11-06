import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getTrips from '@wasp/queries/getTrips';
import createTrip from '@wasp/actions/createTrip';

export function Dashboard() {
  const { data: trips, isLoading, error } = useQuery(getTrips);
  const createTripFn = useAction(createTrip);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateTrip = () => {
    createTripFn({
      destination: 'New Destination',
      startDate: new Date(),
      endDate: new Date(),
      itinerary: 'New Itinerary'
    });
  };

  return (
    <div className="p-4">
      <button
        onClick={handleCreateTrip}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Trip
      </button>

      <ul>
        {trips.map((trip) => (
          <li key={trip.id}>
            <Link to={`/trip/${trip.id}`} className="text-blue-500 hover:underline">
              {trip.destination}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}