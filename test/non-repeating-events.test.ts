// stored in test/non-repeating-events.test.ts:
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
//import { seed } from './seed'; // Import the seed function
import { db, schema } from '../db'
import { eventsInDayRange } from '../db/util'
import {
  allDayOneEvents,
  allDayZeroEvents,
  allEvents,
  dayMinusOne,
  dayOne,
  dayTwo,
  dayZero,
  eventDayZero10_12,
  eventDayZero11_13,
} from './test-constants'

describe('Event data tests', () => {
  it('should have all seeded events', async () => {
    const events = await db.select().from(schema.event)
    expect(events).toBeDefined()
    expect(events.length).toEqual(allEvents.length)
  })

  it('eventsInDayRanges', async () => {
    let events = await eventsInDayRange(dayZero, dayOne)
    expect(events).toBeDefined()
    expect(events.length).toEqual(allDayZeroEvents.length)

    events = await eventsInDayRange(dayZero, dayTwo)
    expect(events.length).toEqual(allDayOneEvents.length + allDayZeroEvents.length)

    //check time comparison accuracy by searching a millisecond after the event eventDayZero10_12
    events = await eventsInDayRange(
      new Date(eventDayZero10_12.startTime.getTime()),
      new Date(eventDayZero10_12.startTime.getTime() + 1),
    )
    expect(events.length).toEqual(1)

    //check time comparison accuracy by searching +1 & +2 millisecond after the event eventDayZero10_12
    events = await eventsInDayRange(
      new Date(eventDayZero10_12.startTime.getTime() + 1),
      new Date(eventDayZero10_12.startTime.getTime() + 2),
    )
    expect(events.length).toEqual(0)
  })
})
