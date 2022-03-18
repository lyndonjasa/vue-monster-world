<template>
  <div class="help-credits-wrapper">
    <div class="credits-message">
      Credits to the owner of the sprite images! Without their arts, this project won't even be possible to being with. A big thanks
      to these people for letting me use their art for the sake of making this project of mine work.
    </div>
    <div class="credits-table">
      <div class="credit-owner"><b>OWNER</b></div>
      <div class="credit-art"><b>ART</b></div>
      <template v-for="artOwner in artOwners" :key="artOwner.owner">
        <div class="credit-owner">{{ artOwner.owner }}</div>
        <div class="credit-art">{{ artOwner.arts.join(', ') }}</div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface ArtOwner {
  arts: string[];
  owner: string;
}

const Credits = defineComponent({
  setup() {
    const artOwners: ArtOwner[] = [
      {
        owner: 'Arcanin1412',
        arts: ['Andromon']
      },
      {
        owner: 'BowchersPrincipal',
        arts: ['Hi-Andromon']
      },
      {
        owner: 'dragonrod342',
        arts: [
          'Mugendramon',
          'Huckmon',
          'BaoHuckmon',
          'SaviorHuckmon',
          'Jesmon',
          'Susanoomon',
          'Agumon',
          'Greymon',
          'MetalGreymon',
          'WarGreymon',
          'Guilmon',
          'Growlmon',
          'WarGrowlmon',
          'Gallantmon',
          'Imperialdramon PM',
          'Leomon',
          'GrapLeomon',
          'SaberLeomon',
          'Patamon',
          'Angemon',
          'HolyAngemon',
          'Seraphimon',
          'Dorumon',
          'Dorugramon',
          'DoruGreymon',
          'Alphamon',
          'Etemon',
          'MetalEtemon',
          'Omegamon',
          'Betamon',
          'Seadramon',
          'MegaSeadramon',
          'MetalSeadramon'
        ]
      },
      {
        owner: 'Gunmenagumonred',
        arts: ['Gomamon']
      },
      {
        owner: 'HeroInuzuka',
        arts: ['Ikkakumon']
      },
      {
        owner: 'matykiller',
        arts: [
          'Zudomon',
          'Vikemon'
        ]
      },
      {
        owner: 'Neroesaurus',
        arts: ['Gabumon']
      },
      {
        owner: 'Opdisk',
        arts: [
          'Garurumon',
          'WereGarurumon'
        ]
      },
      {
        owner: 'Topaz66',
        arts: [
          'MetalGarurumon',
          'Examon',
          'Veemon',
          'Veedramon',
          'AeroVeedramon',
        ]
      },
      {
        owner: 'UltimaxLugia2020',
        arts: ['UlforceVeedramon']
      },
      {
        owner: 'Vee-Master',
        arts: ['Hawkmon']
      },
      {
        owner: 'yokufire5',
        arts: ['Aquilamon']
      }
    ];

    return {
      artOwners
    }
  }
})

export default Credits;
</script>

<style lang="scss" scoped>
.credits-message {
  font-size: 18px;
  margin-bottom: 25px;
}

.credits-table {
  display: flex;
  flex-wrap: wrap;

  > * {
    border: 1px solid white;
    padding: 10px 15px;
  }

  .credit-owner {
    flex-basis: 25%;
  }

  .credit-art {
    flex-basis: calc(75% - 65px);
  }
}
</style>