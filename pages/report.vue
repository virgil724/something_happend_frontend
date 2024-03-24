<template>
  <NuxtLayout>
    <template #sidebar>
      <ListSideBar v-if="groupData" :manage-group="groupData" />
    </template>
    <template #content>
      <!-- {{ data }} -->

      <NuxtPage />
    </template>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});
const { data: groupData } = await useAuthFetch("/v1/managegroup/");

definePageMeta({
  middleware: ["auth"],
});
</script>

<style></style>
