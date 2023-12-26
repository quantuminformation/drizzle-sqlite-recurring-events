import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { db } from './db'

export const migrateWrapper = async () => {
  await migrate(db, { migrationsFolder: './drizzle' })
  console.log('Database migrated.')
}