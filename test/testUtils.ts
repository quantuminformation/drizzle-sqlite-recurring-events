import { stat, unlink } from 'fs/promises'
import { fileURLToPath } from 'url'
import { dirname, join, resolve } from 'path'
import { migrateWrapper } from '../db/migrateUtil'

// This utility function will delete the existing SQLite database file and run migrations
export const resetDatabase = async (): Promise<void> => {
  console.log('Resetting database...')
  try {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)
    const dbPath = resolve(join(__dirname, '..', 'sqlite.db'))

    // Try to get the stats of the file, which will throw if the file doesn't exist
    await stat(dbPath)
    // If the file exists, unlink it
    await unlink(dbPath)
    console.log('Database file deleted.')
  } catch (error: unknown) {
    if (error instanceof Error && 'code' in error) {
      if (error['code'] === 'ENOENT') {
        console.log('Database file does not exist, not deleting.')
      } else {
        console.error('Error deleting database file:', error.message)
      }
    } else {
      console.error('An unexpected error occurred:', error)
    }
  } finally {
    // Continue with migration and seeding
    await migrateWrapper()
  }
}
