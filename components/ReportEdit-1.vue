<template>
  <div class="md:col-span-2 scrollable-container">
    <div class="mb-4">
      <h2 class="mb-2">Paragraph Edit Section 1</h2>
      <div class="bg-gray-900 p-4 rounded h-32"></div>
    </div>
    <div class="mb-4">
      <h2 class="mb-2">Paragraph Edit Section 2</h2>
      <div class="bg-gray-900 p-4 rounded h-32"></div>
    </div>
    <div class="mb-4">
      <h2 class="mb-2">Paragraph Edit Section 3</h2>
      <div class="bg-gray-900 p-4 rounded h-32"></div>
    </div>
    <div class="mb-4">
      <h2 class="mb-2">Paragraph Edit Section 4</h2>
      <div class="bg-gray-900 p-4 rounded">
        <ClientOnly>
          <tiptap-editor />
        </ClientOnly>
      </div>
    </div>
  </div>

  <button>123</button>
</template>

<script></script>

<style></style>
