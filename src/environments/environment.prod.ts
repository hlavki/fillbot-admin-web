import { IEnvironment } from '@core/interfaces/environment.interface';

const envConfig: IEnvironment = (window as any).aokEnv || {};

export const environment = {
  production: true,
  keycloak: {
    params: {
      realm: envConfig.keycloakRealm ?? 'fillbot',
      url: envConfig.keycloakUrl ?? 'https://sso.dev.fillbot.app',
      clientId: envConfig.keycloakClientId ?? 'admin-web',
    },
    redirectUri: envConfig.keycloakRedirectUri ?? window.location.origin,
  },
  clientLibUrl: envConfig.clientLibUrl ?? 'https://dev.fillbot.app/client-lib/main.min.js',
};
