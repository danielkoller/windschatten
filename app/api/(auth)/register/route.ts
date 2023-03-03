import { NextRequest } from 'next/server';
import { z } from 'zod';

const userSchema = z.object({
  username: z.string(),
  password: z.string(),
  home_district: z.string(),
  work_district: z.string(),
});

export const POST = (request: NextRequest) => {};
