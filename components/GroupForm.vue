<template>
  <form class="bg-white rounded pt-6 mb-4">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
        Name <span class="text-red-500">*</span>
      </label>
      <input
        v-model="formContent.Info.name"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="name"
        type="text"
        placeholder="Enter your name"
        required
      />
    </div>
    <div class="mb-6">
      <label
        class="block text-gray-700 text-sm font-bold mb-2"
        for="description"
      >
        Description
      </label>
      <textarea
        v-model="formContent.Info.description"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="description"
        placeholder="Enter a description (optional)"
      ></textarea>
    </div>
    <div class="flex items-center justify-between">
      <button
        @click.prevent="$emit('create-item', formContent.Info)"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script setup>
const emit = defineEmits(["create-item"]);
const formContent = reactive({
  Info: {
    name: "",
    description: "",
  },
});

</script>
