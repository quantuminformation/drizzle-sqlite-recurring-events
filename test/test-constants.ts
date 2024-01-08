import { Event, RecurringPattern } from '../db/schema'

// mirrors the data seeded
export const RECURRING_TYPES = {
  DAILY: 1,
  WEEKLY: 2,
  MONTHLY: 3,
  YEARLY: 4,
}

export const MILLISECONDS_IN_AN_HOUR = 60 * 60 * 1000
export const MILLISECONDS_IN_A_DAY = 24 * MILLISECONDS_IN_AN_HOUR
export const MILLISECONDS_IN_A_YEAR = 365 * MILLISECONDS_IN_A_DAY

// trickle down constants assume js date as the standard
export const dayZeroYear = 2025
export const dayZeroMonth = 0
export const dayZeroDay = 1
export const dayZero = new Date(Date.UTC(dayZeroYear, dayZeroMonth, dayZeroDay, 0, 0, 0))

// make a new date object one day after dayZero
export const dayOne = new Date(dayZero)
dayOne.setDate(dayOne.getDate() + 1)

// make a new date object two days after dayZero
export const dayTwo = new Date(dayZero)
dayTwo.setDate(dayTwo.getDate() + 2)

// make a new date object minus one day from dayZero
export const dayMinusOne = new Date(dayZero)
dayMinusOne.setDate(dayMinusOne.getDate() - 1)

console.log(`dayZero: ${dayZero.toISOString()}`)
console.log(`dayZero: ${dayZero}`)
