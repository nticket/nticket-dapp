<template>
  <AButton @click="signOut">Disconnect wallet</AButton>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useNearStore } from '@/entities/nearStore';

export const NearSignOutButton = defineComponent({
  name: 'NearSignOutButton',
  setup() {
    const nearStore = useNearStore();

    return {
      signOut: nearStore.signOut,
    };
  },
});
export default NearSignOutButton;
</script>

<style lang="scss"></style>
