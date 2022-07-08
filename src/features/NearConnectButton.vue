<template>
  <AButton @click="signIn">Connect wallet</AButton>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useNearStore } from '@/entities/nearStore';

export const NearConnectButton = defineComponent({
  name: 'NearConnectButton',
  setup() {
    const store = useNearStore();

    return { signIn: store.signIn };
  },
});
export default NearConnectButton;
</script>

<style lang="scss"></style>
