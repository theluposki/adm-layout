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
  color: var(--white);
  text-shadow: 1px 1px var(--dark);
  font-family: "Anton", sans-serif;
  font-weight: 400;
  font-style: normal;
  text-transform: uppercase;
  line-height: .9;
}

.detailsProfile .nickname {
  font-size: 12px;
  line-height: .9;
  background-color: var(--active-painel);
  color: var(--white);
  padding: 2px 6px;
  border-radius: 25px;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 1px 1px 0px var(--dark);
  box-shadow: 0 0 2px var(--dark);
}

.detailsProfile .jobTitle {
  font-size: 8px;
  color: var(--white);
  text-shadow: 1px 1px 0px var(--dark);
  background-color: var(--active-painel-rgba);
  color: var(--white);
  padding: 2px 6px;
  border-radius: 4px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
