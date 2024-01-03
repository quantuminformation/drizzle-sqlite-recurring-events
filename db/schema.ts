import { relations, sql } from 'drizzle-orm'
import { integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const event = sqliteTable('event', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  startDate: integer('start_time', { mode: 'timestamp_ms' }).notNull(),
  endDate: integer('end_time', { mode: 'timestamp_ms' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  deletedAt: integer('deleted_at', { mode: 'timestamp_ms' }),
  is_recurring: integer('is_recurring', { mode: 'boolean' }).notNull().default(false),
})
export type Event = typeof event.$inferInsert

// Define the recurring_type table
export const recurring_type = sqliteTable('recurring_type', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  type: text('type').notNull(), // 'Daily', 'Weekly', 'Monthly', 'Yearly'
})

// Define the recurring_pattern table for the event
export const recurring_pattern = sqliteTable(
  'recurring_pattern',
  {
    event_id: integer('event_id')
      .notNull()
      .references(() => event.id, { onDelete: 'cascade' }),
    separationCount: integer('separation_count').notNull().default(0),
    maxOccurrences: integer('max_num_of_occurrences'),
    endDate: integer('end_date', { mode: 'timestamp_ms' }),
    dayOfWeek: integer('day_of_week'),
    weekOfMonth: integer('week_of_month'),
    dayOfMonth: integer('day_of_month'),
    monthOfYear: integer('month_of_year'),
    recurring_type_id: integer('recurring_type_id').references(() => recurring_type.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.event_id] }),
  }),
)
export type RecurringPattern = typeof recurring_pattern.$inferInsert
