<template>
  <div>
    <slot name="DialogBtn" :onClick="DialogBtn">
      <button
        id="openDialog"
        @click="DialogBtn"
        class="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 focus:outline-none"
      >
        Open Dialog
      </button></slot
    >
    <div id="overlay" v-if="showDialog" @click="showDialog = !showDialog"></div>
    <div id="dialog" v-if="showDialog" class="shadow-lg">
      <div class="flex justify-between items-center border-b pb-2">
        <h3 class="text-lg font-semibold text-black">
          <slot name="DialogTitle"> Dialog Title </slot>
        </h3>
        <button
          id="closeDialog"
          class="text-gray-700 font-bold"
          @click="showDialog = !showDialog"
        >
          &times;
        </button>
      </div>
      <slot name="DialogContent" :onClick="DialogBtn">
        <p class="mt-4 text-black">
          This is the content of the dialog. It appears when you click the "Open
          Dialog" button.
        </p></slot
      >
    </div>
  </div>
</template>
<script setup>
const showDialog = ref(false);
const DialogBtn = () => {
  showDialog.value = !showDialog.value;
};
</script>

<style>
/* Additional styles if needed */
#dialog {
  display: block;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  z-index: 1000;
}
#overlay {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
</style>
