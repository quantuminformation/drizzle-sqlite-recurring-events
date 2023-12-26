// stored in test/non-repeating-events.test.ts:
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
//import { seed } from './seed'; // Import the seed function
import { db, schema } from '../db'
import { eventsInDayRange } from '../db/util'
import { dayMinusOne, dayOne, dayTwo, dayZero, dayZeroOneHourEvent } from './test-constants'
import { seedDatabase } from '../db/seed'
import { stat, unlink } from 'fs/promises'
import { migrateWrapper } from '../db/migrateUtil'

// This will run before any tests are executed

beforeAll(async () => {
  try {
    // Try to get the stats of the file, which will throw if the file doesn't exist
    await stat('../sqlite.db')
    // If the file exists, unlink it
    await unlink('../sqlite.db')
    console.log('Database file deleted.')
  } catch (error) {
    // If an error is thrown, check if it's because the file doesn't exist
    if (error.code === 'ENOENT') {
      console.log('Database file does not exist, not deleting.')
    } else {
      // If the error is not because the file doesn't exist, log the error message
      console.log('Error deleting database file:', error.message)
    }
  }

  // Continue with migration and seeding
  await migrateWrapper()
  await seedDatabase()
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
