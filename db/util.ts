import {db, eq, schema, sql} from './db'
import { Event } from './schema'
import { and, or } from 'drizzle-orm'

/**
 * Get all events whose UNIX timestamp range is within a UNIX timestamp start and end.
 * Optionally include or exclude recurring events based on the includeRecurring flag.
 */
export const eventsInDayRange = async (start: Date, end: Date, includeRecurring: boolean = true) => {
  console.log(`Querying events from ${start.toISOString()} to ${end.toISOString()}`)

  const filters = [
    sql`${schema.event.startDate} >= ${start.getTime()}`,
    sql`${schema.event.startDate} < ${end.getTime()}`,
  ]
  if (!includeRecurring) {
    filters.push(eq(schema.event.is_recurring, false))
  }

  let query = db
    .select()
    .from(schema.event)
    .where(and(...filters))

  const events = await query.execute()

  console.log(`Found ${events.length} events`)
  return events
}
