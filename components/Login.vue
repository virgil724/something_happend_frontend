<template>
  <h2 class="text-2xl font-bold mb-8">登入</h2>
  <form id="loginForm">
    <div class="mb-4">
      <label for="loginEmail" class="block text-sm font-semibold mb-2"
        >使用者名稱
      </label>
      <input
        id="loginEmail"
        class="w-full p-2 rounded bg-gray-800 text-white"
        :class="{ '!border-red': errorFields?.username?.length }"
        v-model="user_info.username"
        required
      />
      <div v-if="errorFields?.username?.length" class="text-red-500">
        {{ errorFields.username[0].message }}
      </div>
    </div>
    <div class="mb-6">
      <label for="loginPassword" class="block text-sm font-semibold mb-2"
        >密碼</label
      >
      <input
        type="password"
        id="loginPassword"
        :class="{ '!border-red': errorFields?.password?.length }"
        v-model="user_info.password"
        class="w-full p-2 rounded bg-gray-800 text-white"
        required
      />
      <div v-if="errorFields?.password?.length" class="text-red-500">
        {{ errorFields.password[0].message }}
      </div>
    </div>
    <button
      type="submit"
      class="w-full bg-gray-900 p-2 rounded hover:bg-gray-800 transition-colors"
      :disabled="!pass"
      @click.prevent="Login"
    >
      登入
    </button>
  </form>
  <div class="mt-4">
    <p class="text-sm">
      還沒有帳號？

      <a
        href="#"
        class="text-blue-400 hover:text-blue-300"
        @click="$emit('toggleLogin')"
        >註冊</a
      >
    </p>
  </div>
</template>

<script lang="ts" setup>
defineEmits(["toggleLogin"]);
import { useAsyncValidator } from "@vueuse/integrations/useAsyncValidator";
import type { Rules } from "async-validator";
const rules: Rules = {
  username: {
    type: "string",
    min: 2,
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
};
const user_info = reactive({
  username: "",
  password: "",
});
const { pass, isFinished, errorFields } = useAsyncValidator(user_info, rules);
type JWT_Response = {
  access: "string";
  refresh: "string";
};
const Login = async () => {
  try {
    const { access, refresh } = (await $fetch("/v1/token/", {
      method: "POST",
      body: {
        ...user_info,
      },
    })) as JWT_Response;

    const refresh_stor = useLocalStorage("refresh_token", "");
    const access_stor = useSessionStorage("access_token", "");
    refresh_stor.value = refresh;
    access_stor.value = access;
    navigateTo("/");
  } catch (err) {}
};
</script>

<style></style>
