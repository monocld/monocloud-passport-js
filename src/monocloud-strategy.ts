import {
  Issuer,
  Strategy,
  StrategyVerifyCallback,
  StrategyVerifyCallbackReq,
  StrategyVerifyCallbackReqUserInfo,
  StrategyVerifyCallbackUserInfo,
  TokenSet,
  UserinfoResponse,
} from 'openid-client';
import { IncomingMessage } from 'http';
import { MonoCloudConfig } from './types/monocloud-config';
import { MonoCloudClient } from './monocloud-client';
import { UserProfile } from './types/user-profile';
import { StrategyOptions } from './types/strategy-options';
import { MonoCloudClientConfig } from './types/monocloud-client-config';
import { MonoCloudStrategyConfig } from './types/monocloud-strategy-config';

export class MonoCloudStrategy<TProfile = UserProfile> extends Strategy<
  TProfile,
  MonoCloudClient
> {
  private readonly options: StrategyOptions<MonoCloudClient>;

  private constructor(
    options: StrategyOptions<MonoCloudClient>,
    verify:
      | StrategyVerifyCallback<TProfile>
      | StrategyVerifyCallbackUserInfo<TProfile>
      | StrategyVerifyCallbackReq<TProfile>
      | StrategyVerifyCallbackReqUserInfo<TProfile>
  ) {
    super(options, verify);
    this.options = options;
  }

  private static callback<TProfile = UserProfile>(
    _tokenset: TokenSet,
    userinfo: UserinfoResponse<any, any>,
    done: (err: any, user?: TProfile) => void
  ): void {
    return done(null, userinfo);
  }

  private static callbackWithRequest<TProfile = UserProfile>(
    _req: IncomingMessage,
    _tokenset: TokenSet,
    userinfo: UserinfoResponse<any, any>,
    done: (err: any, user?: TProfile) => void
  ): void {
    return done(null, userinfo);
  }

  public static init<TProfile = UserProfile>(
    config: MonoCloudConfig,
    verify?:
      | StrategyVerifyCallback<TProfile>
      | StrategyVerifyCallbackUserInfo<TProfile>
      | StrategyVerifyCallbackReq<TProfile>
      | StrategyVerifyCallbackReqUserInfo<TProfile>
  ): MonoCloudStrategy<TProfile> {
    this.validateClientConfig(config);

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
      client_id: config.clientId,
      client_secret: config.clientSecret,
      redirect_uris: [config.postLogInRedirectUrl],
      post_logout_redirect_uris: config.postLogOutRedirectUrl
        ? [config.postLogOutRedirectUrl]
        : [],
      token_endpoint_auth_method: 'client_secret_post',
    });

    return this.initilize(client, config, verify);
  }

  public static initilize<TProfile = UserProfile>(
    client: MonoCloudClient,
    config: MonoCloudStrategyConfig,
    verify?:
      | StrategyVerifyCallback<TProfile>
      | StrategyVerifyCallbackUserInfo<TProfile>
      | StrategyVerifyCallbackReq<TProfile>
      | StrategyVerifyCallbackReqUserInfo<TProfile>
  ): MonoCloudStrategy<TProfile> {
    return new MonoCloudStrategy<TProfile>(
      {
        client,
        usePKCE: config.usePkce,
        params: {
          scope: config.scope,
        },
        sessionKey: `monocloud:${client.issuer.metadata.issuer}`,
        postLogOutRedirectURL: config.postLogOutRedirectUrl,
        passReqToCallback: config.passReqToCallback,
      },
      verify ?? config.passReqToCallback === true
        ? this.callbackWithRequest
        : this.callback
    );
  }

  public static validateClientConfig(config: MonoCloudClientConfig): void {
    if (!config.issuer || config.issuer === '') {
      throw new Error('Issuer not configured');
    }

    if (!config.clientId || config.clientId === '') {
      throw new Error('Client Id not configured');
    }

    if (!config.clientSecret || config.clientSecret === '') {
      throw new Error('Client secret not configured');
    }

    if (!config.postLogInRedirectUrl || config.postLogInRedirectUrl === '') {
      throw new Error('Redirect Url not configured');
    }
  }

  public endSessionUrl(idToken: string): string {
    return this.options.client.endSessionUrl({
      id_token_hint: idToken,
      post_logout_redirect_uri: this.options.postLogOutRedirectURL,
    });
  }
}
