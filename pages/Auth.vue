<template>
  <body class="bg-gray-200 font-sans">
    <div class="min-h-screen flex items-center justify-center">
      <div
        class="bg-gray-700 text-white p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <Login v-if="is_login" @toggle-login="toggle_login" />
        <Register v-else @toggle-login="toggle_login" />
      </div>
    </div>
  </body>
</template>

<script lang="ts" setup>
const is_login = ref(true);
const toggle_login = () => {
  is_login.value = !is_login.value;
};
</script>

<style></style>
