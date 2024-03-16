<template>
  <Dialog />
</template>

<script lang="ts" setup>
definePageMeta({
  // middleware: ["auth"],
});
console.log();
</script>

<style>
.parent {
  position: relative;
}

.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
