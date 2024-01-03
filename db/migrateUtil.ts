import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { db } from './db'

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

export const migrateWrapper = async () => {
  try {
    const __dirname = dirname(fileURLToPath(import.meta.url))
    const migrationsPath = join(__dirname, '..', 'drizzle')
    console.log('Migrating the database...')
    await migrate(db, { migrationsFolder: migrationsPath })
    console.log('Database migrated successfully.')
  } catch (error) {
    console.error('Failed to migrate the database:', error)
    throw error
  }
}
