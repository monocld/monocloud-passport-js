import { StrategyOptions as DefaultStrategyOptions } from 'openid-client';
import { MonoCloudClient } from '../monocloud-client';

export interface StrategyOptions<
  TClient extends MonoCloudClient = MonoCloudClient
> extends DefaultStrategyOptions<TClient> {
  postLogOutRedirectURL?: string;
}
