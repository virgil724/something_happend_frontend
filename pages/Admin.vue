<template>
  <NuxtLayout>
    <template #sidebar>
      <div class="w-64 px-4 py-6 bg-gray-700 text-white">
        <h1 class="text-xl font-semibold mb-4">管理</h1>
        <nav>
          <NuxtLink
            to="/Admin"
            class="block py-2.5 px-4 rounded hover:bg-gray-600"
            >儀表板</NuxtLink
          >
          <Collapsible Title="群組">
            <template #Collapse>
              <ListView :list="groups"></ListView>
            </template>
          </Collapsible>
          <Collapsible Title="部門">
            <template #Collapse>
              <ListView :list="Department"></ListView>
            </template>
          </Collapsible>
          <!-- <NuxtLink
            href="/Admin/Setting"
            class="block py-2.5 px-4 rounded hover:bg-gray-600"
            >設定</NuxtLink
          > -->
        </nav>
      </div>
    </template>
    <template #content>
      <div class="flex-1 p-6">
        <div class="bg-white shadow rounded-lg p-6">
          <div class="mb-4">
            <h2 class="text-2xl font-semibold">群組/部門管理</h2>
          </div>
          <NuxtPage
            :group="groupsFetch.data"
            :department="DepartmentFetch.data"
            @reload-department="DepartmentFetch.refresh"
            @reload-group="groupsFetch.refresh"
          ></NuxtPage>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Group Management Section -->

            <Card :Info="GroupInfo" v-if="isAdminPage">
              <template #List>
                <ListView class="my-4" :list="groups"></ListView>
              </template>
              <template #Bottom>
                <Dialog>
                  <template #DialogBtn="{ onClick }">
                    <button
                      @click="onClick"
                      class="mt-4 px-4 py-2 bg-gray-800 rounded hover:bg-gray-700"
                    >
                      新增群組
                    </button>
                  </template>
                  <template #DialogTitle>新增群組</template>
                  <template #DialogContent="{ onClick }">
                    <GroupForm
                      @create-item="
                        (e) => {
                          createGroup(e);
                          onClick();
                        }
                      "
                    ></GroupForm>
                  </template>
                </Dialog> </template
            ></Card>

            <!-- Department Management Section -->

            <Card :Info="DepartMentInfo" v-if="isAdminPage">
              <template #List>
                <ListView class="my-4" :list="Department"></ListView>
              </template>
              <template #Bottom>
                <Dialog>
                  <template #DialogBtn="{ onClick }">
                    <button
                      @click="onClick"
                      class="mt-4 px-4 py-2 bg-gray-800 rounded hover:bg-gray-700"
                    >
                      新增部門
                    </button>
                  </template>
                  <template #DialogTitle>新增部門</template>
                  <template #DialogContent="{ onClick }">
                    <GroupForm
                      @create-item="
                        (e) => {
                          createDepartment(e);
                          onClick();
                        }
                      "
                    ></GroupForm>
                  </template>
                </Dialog>
              </template>
            </Card>
          </div>
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["auth", "is-admin"],
});
const route = useRoute();
const isAdminPage = computed(() => route.name === "Admin");
const GroupInfo = {
  Title: "群組",
  Description: "在這裡管理您組織的群組。",
};
const groupsFetch = await useAuthFetch("/v1/group/", {});
const groups = computed(() =>
  groupsFetch.data.value.map(({ id, name }) => ({
    id,
    name,
    target: "group",
  }))
);

const DepartMentInfo = {
  Title: "部門",
  Description: "在這裡管理您組織的部門。",
};
const DepartmentFetch = await useAuthFetch("/v1/department/", {});
const Department = computed(() =>
  DepartmentFetch.data.value.map(({ id, name }) => ({
    target: "department",
    id,
    name,
  }))
);
// 1. refresh From API
// 2. add item to data
const createGroup = async (Info) => {
  await authfetch("/v1/group/", {
    method: "post",
    body: Info,
  });
  groupsFetch.refresh();
};
const createDepartment = async (Info) => {
  await authfetch("/v1/department/", {
    method: "post",
    body: Info,
  });

  DepartmentFetch.refresh();
};
</script>

<style></style>
