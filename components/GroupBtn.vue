<script setup>
const props = defineProps(['onClickGroup']);
const { onClickGroup } = props;
</script>
<template>
  <button
    id="groupButton"
    class="bg-gray-600 px-3 py-2 rounded text-left w-full"
    @click="onClickGroup"
  >
    Group
  </button>
</template>
