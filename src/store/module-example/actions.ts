import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ExampleStateInterface } from './state';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { get, onChildAdded, onChildChanged, ref, set, update } from 'firebase/database';
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
    dispatch('firebaseUpdateUser', {
      userId: state.userDetails.userId,
      updates: {
        online: false
      }
    });
    commit('setUserDetails', {});

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
      update(ref(db, `users/${payload.userId}`), payload.updates)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log(error));
    }
  },
  firebaseGetUsers({ commit }) {
    onChildAdded(ref(db, 'users'), (data) => {
      commit('addUser', {
        userId: data.key,
        userDetails: data.val()
      });
    });

    onChildChanged(ref(db, 'users'), (data) => {
      commit('updateUser', {
        userId: data.key,
        userDetails: data.val()
      });
    });
  },
  firebaseGetMessages({ state, commit }, otherUserID) {
    let userID = state.userDetails.userId;
    onChildAdded(ref(db, `chats/${userID}/${otherUserID}`), (data) => {
      commit('addMessages', {
        messageId: data.key,
        messageDetails: data.val()
      });
    });
  }
};

export default actions;
