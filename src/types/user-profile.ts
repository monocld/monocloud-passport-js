import { UserinfoResponse } from 'openid-client';
import { ClaimType } from './claim-type';

export interface UserProfile
  extends UserinfoResponse<
    {
      [key: string]: ClaimType;
    },
    {
      [key: string]: ClaimType;
    }
  > {
  [key: string]: ClaimType;
}
