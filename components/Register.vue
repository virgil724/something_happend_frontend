<template>
  <h2 class="text-2xl font-bold mb-8">註冊</h2>
  <form id="registerForm">
    <div class="mb-4">
      <label for="registerEmail" class="block text-sm font-semibold mb-2"
        >使用者名稱
      </label>
      <input
        v-model="form.username"
        id="registerEmail"
        class="w-full p-2 rounded bg-gray-800 text-white"
        required
      />
      <div v-if="errorFields?.username?.length" class="text-red-500">
        {{ errorFields.username[0].message }}
      </div>
    </div>
    <div class="mb-6">
      <label for="registerPassword" class="block text-sm font-semibold mb-2"
        >密碼</label
      >
      <input
        v-model="form.password1"
        type="password"
        id="registerPassword"
        class="w-full p-2 rounded bg-gray-800 text-white"
        required
      />
      <div v-if="errorFields?.password1?.length" class="text-red-500">
        {{ errorFields.password1[0].message }}
      </div>
    </div>
    <div class="mb-6">
      <label
        for="registerRepeatPassword"
        class="block text-sm font-semibold mb-2"
        >再次輸入密碼</label
      >
      <input
        v-model="form.password2"
        type="password"
        id="registerRepeatPassword"
        class="w-full p-2 rounded bg-gray-800 text-white"
        required
      />
    </div>
    <div v-if="errorFields?.password2?.length" class="text-red-500">
      {{ errorFields.password2[0].message }}
    </div>
    <button
      @click.prevent="HandleRegister"
      :class="{ disable: !pass }"
      type="submit"
      class="w-full bg-gray-900 p-2 rounded hover:bg-gray-800 transition-colors"
    >
      註冊
    </button>

    <p v-if="errorMessage" class="text-red-500">
      密碼必須英數混合且不與帳號相似
    </p>
  </form>
  <div class="mt-4">
    <p class="text-sm">
      已有帳號？

      <a
        href="#"
        class="text-blue-400 hover:text-blue-300"
        @click="$emit('toggleLogin')"
        >登入</a
      >
    </p>
  </div>
</template>

<script lang="ts" setup>
import { useAsyncValidator } from "@vueuse/integrations/useAsyncValidator";
import type { Rules } from "async-validator";
const form = reactive({
  username: "",
  password1: "",
  password2: "",
});
const errorMessage = ref("");
const rules: Rules = {
  username: {
    type: "string",
    min: 2,
    required: true,
  },
  password1: {
    type: "string",
    required: true,
    min: 8,
  },
  password2: {
    type: "string",
    required: true,
    min: 8,
    validator: (rule, value) => value === form.password1,
  },
};

const emit = defineEmits(["toggleLogin"]);
const { pass, isFinished, errorFields } = useAsyncValidator(form, rules);

const HandleRegister = async () => {
  try {
    const resp = await $fetch("/v1/dj-rest-auth/registration/", {
      method: "post",
      body: form,
    });
    emit("toggle-login");
  } catch (error) {
    errorMessage.value = error.data;
  }
};
</script>

<style></style>
