<template>
  <!-- {{ data }} -->
  <div
    v-for="{ body: { data: comment }, author } in data"
    class="bg-gray-800 p-2 rounded outline-1 my-2"
  >
    <div>{{ author }}</div>
    <TiptapEditor :model-value="comment" :editable="false"></TiptapEditor>
  </div>
  <!-- {{ data }} -->
</template>

<script setup>
const { reportId } = defineProps(["report-id"]);
const { data, pending, error, refresh } = await useFetch(
  `v1/comment/report/${reportId}/`
);
defineExpose({refresh});
</script>

<style></style>
