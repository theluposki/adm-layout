<script setup>
  defineProps({
    name: {
      type: String,
      required: true
    },
    nickname: {
      type: String,
      required: true
    },
    jobTitle: {
      type: String,
      required: true
    },
  })
</script>

<template>
  <div class="detailsProfile">
    <span class="name">{{ name }}</span>
    <span class="nickname">@{{ nickname }}</span>
    <span class="jobTitle">{{ jobTitle }}</span>
  </div>
</template>

<style scoped>
.detailsProfile {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 4px;
  padding: var(--p);
}

.detailsProfile .name {
  font-size: 18px;
  color: var(--text-h1);
  font-family: "Anton", sans-serif;
  font-weight: 400;
  font-style: normal;
  text-transform: uppercase;
  line-height: .9;
}
.detailsProfile .nickname {
  font-size: 12px;
  color: var(--line-painel);
  line-height: .9;
}
.detailsProfile .jobTitle {
  font-size: 10px;
  color: var(--active-painel);
}
</style>