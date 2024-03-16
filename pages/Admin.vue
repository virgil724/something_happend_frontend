<template>
  <NuxtLayout>
    <template #sidebar>
      <div class="w-64 px-4 py-6 bg-gray-700 text-white">
        <h1 class="text-xl font-semibold mb-4">Management</h1>
        <nav>
          <a href="#" class="block py-2.5 px-4 rounded hover:bg-gray-600"
            >Dashboard</a
          >
          <a href="#" class="block py-2.5 px-4 rounded hover:bg-gray-600"
            >Groups</a
          >
          <a href="#" class="block py-2.5 px-4 rounded hover:bg-gray-600"
            >Departments</a
          >
          <a href="#" class="block py-2.5 px-4 rounded hover:bg-gray-600"
            >Settings</a
          >
        </nav>
      </div>
    </template>
    <template #content>
      <div class="flex-1 p-6">
        <div class="bg-white shadow rounded-lg p-6">
          <div class="mb-4">
            <h2 class="text-2xl font-semibold">Group/Department Management</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Group Management Section -->
            <div class="bg-gray-900 p-4 rounded-lg text-white">
              <h3 class="text-xl font-semibold mb-3">Groups</h3>
              <p>Manage your organization's groups here.</p>
              <!-- Group List -->
              <ul class="mt-4">
                <li class="py-2 border-b border-gray-800">Group A</li>
                <li class="py-2 border-b border-gray-800">Group B</li>
                <li class="py-2 border-b border-gray-800">Group C</li>
              </ul>

              <Dialog>
                <template #DialogBtn="{ onClick }">
                  <button
                    @click="onClick"
                    class="mt-4 px-4 py-2 bg-gray-800 rounded hover:bg-gray-700"
                  >
                    Add New Group
                  </button>
                </template>
                <template #DialogTitle >Add Group</template>
              </Dialog>
            </div>

            <!-- Department Management Section -->
            <div class="bg-gray-900 p-4 rounded-lg text-white">
              <h3 class="text-xl font-semibold mb-3">Departments</h3>
              <p>Manage your organization's departments here.</p>
              <!-- Department List -->
              <ul class="mt-4">
                <li class="py-2 border-b border-gray-800">Department 1</li>
                <li class="py-2 border-b border-gray-800">Department 2</li>
                <li class="py-2 border-b border-gray-800">Department 3</li>
              </ul>
              <button
                class="mt-4 px-4 py-2 bg-gray-800 rounded hover:bg-gray-700"
              >
                Add New Department
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup></script>

<style></style>
