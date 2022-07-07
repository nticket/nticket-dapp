<template>
  <div class="home-page">
    <h1>HomePage</h1>

    <NearIsConnectedPage v-if="isSignedIn" />

    <ConnectWalletPage v-if="!isSignedIn" />

    <RouterLink v-if="isSignedIn" class="home-page__events-link" to="/events">
      Show Events
    </RouterLink>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";

import { useNearStore } from "@/entities/nearStore";

import ConnectWalletPage from "@/pages/ConnectWalletPage.vue";
import NearIsConnectedPage from "@/pages/NearIsConnectedPage.vue";

export const HomePage = defineComponent({
  name: "HomePage",
  components: { ConnectWalletPage, NearIsConnectedPage },
  setup() {
    const nearStore = useNearStore();
    const { isSignedIn, inited } = storeToRefs(nearStore);

    return { isSignedIn, inited };
  },
});
export default HomePage;
</script>

<style lang="scss">
.home-page {
  &__events-link {
    display: block;
    margin-top: 30px;
  }
}
</style>
