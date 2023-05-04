export const environment = {
  production: true,
  keycloak: {
    params: {
      realm: 'api-platform',
      url: 'https://sso.fillbot.app',
      clientId: 'admin-web',
    },
    redirectUri: window.location.origin,
  },
};
