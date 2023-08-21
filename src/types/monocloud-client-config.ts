export interface MonoCloudClientConfig {
  issuer: string;
  client_id: string;
  client_secret: string;
  login_callback_url: string;
  post_logout_redirect_url: string;
  scopes: string;
}
