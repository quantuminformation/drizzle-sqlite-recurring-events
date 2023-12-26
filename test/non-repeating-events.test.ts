// stored in test/non-repeating-events.test.ts:
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
//import { seed } from './seed'; // Import the seed function
import { db, schema } from '../db'
import { eventsInDayRange } from '../db/util'
import {dayOne, dayZero, dayZeroOneHourEvent} from './test-constants'
import { seedDatabase } from '../db/seed'

// This will run before any tests are executed
beforeAll(async () => {
  await seedDatabase() // Call the seed function to populate the database
})

describe('Event data tests', () => {
  it('should have all seeded events', async () => {
    const events = await db.select().from(schema.event)

    expect(events).toBeDefined()
    expect(events.length).toBeGreaterThan(0) // Assuming the seed function adds at least one event
    expect(events[0].name).toBe(dayZeroOneHourEvent.name) // Assuming the first event seeded is named 'Event 1'
  })

  it('eventsInDayRange', async () => {
    const events = await eventsInDayRange(dayZero, dayOne)
    expect(events).toBeDefined()
    expect(events.length).toBeGreaterThan(0) // Assuming the seed function adds at least one event
    expect(events[0].name).toBe(dayZeroOneHourEvent.name) // Assuming the first event seeded is named 'Event 1'
  })
})
