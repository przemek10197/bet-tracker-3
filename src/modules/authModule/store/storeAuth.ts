import { defineStore } from 'pinia';
import { auth } from '@/gateways/firebase';
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

import { useStoreTargets } from './../../targetsModule/store/storeTargets';
import type { CredentialsModel, UserModel } from '../models/auth.models';

type State = {
  isUserLoaded: boolean;
  isUserLogged: boolean;
  user: UserModel;
};

export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return {
      isUserLoaded: false,
      isUserLogged: false,
      user: {},
    } as State;
  },
  getters: {},
  actions: {
    async init() {
      const storeTargets = useStoreTargets();

      try {
        await onAuthStateChanged(auth, (user) => {
          if (user) {
            this.user.id = user.uid;
            this.user.email = user.email;
            this.isUserLogged = true;
          } else {
            this.user = {};
            storeTargets.clearTargets();
          }
          this.isUserLoaded = true;
        });
      } catch (error) {
        console.log('error', error);
      }
    },
    registerUser(credentials: Required<CredentialsModel>) {
      if (credentials.email && credentials.password) {
        createUserWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password,
        )
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    },
    loginUser(credentials: Required<CredentialsModel>) {
      if (credentials.email && credentials.password) {
        signInWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password,
        )
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    },
    logoutUser() {
      signOut(auth)
        .then(() => {
          console.log('sign out');
          this.isUserLogged = false;
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
  },
});
