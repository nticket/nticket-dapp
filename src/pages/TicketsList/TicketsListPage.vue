<template>
  <div class="events-list-page">
    <h1>My tickets</h1>
{{showCheckinTicket}}
    <template v-if="showCheckinTicket !== null">
      1111
      <template v-for="item in tickets">
        <TicketCard
          v-if="item.token_id === showCheckinTicket"
          :key="item.token_series_id"
          :item="item"
          :checkinLink="checkinLink"
          class="events-list-page__event-card"
          @submit="handleCheckinTicket(item.token_id)"
        />
      </template>
    </template>
    <template v-else>
      222
      <div v-if="tickets.length" class="events-list-page__list">
        <TicketCard
          v-for="item in tickets"
          :key="item.token_series_id"
          :item="item"
          class="events-list-page__event-card"
          @submit="handleCheckinTicket(item.token_id)"
        />
      </div>
    </template>

  </div>
</template>

<script lang="ts">
import { Modal } from 'ant-design-vue';
import { storeToRefs } from 'pinia';
import { defineComponent, onMounted, ref } from 'vue';

import { useEventsStore } from '@/entities/events/eventsStore';

import TicketCard from '@/pages/TicketsList/TicketCard.vue';
import { useRoute } from 'vue-router'
import { NTicket } from '@/entities/events/events.types'

export const TicketsListPage = defineComponent({
  name: 'TicketsListPage',
  components: { TicketCard },
  setup() {
    const route = useRoute();
    const eventsStore = useEventsStore();
    const { tickets } = storeToRefs(eventsStore);

    let checkinLink = '';
    let showCheckinTicket: string | null = null;

    onMounted(async () => {
      eventsStore.getMyTickets();

      const checkRedirectStatus = route.query.showCheckinData;

      if(checkRedirectStatus !== undefined) {
        const params = await eventsStore.generateCheckinParams(
          checkRedirectStatus
        );

        console.log(params);

        checkinLink = window.location.host + '/checkin?'
            + 'timestamp=' + params.timestamp
            + '&signature=' + encodeURIComponent(params.signature)
            + '&account_id=' + params.account_id
            + '&token_id=' + params.token_id;

        showCheckinTicket = params.token_id;

        console.log(checkinLink)
        console.log(showCheckinTicket)
      }
    });

    const handleCheckinTicket = async (
      token_id: string | number,
    ) => {
      Modal.confirm({
        title: 'Wanna this? Huh?',
        content: 'Wat?',
        async onOk() {
          const params = await eventsStore.generateCheckinParams(token_id);

          checkinLink = window.location.host + '/checkin?'
              + 'timestamp=' + params.timestamp
              + '&signature=' + encodeURIComponent(params.signature)
              + '&account_id=' + params.account_id
              + '&token_id=' + params.token_id;

          console.log(checkinLink)
          console.log(showCheckinTicket)

          console.log(params);
        },
      });
    };



    return {
      tickets,
      checkinLink,
      showCheckinTicket,
      handleCheckinTicket,
      formatPrice: eventsStore._yoctoNearToNear,
      selectedKeys: ref<string[]>(['1']),
    };
  },
});
export default TicketsListPage;
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
