<template>
  <Report
    v-for="report in data"
    :date="report.created"
    :report="report"
  />
</template>
<script setup>
const route = useRoute();
const { data, pending, error, refresh } = await useAuthFetch(
  `/v1/report/user/${route.params.id}`,
  {}
);
</script>
