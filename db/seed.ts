import { db, schema } from './db'
import { Event } from './schema'
import { allDayZeroEvents, eventDayZero10_12 } from '../test/test-constants'

// Seed function
export async function seedDatabase() {
  // Insert event
  const events = await db.insert(schema.event).values(allDayZeroEvents).returning()

  // Insert recurring types
  await db
    .insert(schema.recurring_type)
    .values([{ type: 'Daily' }, { type: 'Weekly' }, { type: 'Monthly' }, { type: 'Yearly' }])
    .returning()

  console.log('Seed complete!')
}

// Call the seed function
seedDatabase().catch(console.error)
