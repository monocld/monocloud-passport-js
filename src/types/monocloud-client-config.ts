export interface MonoCloudClientConfig {
  issuer: string;
  clientId: string;
  clientSecret: string;
  postLogInRedirectUrl: string;
  postLogOutRedirectUrls?: string[];
}
