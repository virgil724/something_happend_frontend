<template>
  <NuxtLayout>
    <template #sidebar>
      <ListSideBar v-if="groupData" :manage-group="groupData" />
    </template>
    <template #content>
      <!-- {{ data }} -->

      <Report
        v-for="report in reportData"
        :date="report.created"
        :report="report"
      />
    </template>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});
const { data: groupData } = await useAuthFetch("/v1/managegroup/");


const { data: reportData } = await useAuthFetch("/v1/report/");
// useAuthFetch("/v1/report/manage/");
</script>

<style></style>
