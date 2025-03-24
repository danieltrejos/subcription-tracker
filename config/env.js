import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENVIRONMENT || 'development'}.local` });

export const { PORT, NODE_ENVIRONMENT, DB_URI } = process.env;