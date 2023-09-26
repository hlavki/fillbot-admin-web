import { IEnvironment } from '@core/interfaces/environment.interface';

const fillbotEnv: IEnvironment = (window as any).fillbotEnv || {};

export const environment = {
  production: true,
  keycloak: {
    params: {
      realm: fillbotEnv.keycloakRealm,
      url: fillbotEnv.keycloakUrl,
      clientId: fillbotEnv.keycloakClientId,
    },
    redirectUri: fillbotEnv.keycloakRedirectUri ?? window.location.origin,
  },
  clientLibUrl: fillbotEnv.clientLibUrl,
};
