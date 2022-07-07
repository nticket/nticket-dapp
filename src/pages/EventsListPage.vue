<template>
  <div class="events-list-page">
    <h1>Events list {{ events.length }}</h1>
    <template v-if="events.length">
      <ATag v-for="item in events" :key="item.token_series_id">
        {{ item.metadata.title }}
      </ATag>
    </template>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent, onMounted } from "vue";

import { useEventsStore } from "@/entities/eventsStore";

export const EventsListPage = defineComponent({
  name: "EventsListPage",
  setup() {
    const eventsStore = useEventsStore();
    const { events } = storeToRefs(eventsStore);

    onMounted(() => {
      eventsStore.getEvents();
    });

    return { events };
  },
});
export default EventsListPage;
</script>

<style lang="scss"></style>
