import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_API_KEY || process.env.API_KEY || '',
  dataset: 'production',
  useCdn: true,
});