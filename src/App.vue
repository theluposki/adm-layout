<script setup>
import HeaderM from './components/headerM.vue';
import { RouterView, useRoute } from 'vue-router';
import Menu from '@/components/menu.vue'
import { Emitter } from '@/utils/Emitter.js'
import { ref, onMounted } from 'vue'
import { useProfileStore } from '@/stores/useProfileStore'

const isActive = ref(false)
const profile = useProfileStore()
const route = useRoute()

onMounted(async () => {
  await profile.loadProfile()
})

Emitter.on('open-menu', () => { isActive.value = true })
Emitter.on('close-menu', () => { isActive.value = false })
</script>

<template>
  <div>
    <Transition name="slide-menu">
      <Menu v-show="isActive" />
    </Transition>
    <HeaderM :isActive="isActive" />

    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </div>
</template>

<style scoped>
/* Menu */
.slide-menu-enter-active,
.slide-menu-leave-active {
  transition: transform 0.3s ease;
}
.slide-menu-enter-from,
.slide-menu-leave-to {
  transform: translateX(-100%);
}
.slide-menu-enter-to,
.slide-menu-leave-from {
  transform: translateX(0);
}

/* Página */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateX(16px);
}
.page-leave-to {
  opacity: 0;
  transform: translateX(-16px);
}
</style>
