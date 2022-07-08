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
import { defineComponent, onMounted, computed } from "vue";
import { useRoute } from 'vue-router';

import { useEventsStore } from "@/entities/eventsStore";

export const EventsManagementStaffPage = defineComponent({
  name: "EventsListPage",
  setup() {
    const route = useRoute();
    const eventsStore = useEventsStore();
    const { ownedEvents } = storeToRefs(eventsStore);

    onMounted(() => {
      eventsStore.getOwnedEvents();
    });

    const id = computed(() => route.params.id);

    console.log(id);

    return { ownedEvents };
  },
});
export default EventsManagementStaffPage;
</script>

<style lang="scss"></style>
