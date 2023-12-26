import { Event } from '../db/schema'

export const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000
export const MILLISECONDS_IN_AN_HOUR = 60 * 60 * 1000

// trickle down constants
export const dayZeroYear = 2025
export const dayZeroMonth = 0
export const dayZeroDay = 1
export const dayZero = new Date(dayZeroYear, dayZeroMonth, dayZeroDay)

// make a new date object one day after dayZero
export const dayOne = new Date(dayZero)
dayOne.setDate(dayOne.getDate() + 1)

export const dayZeroOneHourEvent: Event = {
  name: 'Event 1',
  startTime: dayZero,
  endTime: new Date(dayZero.getTime() + MILLISECONDS_IN_AN_HOUR),
}
