import { Event } from '../db/schema'
import { dayOne, dayZero, MILLISECONDS_IN_AN_HOUR } from './test-constants'

export const eventDayZero10_12: Event = {
  name: 'Event 1',
  // make time 10am to Temporal
  startDate: dayZero.add({ hours: 10 }).epochMilliseconds,
  endDate: dayZero.add({ hours: 12 }).epochMilliseconds,
}
export const eventDayZero11_13: Event = {
  name: 'Event 2',
  startDate: dayZero.add({ hours: 11 }).epochMilliseconds,
  endDate: dayZero.add({ hours: 13 }).epochMilliseconds,
}

export const allDayZeroEvents = [eventDayZero10_12, eventDayZero11_13]

export const eventDayOne09_13: Event = {
  name: 'Event 1.1',
  startDate: dayOne.add({ hours: 9 }).epochMilliseconds,
  endDate: dayOne.add({ hours: 13 }).epochMilliseconds,
}
export const eventDayOne10_12: Event = {
  name: 'Event 1.2',
  startDate: dayOne.add({ hours: 10 }).epochMilliseconds,
  endDate: dayOne.add({ hours: 12 }).epochMilliseconds,
}
export const eventDayOne11_13: Event = {
  name: 'Event 1.3',
  startDate: dayOne.add({ hours: 11 }).epochMilliseconds,
  endDate: dayOne.add({ hours: 13 }).epochMilliseconds,
}

export const allDayOneEvents = [eventDayOne09_13, eventDayOne10_12, eventDayOne11_13]
export const allNonRecurringEvents = [...allDayZeroEvents, ...allDayOneEvents]
