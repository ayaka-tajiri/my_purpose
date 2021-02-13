import { initAuth0 } from '@auth0/nextjs-auth0';

function getServerSetting(environmentVariable: string, defaultValue: string) {
    if (typeof window === 'undefined') {
        const envVariable = process.env[environmentVariable]
        return (envVariable) ? envVariable : '';
    }
    return defaultValue;
}

export default initAuth0({
    domain: getServerSetting('AUTH0_DOMAIN', ''),
    clientId: getServerSetting('AUTH0_CLIENT_ID', ''),
    clientSecret: getServerSetting('AUTH0_CLIENT_SECRET', ''),
    scope: 'openid profile',
    redirectUri: getServerSetting('REDIRECT_URI', ''),
    postLogoutRedirectUri: getServerSetting('POST_LOGOUT_REDIRECT_URI', ''),
    session: {
        cookieSecret: getServerSetting('SESSION_COOKIE_SECRET', ''),
        cookieLifetime: 7200,
        storeIdToken: false,
        storeRefreshToken: false,
        storeAccessToken: false
    }
});
