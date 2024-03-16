<template>
  <div>
    <bubble-menu
      :editor="editor"
      v-if="editor"
      :tippy-options="{ duration: 100 }"
    >
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
        class="bubble-menu"
      >
        bold
      </button>
      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
        class="bubble-menu"
      >
        italic
      </button>
      <button
        @click="editor.chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
        class="bubble-menu"
      >
        strike
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        class="bubble-menu"
      >
        H1
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        class="bubble-menu"
      >
        H2
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        class="bubble-menu"
      >
        H3
      </button>
    </bubble-menu>
    <editor-content :editor="editor" />
  </div>
</template>

<script setup>
import { Editor, EditorContent, BubbleMenu } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
const props = defineProps(["modelValue", "editable"]);
const emit = defineEmits(["update:modelValue"]);
const editor = ref(null);
onMounted(() => {
  editor.value = new Editor({
    content: props.modelValue,
    editable: props.editable ?? true,
    onUpdate: () => {
      emit("update:modelValue", editor.value.getJSON());
    },
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      },
    },
  });
});

// watch(k, (value) => {
//   const isSame = editor.getHTML() == value;
//   if (isSame) {
//     return;
//   }
//   editor.commands.setContent(value, false);
// });
const ClearContent = () => {
  editor.value.commands.clearContent(true);
};
defineExpose({ ClearContent });
onBeforeUnmount(() => {
  editor.value.destroy();
});
</script>
