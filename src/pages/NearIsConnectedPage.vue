<template>
  <div class="near-connected-page">
    <h1>Your wallet</h1>
    <p>{{ accountId }}</p>
    <NearSignOutButton />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

import { useNearStore } from "@/entities/nearStore";

import NearSignOutButton from "@/features/NearSignOutButton.vue";

export const NearIsConnectedPage = defineComponent({
  name: "NearIsConnectedPage",
  components: { NearSignOutButton },
  setup() {
    const nearStore = useNearStore();
    const accountId = ref(null);

    onMounted(() => {
      accountId.value = nearStore.wallet?.getAccountId();
    });

    return { accountId };
  },
});
export default NearIsConnectedPage;
</script>

<style lang="scss"></style>
