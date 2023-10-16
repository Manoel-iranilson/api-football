export interface IPayload {
  sub: number;
  email: string;
  imageUser: string;
  iat?: number;
  exp?: number;
}
