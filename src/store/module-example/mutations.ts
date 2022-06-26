import { IUser, IUserDetails } from 'src/components/models';
import { MutationTree } from 'vuex';
import { ExampleStateInterface } from './state';

const mutation: MutationTree<ExampleStateInterface> = {
  setUserDetails(state: ExampleStateInterface, payload: IUserDetails) {
    state.userDetails = payload;
  },
  addUser(state: ExampleStateInterface, payload: IUser) {
    state.users[payload.userId ? payload.userId : ''] = payload.userDetails;
  },
  updateUser(state: ExampleStateInterface, payload: IUser) {
    //@ts-ignore
    Object.assign(state.users[payload.userId], payload.userDetails);
  },
  addMessages(state: ExampleStateInterface, payload) {
    state.messages[payload.messageId ? payload.messageId : ''] = payload.messageDetails;
  },
  clearMessages(state: ExampleStateInterface) {
    state.messages = {};
  }
};

export default mutation;
