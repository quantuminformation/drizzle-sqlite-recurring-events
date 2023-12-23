import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { db } from './db.server'

migrate(db, { migrationsFolder: './drizzle' })
