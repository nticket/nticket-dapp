<template>
  <ALayout>
    <ALayoutHeader class="header">NTicket</ALayoutHeader>

    <ALayoutContent>
      <h1>App</h1>

      <NearIsConnectedPage v-if="isSignedIn" />

      <ConnectWalletPage v-if="!isSignedIn" />
    </ALayoutContent>

    <ALayoutFooter>&copy; NTicket, 2022</ALayoutFooter>
  </ALayout>
</template>

<script lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent, onBeforeMount } from "vue";

import { useNearStore } from "@/entities/nearStore";

import ConnectWalletPage from "@/pages/ConnectWalletPage.vue";
import NearIsConnectedPage from "@/pages/NearIsConnectedPage.vue";

export default defineComponent({
  name: "App",
  components: { ConnectWalletPage, NearIsConnectedPage },
  setup() {
    const nearStore = useNearStore();
    const { isSignedIn, inited } = storeToRefs(nearStore);

    onBeforeMount(() => {
      nearStore.init();
    });

    return { isSignedIn, inited };
  },
});
</script>

<style lang="scss">
#app {
  text-align: center;
  color: #2c3e50;
}

.header {
  color: white;
}
</style>
