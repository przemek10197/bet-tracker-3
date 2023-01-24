import { defineStore } from 'pinia';
import {
  addDoc,
  doc,
  collection,
  onSnapshot,
  query,
  CollectionReference,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import type { DocumentData, Query, Unsubscribe } from 'firebase/firestore';
import { db } from '@/gateways/firebase';
import { useStoreAuth } from '@/modules/authModule/store/storeAuth';

import type { Bet } from '../models/bet.models';

let betsCollectionRef: CollectionReference<DocumentData>;
let betsCollectionQuery: Query<DocumentData>;
let getBetsSnapshot: Unsubscribe | null = null;

type BetsStoreState = {
  bets: Bet[];
  areBetsLoaded: boolean;
};

export const useStoreBets = defineStore('storeBets', {
  state: () => {
    return {
      bets: [],
      areBetsLoaded: false,
    } as BetsStoreState;
  },
  getters: {},
  actions: {
    async init() {
      const storeAuth = useStoreAuth();

      if (storeAuth.user.id) {
        betsCollectionRef = collection(db, 'users', storeAuth.user.id, 'bets');
        betsCollectionQuery = query(betsCollectionRef);
        await this.getBets();
        this.areBetsLoaded = true;
      } else {
        alert('Unable to fetch data - user not found');
      }
    },
    async getBets() {
      this.areBetsLoaded = false;

      getBetsSnapshot = await onSnapshot(
        betsCollectionQuery,
        (querySnapshot) => {
          const bets: Bet[] = [];

          querySnapshot.forEach(async (doc) => {
            const {
              bookmaker,
              oddsTotal,
              payin,
              placementTime,
              potentialWinning,
              result,
              winsCount,
              betLegs,
            } = doc.data();

            const bet = {
              id: doc.id,
              bookmaker,
              oddsTotal,
              payin,
              potentialWinning,
              placementTime,
              result,
              winsCount,
              betLegs,
            };
            bets.push(bet);
          });
          this.bets = bets;
        },
      );
    },

    async updateBet(editedBet: Bet) {
      await updateDoc(doc(betsCollectionRef, editedBet.id!), {
        ...editedBet,
      });
    },

    clearBets(): void {
      this.bets = [];

      if (getBetsSnapshot) {
        getBetsSnapshot();
      }
    },

    async addBet(newBet: Bet) {
      await addDoc(betsCollectionRef, {
        ...newBet,
      });
    },

    async deleteBet(betId: string) {
      await deleteDoc(doc(betsCollectionRef, betId));
    },
  },
});
