// stored in db/util.ts

import { db, schema, sql } from './db'
import { Event } from './schema'
import { and } from 'drizzle-orm'


/**
 * Get all events in a day range
 * @param start
 * @param end
 * @returns {Promise<Event[]>}
 * @example
 * const events = await eventsInDayRange(new Date(2019, 1, 1), new Date(2019, 1, 2))
 * console.log(events)
 * // => [ { id: 1,
 * //        spaceId: 1,
 * //        name: 'Test Event',
 * //        startTime: 1548979200000,
 * //        endTime: 1548982800000,
 * //        recurringTypeId: 1,
 * //        recurringEnd: null,
 * //        createdAt: 2019-01-31T23:00:00.000Z,
 * //        updatedAt: 2019-01-31T23:00:00.000Z } ]
 */
export const eventsInDayRange = async (start: Date, end: Date) => {
  console.log(`${schema.event.startTime} >= ${start.getTime()}`)
  const events = await db
    .select()
    .from(schema.event)
    .where(and(sql`${schema.event.startTime} >= ${start.getTime()}`,
      sql`${schema.event.startTime} < ${end.getTime()}`))

  return events
}
