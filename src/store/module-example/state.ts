import { IMessage, IUser, IUserDetails } from "src/components/models";

export interface ExampleStateInterface {
  userDetails: IUserDetails;
  users: IUser;
  messages: IMessage;
}

function state(): ExampleStateInterface {
  return {
    userDetails: {},
    users: {},
    messages: {}
  }
}

export default state;
