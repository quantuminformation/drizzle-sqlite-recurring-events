# First time setup

Install dependances

```sh
pnpm i
```

Create migrations

```sh
pnpm run db:migrate:create
pnpm run db:migrate
pnpm run db:seed
```

Create and apply new migrations

```sh
pnpm run db:migrate:create
pnpm db:migrate
```

Apply new migrations after a git pull

```sh
pnpm db:migrate
```

# date conventions based on js datetime

# Schema data storeage info

##Everyday
no pattern needed, only seperation if for example every 2 days then seperation count of 1

##Weekly Recurrence
dayOfWeek, eg 1 would be every monday assuming monday is start of week
bi weekly on tuesday would be dayOfWeek:2, separationCount :1

##monthly recurrance
for every 2nd week, we store weekOfMonth:2
for one day of the month just dayOfMonth, eg 25 for 25th day

11th day of the first month in each quarter
dayOfMonth:11
separationCount:2

# Yearly Recurrence

lets day every 6th june
monthOfYear: 6
dayOfMonth: 6
