<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <Card :Info="GroupInfo">
      <template #List>
        <!-- {{ groupMember }} -->
        <!-- {{ props }} -->
        <ul v-if="groupMember.length > 0">
          <li class="container" v-for="(user, ind) in groupMember">
            <div class="grid grid-flow-col-dense py-2">
              <div
                @click="DelMember(user)"
                class="text-center block py-2.5 px-4 rounded hover:bg-gray-600"
              >
                {{ user.username }}
              </div>
              <div
                v-if="groupLeader[ind].is_leader"
                class="text-center block py-2.5 px-4 rounded bg-green-900 hover:bg-red-600"
                @click="delLeader"
              >
                領導者
              </div>
              <div
                class="text-center block py-2.5 px-4 rounded hover:bg-gray-600"
                v-else
                @click="assignLeader(user)"
              >
                指派領導者
              </div>
            </div>
          </li>
        </ul>
        <p v-else>There is no Member in this Group</p>
      </template>
      <template #Bottom>
        <button
          @click="DeleteHandler"
          class="container mx-auto block py-2.5 px-4 rounded bg-red-600 hover:bg-red-300"
        >
          刪除群組
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
            {{ user.username }}
          </li>
        </ul>
        <p v-else class="font-bold p-4">所有使用者都在這個群組中</p>
      </template>
    </Card>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});
const emit = defineEmits(["reload-group"]);
const GroupInfo = computed(() => {
  let group = props.group.value.find((e) => e.id == route.params.id);
  return { Title: group.name, Description: group.description };
});
const props = defineProps(["group"]);

console.log();
const route = useRoute();
const groupMember = ref(
  props.group.value.find((e) => e.id == route.params.id).member_details
);
const groupLeader = computed(
  () => props.group.value.find((e) => e.id == route.params.id).member_details
);

const allUserFetch = useAuthFetch("/v1/users/");
const allUser = computed(() =>
  useDifferenceBy(allUserFetch.data.value, groupMember.value, "id")
);

const UpdateMember = async () => {
  await authfetch(`/v1/group/${route.params.id}/`, {
    method: "patch",
    body: { members: groupMember.value.map((e) => e.id) },
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
  Title: "所有使用者",
  Description: "未在群組中的使用者",
};
const router = useRouter();
const DeleteHandler = async () => {
  await authfetch(`/v1/group/${route.params.id}/`, {
    method: "delete",
  });
  emit("reload-group");
  router.replace({ path: "/Admin" });
};
const delLeader = async () => {
  await authfetch(`/v1/group_leader/group/${route.params.id}`, {
    method: "delete",
  });
  emit("reload-group");
};
const assignLeader = async (user) => {
  try {
    await delLeader();
  } catch (error) {}

  await authfetch("/v1/group_leader/", {
    method: "post",
    body: {
      user: user.id,
      group: route.params.id,
    },
  });
  emit("reload-group");
};
</script>

<style></style>
