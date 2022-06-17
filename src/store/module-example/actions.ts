import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ExampleStateInterface } from './state';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { get, onChildAdded, ref, set } from 'firebase/database';
import { auth, db } from 'src/boot/firebase';

const actions: ActionTree<ExampleStateInterface, StateInterface> = {
  register(_, payload) {
    createUserWithEmailAndPassword(auth, payload.email, payload.password)
      .then((userCredential) => {

        set(ref(db, `users/${userCredential.user.uid}`), {
          name: payload.name,
          email: payload.email,
          online: true
        });

      })
      .catch((error) => console.log(error));
  },
  login({ commit }, payload) {
    signInWithEmailAndPassword(auth, payload.email, payload.password)
      .then(({ user }) => {
        commit("setUserDetails", {
          email: user.email,
          userId: user.uid
        });
      })
      .catch((error) => console.log(error));
  },
  logout({ commit, dispatch, state }) {
    signOut(auth);
    commit('setUserDetails', {});

    dispatch('firebaseUpdateUser', {
      userId: state.userDetails.userId,
      updates: {
        online: true
      }
    });

  },
  handleAuthStateChanged({ commit, dispatch, state }) {
    onAuthStateChanged(auth, user => {
      if (user) {
        get(ref(db, `users/${user.uid}`)).then((snapshot) => {

          commit("setUserDetails", {
            name: snapshot.val().name,
            email: snapshot.val().email,
            userId: user.uid
          });

          dispatch('firebaseUpdateUser', {
            userId: state.userDetails.userId,
            updates: {
              online: true
            }
          });

          dispatch('firebaseGetUsers');

          //@ts-ignore
          this.$router.push('/');

        }).catch((error) => console.error(error));
      } else {

        dispatch('firebaseUpdateUser', {
          userId: state.userDetails.userId,
          updates: {
            online: false
          }
        });

        commit('setUserDetails', {});
        //@ts-ignore
        this.$router.replace('/auth');
      }
    });
  },
  firebaseUpdateUser(_, payload) {
    if (payload.userId) {
      set(ref(db, `users/${payload.userId}`), payload.updates);
    }
  },
  firebaseGetUsers({ commit }) {
    onChildAdded(ref(db, 'users'), (data) => {
      commit('addUser', {
        userId: data.key,
        userDetails: data.val()
      });
    });
  }
};

export default actions;
