<template>
  <div class="events-list-page">
    <h1>Events list {{ events.length }}</h1>
    <div v-if="events.length" class="events-list-page__list">
      <EventCard
        v-for="item in events"
        :key="item.token_series_id"
        :item="item"
        class="events-list-page__event-card"
        @submit="handleBuyTicket(item.token_series_id)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Modal } from 'ant-design-vue';
import { storeToRefs } from 'pinia';
import { defineComponent, onMounted, ref } from 'vue';

import { useEventsStore } from '@/entities/eventsStore';

import EventCard from '@/pages/EventsList/EventCard.vue';

export const EventsListPage = defineComponent({
  name: 'EventsListPage',
  components: { EventCard },
  setup() {
    const eventsStore = useEventsStore();
    const { events } = storeToRefs(eventsStore);

    onMounted(() => {
      eventsStore.getEvents();
    });

    const handleBuyTicket = async (id: string | number) => {
      Modal.confirm({
        title: 'Wanna this? Huh?',
        content: 'Wat?',
        onOk() {
          eventsStore.buyEvent(id);
        },
      });
    };

    return {
      events,
      handleBuyTicket,
      formatPrice: eventsStore._yoctoNearToNear,
      selectedKeys: ref<string[]>(['1']),
    };
  },
});
export default EventsListPage;
</script>

<style lang="scss">
.events-list-page {
  max-width: 1000px;
  margin: 0 auto;

  &__list {
    display: grid;
    grid-gap: 30px;
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
