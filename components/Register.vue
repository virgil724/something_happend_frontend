<template>
  <h2 class="text-2xl font-bold mb-8">Register</h2>
  <form id="registerForm">
    <div class="mb-4">
      <label for="registerEmail" class="block text-sm font-semibold mb-2"
        >Username</label
      >
      <input
        id="registerEmail"
        class="w-full p-2 rounded bg-gray-800 text-white"
        required
      />
    </div>
    <div class="mb-6">
      <label for="registerPassword" class="block text-sm font-semibold mb-2"
        >Password</label
      >
      <input
        type="password"
        id="registerPassword"
        class="w-full p-2 rounded bg-gray-800 text-white"
        required
      />
    </div>
    <div class="mb-6">
      <label for="registerRepeatPassword" class="block text-sm font-semibold mb-2"
        >Repeat Password</label
      >
      <input
        type="password"
        id="registerRepeatPassword"
        class="w-full p-2 rounded bg-gray-800 text-white"
        required
      />
    </div>
    <button
      type="submit"
      class="w-full bg-gray-900 p-2 rounded hover:bg-gray-800 transition-colors"
    >
      Register
    </button>
  </form>
  <div class="mt-4">
    <p class="text-sm">
      Already have an account?
      <a
        href="#"
        class="text-blue-400 hover:text-blue-300"
        @click="$emit('toggleLogin')"
        >Login</a
      >
    </p>
  </div>
</template>

<script lang="ts" setup>
defineEmits(['toggleLogin'])

</script>

<style></style>
