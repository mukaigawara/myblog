import { createClient } from 'microcms-js-sdk';


export const client = createClient({
    serviceDomain: 'hr1jqqc4j2',
    apiKey: process.env.API_KEY as string,
  });

