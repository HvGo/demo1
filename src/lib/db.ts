import { Pool } from "pg";

let pool: Pool | null = null;

export function getPool() {
  if (pool) return pool;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  return pool;
}

export async function sql<T = any>(text: string, params: any[] = []) {
  const p = getPool();
  const res = await p.query(text, params);
  return res as { rows: T[] };
}
