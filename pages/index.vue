<template>
  <NuxtLayout>
    <template #sidebar>
      <ListSideBar />
    </template>
    <template #content>
      <!-- {{ data }} -->
      <Report v-for="report in data" :date="report.created" :report="report" />
    </template>
  </NuxtLayout>
</template>

<script setup>
const {
  public: { apiBase },
} = useRuntimeConfig();
const { data } = await useFetch(`${apiBase}/report/`);
</script>

<style></style>
