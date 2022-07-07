<template>
  <div class="connect-wallet-page">
    <h2>Connect Wallet</h2>
    <NearConnectButton />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import NearConnectButton from "@/features/NearConnectButton.vue";

export const ConnectWalletPage = defineComponent({
  name: "ConnectWalletPage",
  components: { NearConnectButton },
});
export default ConnectWalletPage;
</script>

<style lang="scss"></style>
