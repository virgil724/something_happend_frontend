<script setup>
const { date, report } = defineProps(["date", "report"]);
const formattedDate = useDateFormat(date, "YYYY-MMM-DD (ddd) HH:mm", {
  locales: "zh-TW",
});

const collapse = ref();
const toggleCollapse = () => {
  console.log(collapse.value);
  collapse.value.classList.toggle("show");
};
const comment = ref("");
const submit = ref(false);
const commentPreRef = ref();
const editorRef = ref();
const handleSubmit = async () => {
  submit.value = true;
  try {
    await authfetch("/v1/comment/", {
      method: "POST",
      body: {
        report: report.id,
        body: {
          data: { ...comment.value },
        },
      },
    });
    submit.value = false;
    editorRef.value.ClearContent();
    commentPreRef.value.refresh();
  } catch (error) {
    console.error(error);
  }
};
</script>
<template>
  <div class="bg-gray-700 rounded-md mb-2 shadow">
    <div
      class="p-4 border-b cursor-pointer"
      @click="toggleCollapse('collapseTwo')"
    >
      <h2 class="font-semibold text-lg">
        <h2 class="text-xl mb-4">提交者: {{ report.author }}</h2>
        <p>提交日期: {{ formattedDate }}</p>
      </h2>
    </div>

    <div ref="collapse" class="collpse p-4">
      <div>
        <div v-for="report in report.body.sections">
          <div class="p-3"></div>
          <p class="text-2xl">{{ report.title }}</p>
          <TiptapEditor
            v-model="report.content"
            :editable="false"
          ></TiptapEditor>
        </div>
        回饋:
        <Suspense>
          <CommentPreview
            ref="commentPreRef"
            :report-id="report.id"
          ></CommentPreview>
          <template #fallback> Loading... </template>
        </Suspense>

        <div class="p-2"></div>
        <div class="bg-gray-900 p-2 rounded outline-1 parent">
          <div class="child opacity-50 bg-lime-400"></div>
          <TiptapEditor v-model="comment" ref="editorRef"></TiptapEditor>
          <button
            class="rounded bg-green-500 px-2 py-1"
            :disabled="submit"
            @click="handleSubmit"
          >
            <v-progress-circular
              v-if="submit"
              indeterminate
            ></v-progress-circular>
            <div v-else>提交</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.parent {
  position: relative;
}

.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.collpse:not(.show) {
  display: none;
}
</style>
