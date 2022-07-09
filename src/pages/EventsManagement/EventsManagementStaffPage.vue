<template>
  <div class="events-management-staff">
    <h1>Checkin Staff for "{{ event?.metadata?.title }}"</h1>

    <template v-if="event !== null">
      <div class="staff-list">
        <h2>Staff List:</h2>
        <template v-if="event !== null && event?.checkin_staff.length > 0">
          <p>
            <ATag
                v-for="item in event?.checkin_staff"
                :item="item"
                closable
                @close="removeStaff(id, item)"
            >{{ item }}</ATag>
          </p>
        </template>
        <div v-else>
          <p>There is no staff in your event</p>
        </div>

        <p>
          <AInputSearch
              placeholder="Add Staff"
              enter-button="Add"
              size="large"
              @search="addStaff"
          />
        </p>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { utils } from 'near-api-js';
import { storeToRefs } from 'pinia';
import { defineComponent, onMounted, computed, ref } from 'vue';
import { useRoute } from 'vue-router';

import { useEventsStore } from '@/entities/events/eventsStore';

export const EventsManagementStaffPage = defineComponent({
  name: 'EventsManagementStaffPage',
  setup() {
    const route = useRoute();
    const eventsStore = useEventsStore();
    const event = ref();

    const id = route.params.id;

    onMounted(async () => {
      eventsStore.getOwnedEvents();

      event.value = await eventsStore.getOwnedEventById(id);
    });

    const removeStaff = async function (id: any, item: any) {
      await eventsStore.removeStaff(id, item);
      return true;
    };

    const addStaff = async function (value: any) {
      await eventsStore.addStaff(id, value);
      return true;
    };

    return { id, event, utils, removeStaff, addStaff };
  },
});
export default EventsManagementStaffPage;
</script>

<style lang="scss"></style>
