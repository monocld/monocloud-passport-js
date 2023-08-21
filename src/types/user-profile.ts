import { IdTokenClaims, UserinfoResponse } from 'openid-client';
import { ClaimType } from './claim-type';

export type UserProfile = {
  id_token?: IdTokenClaims & {
    token: string;
  };
  user_info?: UserinfoResponse<
    {
      [key: string]: ClaimType;
    },
    {
      [key: string]: ClaimType;
    }
  >;
};
