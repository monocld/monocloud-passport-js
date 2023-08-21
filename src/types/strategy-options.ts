import { StrategyOptions as DefaultStrategyOptions } from 'openid-client';
import { MonoCloudClient } from '../monocloud-client';

export type StrategyOptions<TClient extends MonoCloudClient = MonoCloudClient> =
  DefaultStrategyOptions<TClient>;
