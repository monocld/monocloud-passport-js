import { Issuer } from 'openid-client';
import { MonoCloudStrategy } from './monocloud-strategy';
import { MonoCloudClient } from './monocloud-client';
import { MonoCloudClientConfig } from './types/monocloud-client-config';

export const discoverAndGetClient = async (
  config: MonoCloudClientConfig
): Promise<MonoCloudClient> => {
  MonoCloudStrategy.validateClientConfig(config);

  const issuer = await Issuer.discover(config.issuer);
  return new issuer.Client({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    redirect_uris: [config.postLogInRedirectUrl],
    post_logout_redirect_uris: config.postLogOutRedirectUrls,
    token_endpoint_auth_method: 'client_secret_post',
  });
};
