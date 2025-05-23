// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { IEnvironment } from '@core/interfaces/environment.interface';

const fillbotEnv: IEnvironment = (window as any).fillbotEnv || {};

export const environment = {
  production: false,
  keycloak: {
    params: {
      realm: fillbotEnv.keycloakRealm ?? 'fillbot',
      url: fillbotEnv.keycloakUrl ?? 'https://sso.dev.fillbot.app',
      clientId: fillbotEnv.keycloakClientId ?? 'admin-web',
    },
    redirectUri: fillbotEnv.keycloakRedirectUri ?? window.location.origin,
  },
  clientLibUrl: fillbotEnv.clientLibUrl ?? 'https://dev.fillbot.app/client-lib/main.min.js',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
