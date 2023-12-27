import { Event } from '../db/schema'

export const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000
export const MILLISECONDS_IN_AN_HOUR = 60 * 60 * 1000

// trickle down constants
export const dayZeroYear = 2025
export const dayZeroMonth = 0
export const dayZeroDay = 1
export const dayZero = new Date(Date.UTC(dayZeroYear, dayZeroMonth, dayZeroDay, 0, 0, 0))

console.log(`dayZero: ${dayZero.toISOString()}`)
console.log(`dayZero: ${dayZero}`)

// make a new date object one day after dayZero
export const dayOne = new Date(dayZero)
dayOne.setDate(dayOne.getDate() + 1)

// make a new date object two days after dayZero
export const dayTwo = new Date(dayZero)
dayTwo.setDate(dayTwo.getDate() + 2)

// make a new date object minus one day from dayZero
export const dayMinusOne = new Date(dayZero)
dayMinusOne.setDate(dayMinusOne.getDate() - 1)

export const eventDayZero10_12: Event = {
  name: 'Event 1',
  startTime: new Date(dayZero.getTime() + 10 * MILLISECONDS_IN_AN_HOUR),
  endTime: new Date(dayZero.getTime() + 12 * MILLISECONDS_IN_AN_HOUR),
}
export const eventDayZero11_13: Event = {
  name: 'Event 2',
  startTime: new Date(dayZero.getTime() + 11 * MILLISECONDS_IN_AN_HOUR),
  endTime: new Date(dayZero.getTime() + 13 * MILLISECONDS_IN_AN_HOUR),
}

export const allDayZeroEvents = [eventDayZero10_12, eventDayZero11_13]
