<template>
  <div class="container mx-auto block py-2.5 px-4 rounded hover:bg-gray-600">
    <button
      @click="toggleCollapsible"
      class="text-left w-full focus:outline-none"
    >
      <h2>{{ Title }}</h2>
    </button>
  </div>
  <div id="collapsibleContent" class="collapsible pl-6" ref="Content">
    <slot name="Collapse"></slot>
  </div>
</template>

<script lang="ts" setup>
const Content = ref();

const { Title } = defineProps(["Title"]);
const toggleCollapsible = () => {
  let content = Content.value;
  if (content.style.maxHeight) {
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
  }
};
onUpdated(() => {
  let content = Content.value;
  if (content.style.maxHeight !== "") {
    content.style.maxHeight = content.scrollHeight + "px";
  }
});
</script>

<style>
.collapsible {
  transition: max-height 0.3s ease-out;
  overflow: hidden;
  max-height: 0;
}
</style>
