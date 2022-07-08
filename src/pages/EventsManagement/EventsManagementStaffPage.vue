<template>
  <div class="events-management-staff">
    <h1>Checkin Staff for `{{ event?.metadata?.title }}`</h1>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent, onMounted, computed, ref } from "vue";
import { useRoute } from 'vue-router';

import { useEventsStore } from "@/entities/eventsStore";

export const EventsManagementStaffPage = defineComponent({
  name: "EventsManagementStaffPage",
  setup() {
    const route = useRoute();
    const eventsStore = useEventsStore();
    const event = ref();

    onMounted(async () => {
      eventsStore.getOwnedEvents();

      event.value = await eventsStore.getOwnedEventById(id);
    });

    const id = route.params.id;
    // const event = computed(async () => await eventsStore.getOwnedEventById(id));

    return { event };
  },
});
export default EventsManagementStaffPage;
</script>

<style lang="scss"></style>
