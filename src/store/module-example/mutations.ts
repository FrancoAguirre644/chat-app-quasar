import { IUser, IUserDetails } from 'src/components/models';
import { MutationTree } from 'vuex';
import { ExampleStateInterface } from './state';

const mutation: MutationTree<ExampleStateInterface> = {
  setUserDetails(state: ExampleStateInterface, payload: IUserDetails) {
    state.userDetails = payload;
  },
  addUser(state: ExampleStateInterface, payload: IUser) {
    state.users[payload.userId] = payload.userDetails;
  }
};

export default mutation;
