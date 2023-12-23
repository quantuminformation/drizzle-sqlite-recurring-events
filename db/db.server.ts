import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import * as schema from './schema'
export { eq, lt, gte, ne, sql, and, or } from 'drizzle-orm'

const sqlite = new Database('sqlite.db')

export const db = drizzle(sqlite, { schema })

export { schema }
