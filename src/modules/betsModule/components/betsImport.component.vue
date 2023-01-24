<template>
  <div class="import-button">
    <secondary-button>
      <img
        alt=""
        class="logo"
        :src="bookmakerLogo(Bookmaker.FORTUNA)"
        @click="importParlayFortuna"
      />
    </secondary-button>
    <secondary-button>
      <img
        alt=""
        class="logo"
        :src="bookmakerLogo(Bookmaker.BETCLIC)"
        @click="importParlayBetclic"
      />
    </secondary-button>
    <secondary-button>
      <img
        alt=""
        class="logo"
        :src="bookmakerLogo(Bookmaker.STS)"
        @click="importParlaySts"
      />
    </secondary-button>
  </div>
</template>

<script setup lang="ts">
import { SecondaryButton } from '@/components';
import fortunaLogo from '@/assets/logo-fortuna.svg';
import betclicLogo from '@/assets/logo-betclic.svg';
import stsLogo from '@/assets/logo-sts.png';

import { Bookmaker } from '../models/enums';
import BetImportService from '../services/betImport.service';

const bookmakerLogo = (bookmakerValue?: Bookmaker | string): string => {
  const bookmaker = bookmakerValue ? bookmakerValue : Bookmaker.FORTUNA;
  switch (bookmaker) {
    case Bookmaker.FORTUNA:
      return fortunaLogo;
    case Bookmaker.BETCLIC:
      return betclicLogo;
    case Bookmaker.STS:
      return stsLogo;
    default:
      return fortunaLogo;
  }
};

const importParlayFortuna = async (): Promise<void> => {
  await navigator.clipboard.readText().then((clipboardBet) => {
    BetImportService.importFromFortuna(clipboardBet);
  });
};

const importParlayBetclic = async (): Promise<void> => {
  await navigator.clipboard.readText().then((clipboardBet) => {
    BetImportService.importFromBetclic(clipboardBet);
  });
};

const importParlaySts = async (): Promise<void> => {
  await navigator.clipboard.readText().then((clipboardBet) => {
    BetImportService.importFromSts(clipboardBet);
  });
};
</script>

<style lang="scss" scoped>
@import '@/styles';

.import-button {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 10 * $spacing-unit;
  gap: 2 * $spacing-unit;

  @include mobile {
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 0;
    padding-top: 4 * $spacing-unit;
  }

  button {
    width: 100px;
    display: flex;
    justify-content: center;
    background-color: $color-white;
    height: 40px;
    align-items: center;
  }
}

.logo {
  height: 5 * $spacing-unit;
  background-color: $color-white;
}
</style>
