#!/bin/sh

[[ ! -z "$FILLBOT_APP_TITLE" ]] && FILLBOT_APP_TITLE="\"$FILLBOT_APP_TITLE\"" || FILLBOT_APP_TITLE="null"
[[ ! -z "$FILLBOT_KEYCLOAK_REALM" ]] && FILLBOT_KEYCLOAK_REALM="\"$FILLBOT_KEYCLOAK_REALM\"" || FILLBOT_KEYCLOAK_REALM="null"
[[ ! -z "$FILLBOT_KEYCLOAK_URL" ]] && FILLBOT_KEYCLOAK_URL=$(echo \"$FILLBOT_KEYCLOAK_URL\" | sed -e "s/\//\\\\\//g") || FILLBOT_KEYCLOAK_URL="null"
[[ ! -z "$FILLBOT_KEYCLOAK_CLIENT_ID" ]] && FILLBOT_KEYCLOAK_CLIENT_ID="\"$FILLBOT_KEYCLOAK_CLIENT_ID\"" || FILLBOT_KEYCLOAK_CLIENT_ID="null"
[[ ! -z "$FILLBOT_KEYCLOAK_REDIRECT_URI" ]] && FILLBOT_KEYCLOAK_REDIRECT_URI="\"$FILLBOT_KEYCLOAK_REDIRECT_URI\"" || FILLBOT_KEYCLOAK_REDIRECT_URI="null"
[[ ! -z "$FILLBOT_CLIENT_LIB_URL" ]] && FILLBOT_CLIENT_LIB_URL=$(echo \"$FILLBOT_CLIENT_LIB_URL\" | sed -e "s/\//\\\\\//g") || FILLBOT_CLIENT_LIB_URL="null"

sed \
  -e "s/appTitle:.*/appTitle: ${FILLBOT_APP_TITLE},/g" \
  -e "s/keycloakRealm:.*/keycloakRealm: ${FILLBOT_KEYCLOAK_REALM},/g" \
  -e "s/keycloakUrl:.*/keycloakUrl: ${FILLBOT_KEYCLOAK_URL},/g" \
  -e "s/keycloakClientId:.*/keycloakClientId: ${FILLBOT_KEYCLOAK_CLIENT_ID},/g" \
  -e "s/keycloakRedirectUri:.*/keycloakRedirectUri: ${FILLBOT_KEYCLOAK_REDIRECT_URI},/g" \
  -e "s/clientLibUrl:.*/clientLibUrl: ${FILLBOT_CLIENT_LIB_URL},/g" \
  /usr/share/nginx/html/index.html >/tmp/index.html

cat /tmp/index.html >/usr/share/nginx/html/index.html
rm /tmp/index.html
