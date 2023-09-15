// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { IEnvironment } from '@core/interfaces/environment.interface';

const envConfig: IEnvironment = (window as any).aokEnv || {};

export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
