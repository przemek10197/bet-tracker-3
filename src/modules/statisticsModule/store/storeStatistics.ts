import { defineStore } from 'pinia';
import {
  collection,
  doc,
  onSnapshot,
  query,
  CollectionReference,
  updateDoc,
} from 'firebase/firestore';
import type { DocumentData, Query, Unsubscribe } from 'firebase/firestore';
import { db } from '@/gateways/firebase';
import { useStoreAuth } from '@/modules/authModule/store/storeAuth';

import type { AccountDateTracking } from './../models/statistics.models';

let statisticsCollectionRef: CollectionReference<DocumentData>;
let statisticsCollectionQuery: Query<DocumentData>;
let getStatisticsSnapshot: Unsubscribe | null = null;

type SinglesStoreState = {
  isStatisticsLoaded: boolean;
  accountDayTracking?: AccountDateTracking;
  accountMonthTracking?: AccountDateTracking;
  accountYearTracking?: AccountDateTracking;
};

export const useStoreStatistics = defineStore('storeStatistics', {
  state: () => {
    return {
      accountDayTracking: {},
      accountMonthTracking: {},
      accountYearTracking: {},
      isStatisticsLoaded: false,
    } as SinglesStoreState;
  },
  getters: {},
  actions: {
    async init() {
      const storeAuth = useStoreAuth();

      if (storeAuth.user.id) {
        statisticsCollectionRef = collection(
          db,
          'users',
          storeAuth.user.id,
          'accountTracking',
        );
        statisticsCollectionQuery = query(statisticsCollectionRef);
        await this.getStatistics();
        this.isStatisticsLoaded = true;
      } else {
        alert('Unable to fetch data - user not found');
      }
    },
    async getStatistics() {
      this.isStatisticsLoaded = false;

      getStatisticsSnapshot = await onSnapshot(
        statisticsCollectionQuery,
        (querySnapshot) => {
          let dayTracking = {};
          let monthTracking = {};
          let yearTracking = {};

          querySnapshot.forEach((doc) => {
            if (doc.id === 'day') {
              dayTracking = doc.data();
            } else if (doc.id === 'month') {
              monthTracking = doc.data();
            } else if (doc.id === 'year') {
              yearTracking = doc.data();
            }
          });
          this.accountDayTracking = dayTracking;
          this.accountMonthTracking = monthTracking;
          this.accountYearTracking = yearTracking;
        },
      );
    },
    async updateStatisticsYear(updatedStats: AccountDateTracking) {
      await updateDoc(doc(statisticsCollectionRef, 'year'), {
        ...updatedStats,
      });
    },
    async updateStatisticsMonth(updatedStats: AccountDateTracking) {
      await updateDoc(doc(statisticsCollectionRef, 'month'), {
        ...updatedStats,
      });
    },
    async updateStatisticsDay(updatedStats: AccountDateTracking) {
      await updateDoc(doc(statisticsCollectionRef, 'day'), {
        ...updatedStats,
      });
    },
    clearStatistics(): void {
      this.accountDayTracking = {};
      this.accountMonthTracking = {};
      this.accountYearTracking = {};

      if (getStatisticsSnapshot) {
        getStatisticsSnapshot();
      }
    },
  },
});
