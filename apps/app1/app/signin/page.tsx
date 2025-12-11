'use client';

import { authClient } from '../_lib/auth-client';

export default function Signin() {
    const handleSignin = async () => {
        await authClient.signIn.oauth2({
            providerId: 'okta'
        });
    }

    return <button onClick={handleSignin}>Sign in</button>;
}