<script setup>
import { Emitter } from '@/utils/Emitter.js'

defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
})

const openMenu = () => {
  Emitter.emit('open-menu');
}

const closeMenu = () => {
  Emitter.emit('close-menu');
}
</script>

<template>
  <header class="headerM">
    <div class="btn" @click="closeMenu" v-if="isActive">
      <i class="ri-menu-unfold-4-line"></i>
    </div>

    <div class="btn" @click="openMenu" v-else>
      <i class="ri-menu-line"></i>
    </div>

  </header>
</template>

<style scoped>
.headerM {
  width: var(--w);
  height: var(--header);
  background-color: var(--bg-painel);
  padding: 0 var(--p);

  display: flex;
  align-items: center;
}
</style>
