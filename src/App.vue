<script setup>
import HeaderM from './components/headerM.vue';
import { RouterView } from 'vue-router';
import Menu from '@/components/menu.vue'
import { Emitter } from '@/utils/Emitter.js'
import { ref, onMounted } from 'vue'
import { useProfileStore } from '@/stores/useProfileStore'

const isActive = ref(false)
const profile = useProfileStore()

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
    <RouterView />
  </div>
</template>

<style scoped>
.slide-menu-enter-active,
.slide-menu-leave-active {
  transition: transform 0.3s ease;
}

.slide-menu-enter-from {
  transform: translateX(-100%);
}

.slide-menu-enter-to {
  transform: translateX(0);
}

.slide-menu-leave-from {
  transform: translateX(0);
}

.slide-menu-leave-to {
  transform: translateX(-100%);
}
</style>
