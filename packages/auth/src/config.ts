import { betterAuth, OAuth2Tokens } from 'better-auth';
import { genericOAuth, openAPI } from 'better-auth/plugins';
import { nextCookies } from "better-auth/next-js";
import { decodeJwt } from 'jose';

export const createAuthInstance = (clientId: string, clientSecret: string, discoveryUrl: string) => betterAuth({
  trustedOrigins: ["http://localhost:3000", "http://localhost:3001"],
  logger: {
    level: 'debug',
  },
  account: {
    updateAccountOnSignIn: true
  },
  user: {
    additionalFields: {
      oktaId: {
        required: true,
        type: 'string',
        input: false,
        returned: true,
      },
      roles: {
        required: false,
        type: 'string[]',
        input: false,
        returned: true,
      }
    }
  },
  plugins: [
    genericOAuth({
      config: [
        // not using pre-configured okta provider because it does not support advanced options like getUserInfo
        {
          providerId: 'okta',
          clientId,
          clientSecret,
          discoveryUrl,
          scopes: ['openid', 'email', 'profile', 'groups', 'offline_access'],
          pkce: true,
          overrideUserInfo: true,
          accessType: 'offline',
          getUserInfo: async (tokens: OAuth2Tokens) => {
            // Add custom fields to user object
            const userToken = decodeJwt(tokens.idToken as string);
            const accessToken = decodeJwt(tokens.accessToken as string);
            return {
              id: userToken.sub as string,
              emailVerified: true,
              email: userToken.email as string,
              name: userToken.name as string,
              roles: accessToken.roles as string[],
              oktaId: userToken.sub as string,
            };
          }
        }
      ],
    }),
    openAPI(),
    nextCookies(), // this should always be last
  ]
});
