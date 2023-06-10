import {
  StrategyVerifyCallback,
  StrategyVerifyCallbackReq,
  StrategyVerifyCallbackReqUserInfo,
  StrategyVerifyCallbackUserInfo,
  TokenSet,
  UserinfoResponse,
} from 'openid-client';
import { MonoCloudStrategy } from './monocloud-strategy';
import { MonoCloudConfig } from './types/monocloud-config';
import { UserProfile } from './types/user-profile';
import { ClaimType } from './types/claim-type';
import { discoverAndGetClient } from './helpers';
import { MonoCloudClient } from './monocloud-client';
import { MonoCloudStrategyConfig } from './types/monocloud-strategy-config';
import { MonoCloudClientConfig } from './types/monocloud-client-config';

export { MonoCloudStrategy, discoverAndGetClient };
export type {
  MonoCloudConfig,
  MonoCloudClientConfig,
  MonoCloudStrategyConfig,
  TokenSet,
  UserProfile,
  ClaimType,
  UserinfoResponse,
  MonoCloudClient,
  StrategyVerifyCallback,
  StrategyVerifyCallbackUserInfo,
  StrategyVerifyCallbackReq,
  StrategyVerifyCallbackReqUserInfo,
};
