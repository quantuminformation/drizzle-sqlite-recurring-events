import { Temporal } from 'temporal-polyfill'
import { db, eq, schema, sql } from './db'
import { Event, RecurringPattern } from './schema'
import { and, or } from 'drizzle-orm'

/**
 * Get all events (and event recurrances) whose UNIX timestamp start is within a range.
 * Optionally include or exclude recurring events based on the includeRecurring flag.
 */
export const eventsInDayRange = async (
  rangeStart: Temporal.PlainDateTime,
  rangeEnd: Temporal.PlainDateTime,
  includeRecurring: boolean = true,
) => {
  console.log(`Querying events from ${rangeStart} to ${rangeEnd}`)

  const filters = [
    sql`${schema.event.startDate} >= ${rangeStart.epochMilliseconds}`,
    sql`${schema.event.startDate} < ${rangeEnd.epochMilliseconds}`,
  ]
  if (!includeRecurring) {
    filters.push(eq(schema.event.is_recurring, false))
  }

  let query = db
    .select()
    .from(schema.event)
    .where(and(...filters))
    .leftJoin(schema.recurring_pattern, eq(schema.event.id, schema.recurring_pattern.event_id))

  const allEvents = []

  const eventRecurringPatterns = await query.execute()

  type EventRecurringPattern = typeof eventRecurringPatterns

  let recurringEvents = []

  eventRecurringPatterns
    .filter((eventRecurringPattern) => eventRecurringPattern.recurring_pattern)
    .forEach((eventRecurringPattern) => {
      const occurrences = generateRecurrentEvents(eventRecurringPattern, rangeEnd)
      recurringEvents = [...recurringEvents, ...occurrences]
    })

  console.log(`Found ${eventRecurringPatterns.length} events`)
  return eventRecurringPatterns
}

/**
 *
 * @param eventRecurringPattern The event joined to its recurring pattern
 * @param startDate
 * @param rangeEnd
 * @returns
 */
const generateRecurrentEvents = (eventRecurringPattern: EventRecurringPattern, rangeEnd: Date) => {
  let recurredEvent = []
  let nextRecurrenceDate = calculateNextRecurrenceDate(startDate, eventRecurringPattern)

  while (
    nextRecurrenceDate >= startDate &&
    nextRecurrenceDate < rangeEnd &&
    (eventRecurringPattern.endDate ? nextRecurrenceDate <= eventRecurringPattern.endDate : true)
  ) {
    recurredEvent.push({
      ...eventRecurringPattern,
      startDate: nextRecurrenceDate,
      // Assuming the event duration is the same for each occurrence
      endDate: new Date(
        nextRecurrenceDate.getTime() + (eventRecurringPattern.endDate - eventRecurringPattern.startDate),
      ),
    })
    nextRecurrenceDate = calculateNextRecurrenceDate(nextRecurrenceDate, eventRecurringPattern)
  }

  return recurredEvent
}

// This is a simple example and does not cover all edge cases or recurrence types.
const calculateNextRecurrenceDate = (eventDate, pattern: RecurringPattern) => {
  let nextDate = new Date(eventDate)
  switch (pattern.recurring_type_id) {
    case 1: // Daily
      nextDate.setDate(nextDate.getDate() + 1)
      break
    case 2: // Weekly
      nextDate.setDate(nextDate.getDate() + 7)
      break
    case 3: // Monthly
      nextDate.setMonth(nextDate.getMonth() + 1)
      break
    case 4: // Yearly
      nextDate.setFullYear(nextDate.getFullYear() + 1)
      break
    default:
      throw new Error('Invalid recurring type id')
  }
  return nextDate
}
