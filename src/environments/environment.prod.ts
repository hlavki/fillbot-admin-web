export const environment = {
  production: true,
  keycloak: {
    params: {
      realm: 'fillbot',
      url: 'https://sso.dev.fillbot.app',
      clientId: 'admin-web',
    },
    redirectUri: window.location.origin,
  },
  clientLibUrl: 'https://dev.fillbot.app/client-lib/main.min.js',
};
