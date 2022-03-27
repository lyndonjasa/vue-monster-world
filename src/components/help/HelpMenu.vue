<template>
  <div class="help-menu-wrapper app-transluscent-div">
    <div class="app-ingame-btn btn-elements" 
      :class="{ active: isActive('elements') }"
      @click="reRoute('elements')">Elements</div>
    <div class="app-ingame-btn btn-status" 
      :class="{ active: isActive('status') }"
      @click="reRoute('status')">Status</div>
    <div class="app-ingame-btn btn-talents" 
      :class="{ active: isActive('talents') }"
      @click="reRoute('talents')">Talents</div>
    <div class="app-ingame-btn btn-evolutions" 
      :class="{ active: isActive('evolutions') }"
      @click="reRoute('evolutions')">Evolutions</div>
    <div class="app-ingame-btn btn-cards" 
      :class="{ active: isActive('cards') }"
      @click="reRoute('cards')">Monster Cards</div>
    <div class="app-ingame-btn btn-credits" 
      :class="{ active: isActive('credits') }"
      @click="reRoute('credits')">Credits</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router';

const HelpMenu = defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();

    const isActive = (name: string) => {
      return route.path === `/help/${name}`
    }

    const reRoute = (name: string) => {
      router.push(`/help/${name}`);
    }

    return {
      isActive,
      reRoute
    }
  }
})

export default HelpMenu;
</script>

<style lang="scss" scoped>
.help-menu-wrapper {
  width: 260px;
  padding: 20px;

  .app-ingame-btn {
    margin-bottom: 15px;
  }
}
</style>