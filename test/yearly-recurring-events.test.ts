// stored in test/non-repeating-events.test.ts:
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { recurringEvents, seedRecurringEvents } from './recurringEvents'
import { db, schema } from '../db'
import { allNonRecurringEvents, eventDayZero10_12 } from './nonRecurringEvents'
import { eventsInDayRange } from '../db/util'
import { resetDatabase } from './testUtils'

// console.log('yearly-recurring-events.test.ts')
/*beforeAll(async () => {
  await resetDatabase()
  await seedRecurringEvents()
})*/

describe('Year recurring events tests', () => {
  it.skip('should have all seeded events', async () => {
    const events = await db.select().from(schema.event)
    expect(events).toBeDefined()
    expect(events.length).toEqual(allNonRecurringEvents.length + recurringEvents.length)
  })
  it('should return all recurring and non recurring events with range selector', async () => {
    const events = await eventsInDayRange(new Date(0), new Date(999999999999999), true)
    expect(events.length).toEqual(allNonRecurringEvents.length + recurringEvents.length)
  })
})
