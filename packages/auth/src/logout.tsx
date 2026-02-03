'use client';

export const LogoutButton = ({ authClient, redirectUrl, children, className }: { authClient: any, redirectUrl: string, children: React.ReactNode, className?: string }) => {
    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    window.location.assign(redirectUrl); // redirect to login page
                },
            },
        });
    }

    return <button onClick={handleLogout} className={className}>{children}</button>;
};
