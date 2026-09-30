import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export interface DbCredentials {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

function throwIfUndefined(envVar: string | undefined, varName: string): string {
  if (!envVar) {
    throw new Error(`${varName} environment variable is not set`);
  }
  return envVar;
}

const dbCredentials: DbCredentials = {
  host: process.env.DB_HOST
    ? process.env.DB_HOST
    : throwIfUndefined(process.env.DB_HOST, 'DB_HOST'),

  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER
    ? process.env.DB_USER
    : throwIfUndefined(process.env.DB_USER, 'DB_USER'),
  password: process.env.DB_PASSWORD
    ? process.env.DB_PASSWORD
    : throwIfUndefined(process.env.DB_PASSWORD, 'DB_PASSWORD'),
  database: process.env.DB_NAME
    ? process.env.DB_NAME
    : throwIfUndefined(process.env.DB_NAME, 'DB_NAME'),
};

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schemas.ts',
  out: './drizzle',
  dbCredentials: {
    ...dbCredentials,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
