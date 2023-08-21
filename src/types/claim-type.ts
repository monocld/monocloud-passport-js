export type ClaimType =
  | undefined
  | number
  | string
  | boolean
  | { [key: string]: ClaimType }
  | Array<number | string | boolean | { [key: string]: ClaimType }>;
