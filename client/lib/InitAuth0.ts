import { initAuth0 } from '@auth0/nextjs-auth0';

export default initAuth0({
    domain: 'my-purpose.us.auth0.com',
    clientId: '7VnRPDzp95yfrQfHmFDmh6hYoSzgOaz8',
    clientSecret: 'MDHMl3fPoiEM_L1K3TiTXN_2G94V8E9FYKHkyI1tWd0E4k0vI_xhCieD9bXIPkwK',
    scope: 'openid profile',
    redirectUri: 'http://localhost:3000/api/callback',
    postLogoutRedirectUri: 'http://localhost:3000/',
    session: {
        cookieSecret: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        cookieLifetime: 7200,
        storeIdToken: false,
        storeRefreshToken: false,
        storeAccessToken: false
    }
});
