import HttpError from '@wasp/core/HttpError.js'

export const getTrips = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Trip.findMany({
    where: {
      userId: context.user.id
    }
  })
}

export const getTripDetails = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const trip = await context.entities.Trip.findUnique({
    where: { id: args.tripId },
    include: { accommodations: true, transports: true, user: true }
  })

  if (!trip) { throw new HttpError(400) }

  if (trip.userId !== context.user.id) { throw new HttpError(400) }

  return trip
}