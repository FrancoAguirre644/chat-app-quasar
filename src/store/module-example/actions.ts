import { ActionTree } from 'vuex';
import { Notify } from 'quasar';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { get, onChildAdded, onChildChanged, push, ref, set, update } from 'firebase/database';
import { StateInterface } from '../index';
import { IFirebaseSendMessage, IFirebaseUpdateUserPayload, ILoginPayload, IRegisterPayload, INotification, Types } from 'src/components/models';
import { ExampleStateInterface } from './state';
import { auth, db } from 'src/boot/firebase';


const actions: ActionTree<ExampleStateInterface, StateInterface> = {
  register({ dispatch }, payload: IRegisterPayload) {
    
    createUserWithEmailAndPassword(auth, payload.email, payload.password)
      .then((userCredential) => {

        set(ref(db, `users/${userCredential.user.uid}`), {
          name: payload.name,
          email: payload.email,
          online: true
        });

      })
      .catch((error) => dispatch('showNotification', { type: Types.Negative, message: error.message }));
  
  },
  login({ commit, dispatch }, payload: ILoginPayload) {

    signInWithEmailAndPassword(auth, payload.email, payload.password)
      .then(({ user }) => {
        commit("setUserDetails", {
          email: user.email,
          userId: user.uid
        });

        dispatch('showNotification', { type: Types.Positive, message: 'Login Successfully.' });

      })
      .catch((error) => dispatch('showNotification', { type: Types.Negative, message: error.message }));

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

    dispatch('showNotification', { type: Types.Positive, message: 'Logout Successfully.' });

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
  firebaseUpdateUser(_, payload: IFirebaseUpdateUserPayload) {
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
  firebaseGetMessages({ state, commit }, otherUserID: string) {
    let userID = state.userDetails.userId;
    onChildAdded(ref(db, `chats/${userID}/${otherUserID}`), (data) => {
      commit('addMessages', {
        messageId: data.key,
        messageDetails: data.val()
      });
    });
  },
  firebaseStopGettingMessages({ commit }) {
    commit('clearMessages');
  },
  firebaseSendMessage({ state }, payload: IFirebaseSendMessage) {

    push(ref(db, `chats/${state.userDetails.userId}/${payload.otherUserId}`), payload.message);

    payload.message.from = 'them';

    push(ref(db, `chats/${payload.otherUserId}/${state.userDetails.userId}`), payload.message);

  },
  showNotification(_, payload: INotification) {
    Notify.create({
      progress: true,
      type: payload.type,
      message: payload.message,
      timeout: 1250,
      actions: [
        {
          icon: "close",
          color: "white"
        },
      ],
    });
  }
};

export default actions;
