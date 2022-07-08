<template>
  <div class="events-list-page">
    <h1>Management of your Events</h1>

    <div v-if="ownedEvents.length" class="events-list-page__list">
      <EventCard
        v-for="item in ownedEvents"
        :key="item.token_series_id"
        :item="item"
        class="events-list-page__event-card"
        @submit="handleEditTicket(item.token_series_id)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent, onMounted } from "vue";
import { useRouter } from 'vue-router';

import EventCard from '@/pages/EventsManagement/EventCard.vue'

import { useEventsStore } from "@/entities/events/eventsStore";


export const EventsManagementPage = defineComponent({
  name: 'EventsManagementPage',
  components: { EventCard },
  setup() {
    const router = useRouter();
    const eventsStore = useEventsStore();
    const { ownedEvents } = storeToRefs(eventsStore);

    onMounted(() => {
      eventsStore.getOwnedEvents();
    });

    const handleEditTicket = async (id: string | number) => {
      router.push({ path: `/events-management/${id}` });
    };

    return {
      ownedEvents,
      handleEditTicket,
    };
  },
});
export default EventsManagementPage;
</script>

<style lang="scss"></style>
