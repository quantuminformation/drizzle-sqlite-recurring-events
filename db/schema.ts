import { relations, sql } from 'drizzle-orm'
import { integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const event = sqliteTable('event', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  startTime: integer('start_time', { mode: 'timestamp' }).notNull(),
  endTime: integer('end_time', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  deletedAt: integer('deleted_at', { mode: 'timestamp_ms' }),
  is_recurring: integer('is_recurring', { mode: 'boolean' }),
})
export type Event = typeof event.$inferSelect

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
    separation_count: integer('separation_count').notNull(),
    max_num_of_occurrences: integer('max_num_of_occurrences'),
    day_of_week: integer('day_of_week'),
    week_of_month: integer('week_of_month'),
    day_of_month: integer('day_of_month'),
    month_of_year: integer('month_of_year'),
    recurring_type_id: integer('recurring_type_id').references(() => recurring_type.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.event_id] }),
  }),
)
