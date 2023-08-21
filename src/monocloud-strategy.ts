import {
  Issuer,
  Strategy,
  StrategyVerifyCallback,
  StrategyVerifyCallbackReq,
  StrategyVerifyCallbackReqUserInfo,
  StrategyVerifyCallbackUserInfo,
  TokenSet,
  UserinfoResponse,
  custom,
} from 'openid-client';
import { MonoCloudClient } from './monocloud-client';
import { UserProfile } from './types/user-profile';
import { StrategyOptions } from './types/strategy-options';
import { MonoCloudClientConfig } from './types/monocloud-client-config';

export class MonoCloudStrategy<TProfile = UserProfile> extends Strategy<
  TProfile,
  MonoCloudClient
> {
  client: MonoCloudClient;

  public constructor(
    options: StrategyOptions<MonoCloudClient>,
    verify:
      | StrategyVerifyCallback<TProfile>
      | StrategyVerifyCallbackUserInfo<TProfile>
      | StrategyVerifyCallbackReq<TProfile>
      | StrategyVerifyCallbackReqUserInfo<TProfile>
  ) {
    super(options, verify);

    if (!options.client) {
      throw new Error('Client not configured');
    }

    this.client = options.client;
  }

  public static init<TProfile = UserProfile>(
    config: MonoCloudClientConfig
  ): MonoCloudStrategy<TProfile> {
    if (!config.issuer) {
      throw new Error('Issuer not configured');
    }

    if (!config.client_id) {
      throw new Error('Client Id not configured');
    }

    if (!config.client_secret) {
      throw new Error('Client secret not configured');
    }

    if (!config.login_callback_url) {
      throw new Error('Login Callback Url not configured');
    }

    if (!config.post_logout_redirect_url) {
      throw new Error('Post Logout Callback Url not configured');
    }

    const issuer = new Issuer({
      issuer: config.issuer,
      authorization_endpoint: `${config.issuer}/connect/authorize`,
      userinfo_endpoint: `${config.issuer}/connect/userinfo`,
      jwks_uri: `${config.issuer}/.well-known/openid-configuration/jwks`,
      token_endpoint: `${config.issuer}/connect/token`,
      end_session_endpoint: `${config.issuer}/connect/endsession`,
      revocation_endpoint: `${config.issuer}/connect/revocation`,
    });

    const client = new issuer.Client({
      client_id: config.client_id,
      client_secret: config.client_secret,
      redirect_uris: [config.login_callback_url],
      post_logout_redirect_uris: config.post_logout_redirect_url
        ? [config.post_logout_redirect_url]
        : [],
      token_endpoint_auth_method: 'client_secret_post',
    });

    client[custom.clock_tolerance] = 5;

    return new MonoCloudStrategy<TProfile>(
      {
        client,
        usePKCE: true,
        params: {
          scope: config.scopes,
        },
        sessionKey: `monocloud:${client.issuer.metadata.issuer}`,
      },
      (
        tokenSet: TokenSet,
        userinfo: UserinfoResponse<any, any>,
        done: (err: any, user?: TProfile) => void
      ): void => {
        const profile: UserProfile = {};

        if (tokenSet.id_token) {
          profile.id_token = { ...tokenSet.claims(), token: tokenSet.id_token };
        }

        profile.user_info = userinfo;

        return done(null, profile as any);
      }
    );
  }

  public signout(idToken?: string): string {
    return this.client.endSessionUrl({
      id_token_hint: idToken,
    });
  }
}
