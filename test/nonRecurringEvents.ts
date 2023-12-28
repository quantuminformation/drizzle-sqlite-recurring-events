import { Event } from '../db/schema'
import { dayOne, dayZero, MILLISECONDS_IN_AN_HOUR } from './test-constants'

export const eventDayZero10_12: Event = {
  name: 'Event 1',
  startDate: new Date(dayZero.getTime() + 10 * MILLISECONDS_IN_AN_HOUR),
  endDate: new Date(dayZero.getTime() + 12 * MILLISECONDS_IN_AN_HOUR),
}
export const eventDayZero11_13: Event = {
  name: 'Event 2',
  startDate: new Date(dayZero.getTime() + 11 * MILLISECONDS_IN_AN_HOUR),
  endDate: new Date(dayZero.getTime() + 13 * MILLISECONDS_IN_AN_HOUR),
}

export const allDayZeroEvents = [eventDayZero10_12, eventDayZero11_13]

export const eventDayOne09_13: Event = {
  name: 'Event 1.1',
  startDate: new Date(dayOne.getTime() + 9 * MILLISECONDS_IN_AN_HOUR),
  endDate: new Date(dayOne.getTime() + 13 * MILLISECONDS_IN_AN_HOUR),
}
export const eventDayOne10_12: Event = {
  name: 'Event 1.2',
  startDate: new Date(dayOne.getTime() + 10 * MILLISECONDS_IN_AN_HOUR),
  endDate: new Date(dayOne.getTime() + 12 * MILLISECONDS_IN_AN_HOUR),
}
export const eventDayOne11_13: Event = {
  name: 'Event 1.3',
  startDate: new Date(dayOne.getTime() + 11 * MILLISECONDS_IN_AN_HOUR),
  endDate: new Date(dayOne.getTime() + 13 * MILLISECONDS_IN_AN_HOUR),
}

export const allDayOneEvents = [eventDayOne09_13, eventDayOne10_12, eventDayOne11_13]
export const allNonRecurringEvents = [...allDayZeroEvents, ...allDayOneEvents]
