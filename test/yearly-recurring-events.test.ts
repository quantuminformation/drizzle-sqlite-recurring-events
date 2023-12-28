// stored in test/non-repeating-events.test.ts:
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { recurringEvents, seedRecurringEvents } from './recurringEvents'
import { db, schema } from '../db'
import { allNonRecurringEvents, eventDayZero10_12 } from './nonRecurringEvents'
import { eventsInDayRange } from '../db/util'

describe('Year recurring events tests', () => {
  beforeAll(async () => {
    await seedRecurringEvents()
  })

  it('should have all seeded events', async () => {
    const events = await db.select().from(schema.event)
    expect(events).toBeDefined()
    expect(events.length).toEqual(allNonRecurringEvents.length + recurringEvents.length)
  })
  it('should only return all recurring events', async () => {
    const events = await eventsInDayRange(new Date(0), new Date(999999999999999), true)
    expect(events.length).toEqual(allNonRecurringEvents.length + recurringEvents.length)
  })
})
