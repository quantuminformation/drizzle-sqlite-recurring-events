import { customType } from 'drizzle-orm/sqlite-core'
import { Temporal } from 'temporal-polyfill'

export const customTemporal = customType<{ data: Temporal.PlainDateTime; notNull: true; default: true }>({
  dataType() {
    return 'number'
  },
})
