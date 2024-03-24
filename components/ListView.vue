<template>
  <ul>
    <li class="py-2 border-gray-800" v-for="item in list">
      <NuxtLink
        :to="`/Admin/${item.target}/${item.id}`"
        class="block py-1 px-2 rounded container hover:bg-gray-600 text-left"
      >
        {{ item.name }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup>
const { list } = defineProps(["list"]);
</script>
