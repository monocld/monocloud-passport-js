import {
  Issuer,
  StrategyVerifyCallback,
  StrategyVerifyCallbackReq,
  StrategyVerifyCallbackReqUserInfo,
  StrategyVerifyCallbackUserInfo,
  TokenSet,
  UserinfoResponse,
  custom,
} from 'openid-client';
import { MonoCloudStrategy } from './monocloud-strategy';
import { UserProfile } from './types/user-profile';
import { ClaimType } from './types/claim-type';
import { MonoCloudClient } from './monocloud-client';
import { MonoCloudClientConfig } from './types/monocloud-client-config';

export { MonoCloudStrategy, Issuer };
export type {
  MonoCloudClientConfig,
  TokenSet,
  UserProfile,
  ClaimType,
  UserinfoResponse,
  MonoCloudClient,
  StrategyVerifyCallback,
  StrategyVerifyCallbackUserInfo,
  StrategyVerifyCallbackReq,
  StrategyVerifyCallbackReqUserInfo,
  custom,
};
