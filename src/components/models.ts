export interface IUserDetails {
  userId?: string;
  name?: string;
  email?: string;
}

export interface IUser {
  [key: string]: string | IUserDetails | undefined;
  userId?: string;
  userDetails?: IUserDetails;
}