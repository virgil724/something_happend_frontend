<template>
  <div class="md:col-span-2">
    <div class="mb-4" v-for="(item, ind) in model.sections" :key="ind">
      <h2 class="mb-2">{{ item.title }}</h2>
      <div class="bg-gray-900 p-2 mi rounded">
        <ClientOnly>
          <tiptap-editor class="" v-model="item.content" />
        </ClientOnly>
      </div>
    </div>
    <button
      :disabled="buttonState"
      @click="buttonHandler"
      title="Send Report"
      class="fixed z-90 bottom-10 right-8 bg-green-600 w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-blue-700 hover:drop-shadow-2xl hover:animate-bounce duration-300"
    >
      <v-progress-circular
        v-if="buttonState"
        indeterminate
      ></v-progress-circular>
      <div v-else>📤</div>
    </button>
  </div>
</template>

<script setup>
const model = defineModel();
const emit = defineEmits(["uploadReport"]);
const buttonState = ref(false);

const buttonHandler = () => {
  buttonState.value = true;
  emit("uploadReport");
  buttonState.value = false;
};
</script>

<style></style>
