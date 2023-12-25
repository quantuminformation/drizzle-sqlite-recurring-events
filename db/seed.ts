import { db, schema } from './db.server'



const events = await db
    .insert(schema.event)
    .values([
        {
            name: 'Event 1',
            startTime: new Date(2025, 1, 1, 19, 0, 0).getTime(),
            endTime: new Date(2025, 1, 1, 20, 0, 0).getTime(),
        },
    ])
    .returning('*')

await db
    .insert(schema.recurring_type)
    .values([
        { recurring_type: 'Daily' },
        { recurring_type: 'Weekly' },
        { recurring_type: 'Monthly' },
        { recurring_type: 'Yearly' },
    ])
    .returning()

console.log('Seed complete!')
