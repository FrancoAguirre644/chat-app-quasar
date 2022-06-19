import { IUser, IUserDetails } from "src/components/models";

export interface ExampleStateInterface {
  userDetails: IUserDetails;
  users: IUser;
  messages: any;
}

function state(): ExampleStateInterface {
  return {
    userDetails: {},
    users: {},
    messages: {}
  }
}

export default state;
