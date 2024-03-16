<template>
  <body class="bg-gray-800 text-white">
    <div class="flex flex-col h-screen">
      <!-- Top Navigation -->
      <nav class="bg-gray-900 p-4 flex justify-between items-center">
        <div class="flex space-x-4">
          <NuxtLink
            to="/"
            id="listButton"
            class="bg-gray-700 px-3 py-2 rounded"
          >
            List
          </NuxtLink>
          <NuxtLink
            to="/WriteReport"
            id="writeReportButton"
            class="bg-gray-700 px-3 py-2 rounded"
          >
            WriteReport
          </NuxtLink>
          <NuxtLink
            to="/Admin"
            id="adminButton"
            class="bg-gray-700 px-3 py-2 rounded"
          >
            Admin
          </NuxtLink>
        </div>
        <div class="flex space-x-4">
          <button id="logoutButton" class="bg-red-600 px-3 py-2 mx-2 rounded">
            Logout
          </button>
        </div>
      </nav>

      <!-- Main Content -->
      <div class="flex-grow flex">
        <!-- Sidebar -->
        <slot name="sidebar" />

        <!-- Content Area -->
        <div class="flex-grow p-4 space-y-4">
          <slot name="content" />
        </div>
      </div>
    </div>
  </body>
</template>
