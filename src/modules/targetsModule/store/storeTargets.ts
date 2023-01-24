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
} from 'firebase/firestore';
import type { DocumentData, Query, Unsubscribe } from 'firebase/firestore';
import { db } from '@/gateways/firebase';
import { useStoreAuth } from '@/modules/authModule/store/storeAuth';
import type { Target } from '../models/target.models';

type TargetsStoreState = {
  isTargetsLoaded: boolean;
  targets?: Target[];
};

let targetsCollectionRef: CollectionReference<DocumentData>;
let targetsCollectionQuery: Query<DocumentData>;
let getTargetsSnapshot: Unsubscribe | null = null;

export const useStoreTargets = defineStore('storeTargets', {
  state: () => {
    return {
      targets: [],
      isTargetsLoaded: false,
    } as TargetsStoreState;
  },
  getters: {},
  actions: {
    async init() {
      const storeAuth = useStoreAuth();

      if (storeAuth.user.id) {
        targetsCollectionRef = collection(
          db,
          'users',
          storeAuth.user.id,
          'targets',
        );
        targetsCollectionQuery = query(
          targetsCollectionRef,
          orderBy('eventDate', 'asc'),
        );
        await this.getTargets();
      } else {
        alert('Unable to fetch data - user not found');
      }
    },
    async getTargets() {
      this.isTargetsLoaded = false;

      getTargetsSnapshot = onSnapshot(
        targetsCollectionQuery,
        (querySnapshot) => {
          const targets: Target[] = [];

          querySnapshot.forEach((doc) => {
            const {
              eventDate,
              sportName,
              fixtureName1,
              fixtureName2,
              fixtureDefault,
              selectionName,
              selectionDefault,
            } = doc.data();

            const target = {
              id: doc.id,
              eventDate,
              sportName,
              fixtureName1,
              fixtureName2,
              fixtureDefault,
              selectionName,
              selectionDefault,
            };
            targets.push(target);
          });
          this.targets = targets;
          this.isTargetsLoaded = true;
        },
      );
    },
    async addTarget(newTarget: Target) {
      await addDoc(targetsCollectionRef, newTarget);
    },
    async deleteTarget(targetId: string) {
      await deleteDoc(doc(targetsCollectionRef, targetId));
    },
    clearTargets(): void {
      this.targets = [];

      if (getTargetsSnapshot) {
        getTargetsSnapshot();
      }
    },
  },
});
