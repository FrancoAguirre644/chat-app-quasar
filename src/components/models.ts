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

export interface IMessage {
  [key: string]: string | undefined;
  from?: string;
  text?: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface IFirebaseUpdateUserPayload {
  userId: string;
  updates: Object;
}

export interface IFirebaseSendMessage {
  message: IMessage;
  otherUserId: string;
}

export enum Types {
  Positive = "positive",
  Negative = "negative"
}

export interface INotification {
  type: Types
  message: string;
}