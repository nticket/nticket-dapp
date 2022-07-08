<template>
  <ABadgeRibbon :text="formattedPrice + ' Near'">
    <ACard hoverable class="event-card">
      <template #cover>
        <img :src="item.metadata.media" />
      </template>

      <ACardMeta
        :title="item.metadata.title"
        :description="item.metadata.description"
      />

      <p class="event-card__price">Price: {{ formattedPrice }} NEAR</p>

      <template #actions>
        <AButton @click="handleSubmit">Manage Staff</AButton>
      </template>
    </ACard>
  </ABadgeRibbon>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

import { useEventsStore } from '@/entities/eventsStore';
import { NEvent } from '@/pages/EventsList/events.types';

export const EventCard = defineComponent({
  name: 'EventCard',
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

    return { formattedPrice, handleSubmit };
  },
});
export default EventCard;
</script>

<style lang="scss">
@import 'src/app/styles/variables';

.event-card {
  &__price {
    margin-top: 30px;
    color: $color-disabled;
  }
}
</style>
