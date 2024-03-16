<script setup>
const showGroupUser = ref(false);

const onClickGroup = ({ target: { id } }) => {
  showGroupUser.value = true;
  console.log(id);
};
const backToGroup = () => {
  showGroupUser.value = false;
};
</script>
<template>
  <div class="w-64 bg-gray-700 p-4 space-y-4">
    <GroupBtn :on-click-group="onClickGroup"></GroupBtn>
    <div id="userGroup" v-show="showGroupUser">
      <div class="bg-gray-600 px-3 py-2 rounded">GroupOfUser</div>
      <button
        id="returnToGroupButton"
        class="mt-4 bg-gray-600 px-3 py-2 rounded"
        @click="backToGroup"
      >
        Return To Group
      </button>
    </div>
  </div>
</template>
