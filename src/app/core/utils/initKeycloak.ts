import { KeycloakService } from 'keycloak-angular';

import { environment } from '@env/environment';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.keycloak.params.url,
        realm: environment.keycloak.params.realm,
        clientId: environment.keycloak.params.clientId,
      },
      initOptions: {
        onLoad: 'check-sso',
        checkLoginIframe: false,
      },
      bearerExcludedUrls: ['/assets'],
    });
}
