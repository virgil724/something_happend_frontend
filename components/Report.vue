<script setup>
const { date, report } = defineProps(["date", "report"]);
const formattedDate = useDateFormat(date, "YYYY-MMM-DD (ddd) HH:mm", {
  locales: "zh-TW",
});
const reportRef = ref();
const { focused } = useFocus(reportRef);
const isHovered = useElementHover(reportRef);
const hiddenCompute = computed(() => {
  return focused.value || isHovered.value;
});
const comment = ref("");
const submit = ref(false);
const commentPreRef = ref();
const editorRef = ref();
const handleSubmit = async () => {
  submit.value = true;
  try {
    await $fetch("/v1/comment/", {
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
  <div
    ref="reportRef"
    tabindex="1"
    id="reportGroup"
    class="bg-gray-700 p-4 rounded outline-1"
    :class="{ outline: focused }"
  >
    <!-- {{ report }} -->

    <h2 class="text-xl mb-4">提交者: {{ report.author }}</h2>
    <!-- Reports would be listed here -->

    <p>提交日期: {{ formattedDate }}</p>
    <Transition>
      <div v-show="hiddenCompute">
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
            <template #fallback>
            Loading...
          </template>

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
    </Transition>
    <!-- <button @click="focused = !focused">Set Focus</button> -->
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
</style>
