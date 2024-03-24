<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <Card :Info="GroupInfo">
      <template #List>
        <!-- {{ groupMember }} -->

        <ul v-if="groupMember.length > 0">
          <li
            class="container mx-auto block py-2.5 px-4 rounded hover:bg-gray-600"
            v-for="user in groupMember"
            @click="DelMember(user)"
          >
            {{ user.name }}
          </li>
        </ul>
        <p v-else>There is no Member in this Group</p>
      </template>
      <template #Bottom>
        <button
          @click="DeleteHandler"
          class="container mx-auto block py-2.5 px-4 rounded bg-red-600 hover:bg-red-300"
        >
          刪除部門
        </button>
      </template>
    </Card>
    <Card :Info="UserInfo">
      <template #List>
        <ul v-if="allUser.length > 0">
          <li
            class="container mx-auto block py-2.5 px-4 rounded hover:bg-gray-600"
            @click="AddMember(user)"
            v-for="user in allUser"
          >
            {{ user.name }}
          </li>
        </ul>
        <p v-else class="p-4 font-bold">全部的群組都在這個部門了</p>
      </template>
    </Card>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});
const emit = defineEmits(["reload-department"]);
const GroupInfo = computed(() => {
  let group = props.department.value.find((e) => e.id == route.params.id);
  return { Title: group.name, Description: group.description };
});
const props = defineProps(["department", "group"]);
const route = useRoute();
const groupMember = ref(
  props.department.value.find((e) => e.id == route.params.id).member_details
);

const allUser = computed(() =>
  useDifferenceBy(props.group.value, groupMember.value, "id")
);

const UpdateMember = async () => {
  await authfetch(`/v1/department/${route.params.id}/`, {
    method: "patch",
    body: { groups: groupMember.value.map((e) => e.id) },
  });
};
const AddMember = async (member) => {
  groupMember.value.push(member);
  await UpdateMember();
};
const DelMember = async (member) => {
  groupMember.value = groupMember.value.filter((e) => e.id !== member.id);
  await UpdateMember();
};

const UserInfo = {
  Title: "所有組別",
  Description: "所有不在此部門下的群組",
};
const router = useRouter();
const DeleteHandler = async () => {
  await authfetch(`/v1/department/${route.params.id}/`, {
    method: "delete",
  });
  emit("reload-department");
  router.replace({ path: "/Admin" });
};
</script>

<style></style>
