import { defineStore } from 'pinia';
import {
  collection,
  doc,
  addDoc,
  onSnapshot,
  orderBy,
  deleteDoc,
  query,
  CollectionReference,
  updateDoc,
} from 'firebase/firestore';
import type { DocumentData, Query, Unsubscribe } from 'firebase/firestore';

import { db } from '@/gateways/firebase';

import { useStoreAuth } from '@/modules/authModule/store/storeAuth';

import type { SingleBetModel, SinglesStatus } from '../models/singles.models';

let singlesCollectionRef: CollectionReference<DocumentData>;
let singlesCollectionQuery: Query<DocumentData>;
let getSinglesSnapshot: Unsubscribe | null = null;

let singlesStatusCollectionRef: CollectionReference<DocumentData>;
let singlesStatusCollectionQuery: Query<DocumentData>;
let getSinglesStatusSnapshot: Unsubscribe | null = null;

type SinglesStoreState = {
  isSinglesLoaded: boolean;
  singles?: SingleBetModel[];
  singlesStatus?: SinglesStatus;
};

export const useStoreSingles = defineStore('storeSingles', {
  state: () => {
    return {
      singles: [],
      singlesStatus: {},
      isSinglesLoaded: false,
    } as SinglesStoreState;
  },
  getters: {},
  actions: {
    async init() {
      const storeAuth = useStoreAuth();

      if (storeAuth.user.id) {
        singlesCollectionRef = collection(
          db,
          'users',
          storeAuth.user.id,
          'singles',
        );
        singlesCollectionQuery = query(
          singlesCollectionRef,
          orderBy('startTime', 'desc'),
        );
        singlesStatusCollectionRef = collection(
          db,
          'users',
          storeAuth.user.id,
          'singlesStatus',
        );
        singlesStatusCollectionQuery = query(singlesStatusCollectionRef);
        await this.getSingles();
        await this.getSinglesStatus();
      } else {
        alert('Unable to fetch data - user not found');
      }
    },
    async getSingles() {
      this.isSinglesLoaded = false;

      getSinglesSnapshot = await onSnapshot(
        singlesCollectionQuery,
        (querySnapshot) => {
          const singles: SingleBetModel[] = [];

          querySnapshot.forEach((doc) => {
            const {
              dateOfUpdate,
              fixtureName,
              marketName,
              oddsTotal,
              payin,
              placementTime,
              potentialWinning,
              result,
              selectionName,
              singlesStatus,
              sportsCategory,
              sportsName,
              startTime,
              tournamentName,
            } = doc.data();

            const single = {
              dateOfUpdate,
              fixtureName,
              id: doc.id,
              marketName,
              oddsTotal,
              payin,
              placementTime,
              potentialWinning,
              result,
              selectionName,
              singlesStatus,
              sportsCategory,
              sportsName,
              startTime,
              tournamentName,
            };
            singles.push(single);
          });
          this.singles = singles;
          this.isSinglesLoaded = true;
        },
      );
    },
    async addSingle(newSingle: SingleBetModel) {
      await addDoc(singlesCollectionRef, newSingle);
    },
    async addSinglesStatus() {
      console.log('init');
      await addDoc(singlesStatusCollectionRef, {
        status: 0,
        wins: 0,
        losses: 0,
      });
    },
    async deleteSingle(singleId: string) {
      await deleteDoc(doc(singlesCollectionRef, singleId));
    },
    async updateSingle(editedSingle: SingleBetModel) {
      await updateDoc(doc(singlesCollectionRef, editedSingle.id), {
        ...editedSingle,
      });
    },
    async updateSinglesStatus(newStatus: SinglesStatus) {
      await updateDoc(doc(singlesStatusCollectionRef, newStatus.id), {
        ...newStatus,
      });
    },
    clearSingles(): void {
      this.singles = [];

      if (getSinglesSnapshot) {
        getSinglesSnapshot();
      }
    },
    clearSinglesStatus(): void {
      this.singles = [];

      if (getSinglesStatusSnapshot) {
        getSinglesStatusSnapshot();
      }
    },
    async getSinglesStatus() {
      getSinglesStatusSnapshot = await onSnapshot(
        singlesStatusCollectionQuery,
        (querySnapshot) => {
          if (querySnapshot.empty) {
            this.addSinglesStatus();
          }
          querySnapshot.forEach((doc) => {
            this.singlesStatus = doc.data();
            this.singlesStatus!.id = doc.id;
          });
        },
      );
    },
  },
});
