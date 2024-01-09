import { Temporal } from 'temporal-polyfill'
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
export const dayZeroMonth = 1
export const dayZeroDay = 1

//initialize a temporal object for dayZero and log a unix timestamp from it
export const dayZero = Temporal.PlainDateTime.from({
  year: dayZeroYear,
  month: dayZeroMonth,
  day: dayZeroDay,
})
  .toZonedDateTime('UTC')
  .toInstant()

//export const dayZero = Temporal.Instant.from(`${`${dayZeroYear}-${dayZeroMonth}-${dayZeroDay}`}T00:00Z`)

console.log(`dayZero: ${dayZero}`)
console.log(`dayZero: ${dayZero.epochMilliseconds}`)

// make a new temporal object one day after dayZero
export const dayOne = Temporal.Instant.from(dayZero).add({ days: 1 })

console.log(`dayOne: ${dayOne}`)
export const dayTwo = Temporal.Instant.from(dayZero).add({ days: 2 })

export const dayMinusOne = Temporal.Instant.from(dayZero).add({ days: -1 })
