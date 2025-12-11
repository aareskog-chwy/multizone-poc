import { createAuthInstance } from '@repo/auth/auth';

export const auth = createAuthInstance(
    process.env.OKTA_CLIENT_ID as string,
    process.env.OKTA_CLIENT_SECRET as string,
    process.env.OKTA_ISSUER as string
);
