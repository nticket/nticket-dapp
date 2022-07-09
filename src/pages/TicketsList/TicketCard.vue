<template>
  <ABadgeRibbon :text="formattedPrice + ' Near'">
    <ACard hoverable class="event-card">
      <template #cover>
      </template>

      <div v-html="item.metadata.media"></div>

      <ACardMeta
        :title="item.metadata.title"
        :description="item.metadata.description"
      />

      <template #actions>
        <AButton @click="handleSubmit">Start Checkin</AButton>
      </template>
    </ACard>
  </ABadgeRibbon>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

import { useEventsStore } from '@/entities/events/eventsStore';

import { NEvent } from '@/entities/events/events.types';

export const TicketCard = defineComponent({
  name: 'TicketCard',
  props: {
    item: { type: Object as PropType<NEvent>, required: true },
  },
  emits: ['submit'],
  setup(props, { emit }) {
    const eventsStore = useEventsStore();
    const formattedPrice = computed(() =>
      eventsStore._yoctoNearToNear(props.item.price)
    );

    const handleSubmit = () => emit('submit');

    return { formattedPrice, handleSubmit, btoa };
  },
});
export default TicketCard;
</script>

<style lang="scss">
@import 'src/app/styles/variables';

.event-card {
  &__price {
    margin-top: 30px;
    color: $color-disabled;
  }
}

.near-symbol {
  font-size: 18px;
}
</style>
