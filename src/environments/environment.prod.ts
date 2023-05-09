export const environment = {
  production: true,
  keycloak: {
    params: {
      realm: 'api-platform',
      url: 'https://sso.dev.fillbot.app',
      clientId: 'admin-web',
    },
    redirectUri: window.location.origin,
  },
};
