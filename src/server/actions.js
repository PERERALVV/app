import HttpError from '@wasp/core/HttpError.js'

export const createTrip = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const trip = await context.entities.Trip.create({
    data: {
      destination: args.destination,
      startDate: args.startDate,
      endDate: args.endDate,
      itinerary: args.itinerary,
      userId: context.user.id
    }
  });

  return trip;
}

export const createAccommodation = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { name, address, checkIn, checkOut, tripId } = args;

  const trip = await context.entities.Trip.findUnique({
    where: { id: tripId }
  });
  if (trip.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Accommodation.create({
    data: {
      name,
      address,
      checkIn,
      checkOut,
      trip: { connect: { id: tripId } }
    }
  });
}

export const createTransport = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Transport.create({
    data: {
      type: args.type,
      departure: args.departure,
      arrival: args.arrival,
      trip: {
        connect: { id: args.tripId }
      }
    }
  });
}