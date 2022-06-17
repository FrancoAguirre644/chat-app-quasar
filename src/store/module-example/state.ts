import { IUser, IUserDetails } from "src/components/models";

export interface ExampleStateInterface {
  userDetails: IUserDetails;
  users: IUser;
}

function state(): ExampleStateInterface {
  return {
    userDetails: {},
    users: {
      userId: '1'
    }
  }
}

export default state;
