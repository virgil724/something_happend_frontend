<template>
  <div class="md:col-span-1 w-72 p-4 bg-gray-700">
    <div class="mb-4" v-for="({ title }, i) in model.sections" :key="i">
      <!-- <h2 class="mb-2">{{ title }}</h2> -->
      <div class="bg-gray-900 py-4 rounded flex justify-center">
        <input
          class="bg-gray-900 text-center mx-3"
          v-model="model.sections[i].title"
        />
        <button
          class="flex-1 bg-red-500 rounded h-8 mx-auto mx-4"
          @click="$emit('delParagraph', model.sections[i])"
        >
          刪除
        </button>
      </div>
    </div>
    <button
      @click="$emit('addParagraph')"
      class="bg-blue-600 px-3 py-2 rounded text-sm"
    >
      新增段落
    </button>
  </div>
</template>
<script setup>
const model = defineModel();
defineEmits(["addParagraph", "delParagraph"]);
</script>

<style></style>
