<template>
  <ALayout class="app-layout">
    <ALayoutHeader class="header">
      <RouterLink class="header__logo" to="/">NTicket</RouterLink>
    </ALayoutHeader>

    <ALayoutContent>
      <h1>App</h1>
      <RouterView />
    </ALayoutContent>

    <ALayoutFooter>&copy; NTicket, 2022</ALayoutFooter>
  </ALayout>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from "vue";

import { useNearStore } from "@/entities/nearStore";

export default defineComponent({
  name: "App",
  setup() {
    const nearStore = useNearStore();

    onBeforeMount(() => {
      nearStore.init();
    });

    return {};
  },
});
</script>

<style lang="scss">
#app {
  text-align: center;
  color: #2c3e50;
}

.header {
  &__logo {
    color: white;
  }
}

.app-layout {
  min-height: 100vh;
}
</style>
