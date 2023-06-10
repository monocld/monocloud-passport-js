export interface MonoCloudStrategyConfig {
  postLogOutRedirectUrl?: string;
  passReqToCallback?: boolean;
  usePkce?: boolean;
  scope?: string;
  prompt?: string;
  acrValues?: {
    authenticator?: string | undefined;
    [key: string]: string | undefined;
  };
}
