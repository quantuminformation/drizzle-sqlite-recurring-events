// vitest.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
//import { seed } from './seed'; // Import the seed function
import { db, schema } from '../db';

// This will run before any tests are executed
beforeAll(async () => {
//    await seed(); // Call the seed function to populate the database
});

// This will run after all tests are finished
afterAll(async () => {
    // Optionally, you can clear the test data here if you have such a function
    // await clearTestData();
});

describe('Event data tests', () => {
    it('should have seeded event data', async () => {
        // Retrieve event data
        const events = await db.select().from(schema.event)

        // Check that the events are seeded
        expect(events).toBeDefined();
        expect(events.length).toBeGreaterThan(0); // Assuming the seed function adds at least one event
        expect(events[0].name).toBe('Event 1'); // Assuming the first event seeded is named 'Event 1'
    });

    // Additional tests to verify the correctness of the seeded data
});

