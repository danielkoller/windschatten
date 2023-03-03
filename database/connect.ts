import { config } from 'dotenv-safe';
import postgres from 'postgres';

config();

export const sql = postgres({
  transform: { ...postgres.camel, undefined: null },
});
