<script setup>
import { computed } from 'vue'

const props = defineProps({
  imageProfile: {
    type: String,
    default: 'https://i.pravatar.cc/1024?img=33'
  },
  wh: {
    type: String,
    default: '40px'
  },
  status: {
    type: String,
    default: 'offline'
  },
  border: {
    type: String,
    default: '4px'
  }
})

const innerRadius = '6px'

const outerRadius = computed(() => {
  return `calc(${innerRadius} + ${props.border})`
})
</script>

<template>
  <div
    class="avatar"
    :style="{
      width: wh,
      height: wh
    }"
  >

    <div
      class="wrapper-image"
      :style="{
        padding: border,
        borderRadius: outerRadius
      }"
    >
      <img
        :src="imageProfile"
        alt="image profile"
        :style="{ borderRadius: innerRadius }"
      />
    </div>

    <span class="status" :class="status"></span>

  </div>
</template>

<style scoped>
.avatar {
  position: relative;
}

.wrapper-image {
  width: 100%;
  height: 100%;
  background: var(--active-painel);
  box-shadow: 0 0 4px var(--dark);
  display: flex;
  
}

.wrapper-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.status {
  position: absolute;
  right: -2px;
  bottom: -2px;

  width: 14px;
  height: 14px;

  border-radius: 50%;
  border: 2px solid var(--bg-painel);
}

.status.online { background: #22c55e; }
.status.offline { background: #6b7280; }
.status.busy { background: #ef4444; }
</style>