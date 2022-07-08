<template>
  <div class="near-connected-page">
    <h1>Your wallet</h1>
    <p>{{ accountId }}</p>
    <NearSignOutButton />
  </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent, onMounted } from 'vue';

import { useNearStore } from '@/entities/nearStore';

import NearSignOutButton from '@/features/NearSignOutButton.vue';

export const NearIsConnectedPage = defineComponent({
  name: 'NearIsConnectedPage',
  components: { NearSignOutButton },
  setup() {
    const nearStore = useNearStore();
    const { accountId } = storeToRefs(nearStore);

    onMounted(() => {
      nearStore.getAccountId();
    });

    return { accountId };
  },
});
export default NearIsConnectedPage;
</script>

<style lang="scss"></style>
