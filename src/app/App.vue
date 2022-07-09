<template>
  <ALayout class="app-layout">
    <ALayoutHeader class="header">
      <RouterLink class="logo header__logo" to="/">NTicket</RouterLink>

      <AMenu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
        <AMenuItem key="1" @click="router.push('/events')">Events</AMenuItem>
        <AMenuItem key="2" @click="router.push('/my-tickets')">My Tickets</AMenuItem>
        <AMenuItem key="3" @click="router.push('/events-management')">Events Management</AMenuItem>
      </AMenu>
    </ALayoutHeader>

    <ALayoutContent class="app-layout__content">
      <RouterView />
    </ALayoutContent>

    <ALayoutFooter>&copy; NTicket, 2022</ALayoutFooter>
  </ALayout>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue';

import { useNearStore } from '@/entities/nearStore';
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'App',
  setup() {
    const router = useRouter();
    const nearStore = useNearStore();

    onBeforeMount(() => {
      nearStore.init();
    });

    return {
      router,
      selectedKeys: ref<string[]>(['']),
    };
  },
});
</script>

<style lang="scss">
.header {
  &__logo {
    float: left;
    margin-right: 15px;
    color: white;
  }
}

.app-layout {
  min-height: 100vh;

  &__content {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
  }
}
</style>
