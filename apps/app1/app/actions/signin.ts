'use server';

import { auth } from '../_lib/auth';

export async function signin() {
    const data = await auth.api.signInWithOAuth2({
        body: {
            providerId: 'okta'
        }
    });
    return data;
}