<template>
  <div class="account-monsters-wrapper wrapper-div">
    <div class="search-monsters-form">
      <div class="search-actions">
        <div class="monster-name">
          <p>Name: </p>
          <input type="text" class="monster-name-input" maxlength="20" />
        </div>
        <div class="form-action">
          <div class="app-ingame-btn action-btn">Search</div>
          <div class="app-ingame-btn action-btn">Reset</div>
        </div>
      </div>
      <div class="search-options">
        <div class="monster-filter filter-option">
          <p class="filter-name">Elements</p>
          <div class="filter-values">
            <div class="filter-value" v-for="filter in elementFilters" :key="filter.key">
              <input type="checkbox"
                :name="filter.key"
                :value="filter.value"
                v-model="elements">
                {{ filter.key }}
            </div>
          </div>
        </div>
        <div class="monster-filter filter-option">
          <p class="filter-name">Stages</p>
          <div class="filter-values">
            <div class="filter-value" v-for="filter in stageFilters" :key="filter.key">
              <input type="checkbox"
                :name="filter.key"
                :value="filter.value"
                v-model="stages">
                {{ filter.key }}
            </div>
          </div>
        </div>
        <div class="monster-sort filter-option">
          <p class="sort-name">Sort By</p>
          <div class="filter-values">
            <div class="sort-options" v-for="option in sortByOptions" :key="option.key">
              <input type="radio" 
                :name="option.key"
                :value="option.value"
                v-model="sortBy">
                {{ option.key }}
            </div>
          </div>
        </div>
        <div class="monster-sort filter-option">
          <p class="sort-name">Sort Direction</p>
          <div class="filter-values">
            <div class="sort-options" v-for="option in sortDirectionOptions" :key="option.key">
              <input type="radio" 
                :name="option.key"
                :value="option.value"
                v-model="sortDirection">
                {{ option.key }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

interface KeyValuePair {
  key: string;
  value: string;
}

const AccountMonstersModule = defineComponent({
  setup() {
    const elements = ref<string[]>([]);
    const elementFilters: KeyValuePair[] = [
      { key: 'Fire', value: 'Fire' },
      { key: 'Water', value: 'Water' },
      { key: 'Wind', value: 'Wind' },
      { key: 'Electric', value: 'Electric' },
      { key: 'Rock', value: 'Rock' },
      { key: 'Non Elemental', value: 'NonElemental' }
    ]

    const stages = ref<string[]>([]);
    const stageFilters: KeyValuePair[] = [
      { key: 'Rookie', value: 'Rookie' },
      { key: 'Champion', value: 'Champion' },
      { key: 'Ultimate', value: 'Ultimate' },
      { key: 'Mega', value: 'Mega' },
      { key: 'Ultra', value: 'Ultra' }
    ]

    const sortBy = ref<string>('None');
    const sortByOptions: KeyValuePair[] = [
      { key: 'None', value: 'None' },
      { key: 'Name', value: 'Name' },
      { key: 'Level', value: 'Level' }
    ]

    const sortDirection = ref<string>('ASC');
    const sortDirectionOptions: KeyValuePair[] = [
      { key: 'Ascending', value: 'ASC' },
      { key: 'Descending', value: 'DESC' }
    ]

    return {
      elements,
      elementFilters,
      stages,
      stageFilters,
      sortBy,
      sortByOptions,
      sortDirection,
      sortDirectionOptions
    }
  }
})

export default AccountMonstersModule;
</script>

<style lang="scss" scoped>
.search-monsters-form {
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  padding: 10px;
  width: calc(100% - 20px);
  display: flex;
  font-size: 16px;
  justify-content: space-between;

  .search-actions {
    .monster-name {
      display: flex;
      align-self: flex-start;

      p {
        align-self: center;
      }

      .monster-name-input {
        margin-left: 15px;
        padding: 10px;
        background: transparent;
        outline: none;
        border: 1px solid white;
        color: white;
        font-family: inherit;
      }
    }

    .form-action {
      display: flex;
      justify-content: center;

      .action-btn {
        width: 85px;
        margin: 5px;
        font-size: 14px;
        padding: 10px
      }
    }
  }

  .search-options {
    .filter-option {
      display: flex;
      margin: 5px 0;
    }

    .filter-name, .sort-name {
      width: 120px;
      margin-right: 20px;
    }

    .filter-values {
      display: flex;
    }

    .filter-value, .sort-options {
      margin: 0 5px;
    }
  }
}
</style>
