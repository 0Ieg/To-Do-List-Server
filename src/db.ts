import { Pool } from "pg";

export const db = new Pool({
  user: '***',
  password: '***',
  host: 'localhost',
  port: 5432,
  database: 'todos'
})
