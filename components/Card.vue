<template>
  <div class="bg-gray-900 p-4 rounded-lg text-white">
    <div>
      <h3 class="text-xl font-semibold mb-3">{{ props.Info.Title }}</h3>
      <p>{{ props.Info.Description }}</p>
    </div>
    <slot name="List"> </slot>
    <slot name="Bottom"> </slot>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(["Info"]);
</script>

<style></style>
