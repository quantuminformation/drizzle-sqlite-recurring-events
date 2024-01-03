import { db, schema } from './db'
import {allNonRecurringEvents} from "../test/nonRecurringEvents";

// Seed function
export async function seedDatabase() {
  console.log('Seeding database...')
  // Insert event
  const events = await db.insert(schema.event).values(allNonRecurringEvents).returning()

  // Insert recurring types
  await db
    .insert(schema.recurring_type)
    .values([{ type: 'Daily' }, { type: 'Weekly' }, { type: 'Monthly' }, { type: 'Yearly' }])
    .returning()

  console.log('Seed complete! Added events:', events.length)
}