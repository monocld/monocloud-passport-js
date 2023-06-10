import { MonoCloudClientConfig } from './monocloud-client-config';
import { MonoCloudStrategyConfig } from './monocloud-strategy-config';

export interface MonoCloudConfig
  extends Omit<MonoCloudClientConfig, 'postLogOutRedirectUrls'>,
    MonoCloudStrategyConfig {}
