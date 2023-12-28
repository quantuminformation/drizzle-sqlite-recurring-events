import { Event, recurring_type, RecurringPattern } from '../db/schema'
import {
  dayZero,
  MILLISECONDS_IN_A_DAY,
  MILLISECONDS_IN_A_YEAR,
  MILLISECONDS_IN_AN_HOUR,
  RECURRING_TYPES,
} from './test-constants'
import { db, schema } from '../db'

export const recurringPatterns: RecurringPattern[] = []
export const recurringEvents: Event[] = [] // used in tests length checks

export const seedRecurringEvents = async () => {
  const recurringEventDayZero10_12: Event = {
    name: 'Recurring Event 1',
    startDate: new Date(dayZero.getTime() + 10 * MILLISECONDS_IN_AN_HOUR),
    endDate: new Date(dayZero.getTime() + 12 * MILLISECONDS_IN_AN_HOUR),
    is_recurring: true,
  }

  recurringEvents.push(recurringEventDayZero10_12)
  let newEvent = await db.insert(schema.event).values([recurringEventDayZero10_12]).returning()

  const recurringPatternYearlyWithEndDate: RecurringPattern = {
    recurring_type_id: RECURRING_TYPES.YEARLY,
    end_date: new Date(dayZero.getTime() + MILLISECONDS_IN_A_YEAR * 2),
    event_id: newEvent[0].id,
  }
  recurringPatterns.push(recurringPatternYearlyWithEndDate)
  let pat = await db.insert(schema.recurring_pattern).values(recurringPatterns).returning()
}
