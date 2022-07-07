<template>
  <ALayout>
    <ALayoutHeader class="header">Header</ALayoutHeader>

    <ALayoutContent>
      <h1>App</h1>
    </ALayoutContent>
    <ALayoutFooter>Footer</ALayoutFooter>
  </ALayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  setup() {
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
  color: white;
}
</style>
