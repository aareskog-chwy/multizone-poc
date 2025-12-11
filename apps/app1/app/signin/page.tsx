'use client';

import { authClient } from '@repo/auth/auth-client';

export default function Signin() {
    const handleSignin = async () => {
        await authClient.signIn.oauth2({
            providerId: 'okta'
        });
    }

    return <button onClick={handleSignin}>Sign in</button>;
}