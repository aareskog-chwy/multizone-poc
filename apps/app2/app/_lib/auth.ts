import { createAuthInstance } from '@repo/auth/config';

export const auth = createAuthInstance(
    process.env.OKTA_CLIENT_ID as string,
    process.env.OKTA_CLIENT_SECRET as string,
    process.env.OKTA_ISSUER as string
);
