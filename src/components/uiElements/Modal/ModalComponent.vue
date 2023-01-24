<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header"> header </slot>
        <icon-button
          icon-name="close"
          @click="closeModal($event)"
        />
      </header>

      <section class="modal-body">
        <slot name="body"> body </slot>
      </section>

      <footer class="modal-footer">
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconButton from '@/components/buttons/IconButton/IconButton.vue';

const emit = defineEmits(['close']);

const closeModal = (event: Event): void => {
  emit('close', event);
};
</script>

<style lang="scss" scoped>
@import '@/styles';

$modal-width: 580px;
$modal-shadow: 0px 0px 5px 0px rgba(88, 90, 103, 1);

.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: $color-white;
  box-shadow: $modal-shadow;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  min-width: $modal-width;
  border-radius: $border-radius;
}

.modal-header,
.modal-footer {
  padding: 4 * $spacing-unit;
  display: flex;
  justify-content: left;
}

.modal-header {
  position: relative;
  font-weight: $font-weight-bold;
  justify-content: space-between;
}

.modal-footer {
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 5 * $spacing-unit 3 * $spacing-unit;
}
</style>
