import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ExampleStateInterface } from './state';

const getters: GetterTree<ExampleStateInterface, StateInterface> = {
  users: state => {
    let usersFiltered = {};
    Object.keys(state.users).forEach(key => {
      if (key !== state.userDetails.userId) {
        //@ts-ignore
        usersFiltered[key] = state.users[key];
      }
    });
    return usersFiltered;
  }
};

export default getters;
