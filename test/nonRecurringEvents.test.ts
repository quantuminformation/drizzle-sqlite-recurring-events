// stored in test/non-repeating-events.test.ts:
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { db, schema } from '../db'
import { eventsInDayRange } from '../db/util'
import { allDayOneEvents, allDayZeroEvents, allNonRecurringEvents, eventDayZero10_12 } from './nonRecurringEvents'
import { dayOne, dayTwo, dayZero } from './test-constants'
import { sql } from '../db/db'
import { seedDatabase } from '../db/seed'
import { resetDatabase } from './testUtils'

console.log('nonRecurringEvents.test.ts')
beforeAll(async () => {
  await resetDatabase()
  await seedDatabase()
})

describe('Event data tests', () => {
  it('should have all seeded non recurring events', async () => {
    const events = await db
      .select()
      .from(schema.event)
      .where(sql`${schema.event.is_recurring} = 0`)

    expect(events).toBeDefined()
    expect(events.length).toEqual(allNonRecurringEvents.length)
  })

  it('eventsInDayRanges', async () => {
    let events = await eventsInDayRange(dayZero, dayOne, false)
    expect(events).toBeDefined()
    expect(events.length).toEqual(allDayZeroEvents.length)

    events = await eventsInDayRange(dayZero, dayTwo, false)
    expect(events.length).toEqual(allDayOneEvents.length + allDayZeroEvents.length)

    //check time comparison accuracy by searching a millisecond after the event eventDayZero10_12
    events = await eventsInDayRange(
      new Date(eventDayZero10_12.startDate.getTime()),
      new Date(eventDayZero10_12.startDate.getTime() + 1),
      false,
    )
    expect(events.length).toEqual(1)

    //check time comparison accuracy by searching +1 & +2 millisecond after the event eventDayZero10_12
    events = await eventsInDayRange(
      new Date(eventDayZero10_12.startDate.getTime() + 1),
      new Date(eventDayZero10_12.startDate.getTime() + 2),
    )
    expect(events.length).toEqual(0)
  })
})
