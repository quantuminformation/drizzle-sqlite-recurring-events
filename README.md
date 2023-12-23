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