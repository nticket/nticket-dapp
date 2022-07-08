<template>
  <div class="events-list-page">
    <h1>Management of your Events</h1>


    <template v-if="ownedEvents.length">
      <ATag v-for="item in ownedEvents" :key="item.token_series_id">
        {{ item.metadata.title }}
      </ATag>
    </template>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent, onMounted } from "vue";

import { useEventsStore } from "@/entities/eventsStore";

export const EventsManagementPage = defineComponent({
  name: "EventsListPage",
  setup() {
    const eventsStore = useEventsStore();
    const { ownedEvents } = storeToRefs(eventsStore);

    onMounted(() => {
      eventsStore.getOwnedEvents();
    });

    return { ownedEvents };
  },
});
export default EventsManagementPage;
</script>

<style lang="scss"></style>
