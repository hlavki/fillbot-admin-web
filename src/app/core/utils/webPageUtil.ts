
export function getConfiguratorUrl(originSite: string): string {
  const schemePrefix = originSite.startsWith('http') ? '' : 'https://';
  return `${schemePrefix}${originSite}?fillbot-config`;
}
