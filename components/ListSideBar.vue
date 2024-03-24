<script setup>
const { manageGroup } = defineProps(["manage-group"]);
</script>
<template>
  <div class="w-64 bg-gray-700 p-4 space-y-4">
    <Collapsible v-for="group in manageGroup" :Title="group.name">
      <template #Collapse>
        <ul>
          <li
            class="container mx-auto block py-2.5 px-4 rounded hover:bg-gray-600"
            v-for="user in group.member_details"
          >
            <NuxtLink :to="`/report/${user.id}`">{{ user.username }}</NuxtLink>
          </li>
        </ul>
      </template>
    </Collapsible>
  </div>
</template>
