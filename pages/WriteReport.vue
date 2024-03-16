<template>
  <NuxtLayout>
    <template #sidebar>
      <EditSideBar
        @add-paragraph="addParagraph"
        @del-paragraph="delParagraph"
        v-model="report"
      />
    </template>
    <template #content>
      <ReportEdit v-model="report" @upload-report="uploadReport" />
    </template>
  </NuxtLayout>
</template>

<script setup>
const report = reactive({ sections: [] });

const addParagraph = () => {
  report.sections.push({ title: "", content: "" });
};
const delParagraph = (section) => {
  report.sections = report.sections.filter((sec) => sec !== section);
};

const uploadReport = () => {
  $fetch("/v1/report/", {
    method: "POST",
    headers: getToken() ? { Authorization: `Bearer ${getToken()}` } : null,
    body: { body: { ...report } },
  });
};
const getToken = () => {
  const token = useSessionStorage("access_token", "");
  return token.value;
};
{
  sections: [{ title: "Title", Content: "Content" }];
}
</script>

<style></style>
