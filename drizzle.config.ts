import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  schema: './src/**/*.schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
   migrations: {
    table: "__drizzle_migrations__",
    schema: "drizzle",
  },
});