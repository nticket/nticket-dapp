<template>
  <div class="checkin-page">
    <h1>Checkin Staff Page</h1>

    <template v-if="!isLoading">
      <div v-if="isValid">
        <h2>Validate Ticket</h2>
        <p>
          <Button @click="handleMarkTicketUsed">Mark Ticket as Used</Button>
        </p>
      </div>
      <div v-else>
        <p>Wrong params to validate ticket :(</p>
      </div>
    </template>
    <template v-else>
      <p>Loading...</p>
    </template>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';

import { useNearStore } from '@/entities/nearStore';
import { useRoute, useRouter } from 'vue-router'
import { useEventsStore } from '@/entities/events/eventsStore'

export const CheckinPage = defineComponent({
  name: 'CheckinPage',
  setup() {
    const route = useRoute();
    let isValid = true;
    let isLoading = true;

    const eventsStore = useEventsStore();

    const timestamp = route.query.timestamp;
    const signature = route.query.signature;
    const token_id = route.query.token_id;
    const account_id = route.query.account_id;

    if(timestamp === undefined || signature === undefined || token_id === undefined || account_id === undefined) {
      isValid = false;
    }

    isLoading = false;

    const handleMarkTicketUsed = async function() {
      console.log(token_id, signature, token_id, account_id);

      console.log('Go')

      await eventsStore.markTicketUsed(
        token_id,
        signature,
        account_id,
        timestamp
      );
    };

    return { handleMarkTicketUsed, isLoading, isValid };
  },
});
export default CheckinPage;
</script>

<style lang="scss">
.home-page {
  &__events-link {
    display: block;
    margin-top: 30px;
  }
}
</style>
