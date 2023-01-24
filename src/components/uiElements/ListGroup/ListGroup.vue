<template>
  <table>
    <tr v-if="props.listHeaders">
      <th
        v-for="(header, index) in props.listHeaders"
        :key="`header-${index}`"
      >
        {{ header }}
      </th>
    </tr>
    <tr>
      <td
        v-for="(item, index) in props.listItems"
        :key="`item-${index}`"
      >
        {{ item }}
      </td>
    </tr>
  </table>
</template>

<script setup lang="ts">
const props = defineProps({
  listHeaders: {
    type: Array,
    required: false,
  },
  listItems: {
    type: Array,
    required: false,
  },
});
</script>
