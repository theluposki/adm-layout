<!-- components/NavGroup.vue -->
<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { ref, computed, watch } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  icon: { type: String, required: true },
  basePath: { type: String, required: true },
  links: {
    type: Array, // [{ to, icon, label }]
    required: true
  }
})

const emit = defineEmits(['close'])

const route = useRoute()
const isOpen = ref(false)

const isActive = computed(() => route.path.startsWith(props.basePath))

// Abre automaticamente se a rota atual pertence a este grupo
watch(() => route.path, (path) => {
  if (path.startsWith(props.basePath)) isOpen.value = true
}, { immediate: true })

const toggle = () => {
  isOpen.value = !isOpen.value
}

const handleClick = () => {
  emit('close')
}
</script>

<template>
  <div class="nav-group">
    <!-- Botão pai -->
    <div class="nav-link nav-link--toggle" :class="{ active: isActive }" @click="toggle">
      <i :class="icon"></i>
      <span>{{ label }}</span>
      <i class="ri-arrow-down-s-line nav-arrow" :class="{ rotated: isOpen }"></i>
    </div>

    <!-- Submenu com animação -->
    <div class="submenu" :class="{ open: isOpen }">
      <div class="submenu-inner">
        <RouterLink v-for="link in links" :key="link.to" :to="link.to" class="nav-link nav-link--sub"
          exact-active-class="active" @click="handleClick">
          <i :class="link.icon"></i>
          <span>{{ link.label }}</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nav-group {
  display: flex;
  flex-direction: column;
}

/* Herda os estilos globais de .nav-link via :deep ou repete aqui */
.nav-link {
  text-decoration: none;
  color: var(--text-painel);
  display: flex;
  align-items: center;
  gap: var(--p);
  padding: 0 var(--p);
  height: var(--wh-btn);
  border-radius: var(--r);

  &.active {
    background-color: var(--active-painel);
  }

  & i {
    font-size: 26px;
  }

  &:active {
    scale: .95;
  }
}

/* Toggle */
.nav-link--toggle {
  cursor: pointer;
  user-select: none;
}

/* Seta */
.nav-arrow {
  font-size: 20px !important;
  margin-left: auto;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-arrow.rotated {
  transform: rotate(-180deg);
}

.submenu {
  display: flex;
  flex-direction: column;
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transform: translateY(-6px);
  transition:
    max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.25s ease,
    transform 0.25s ease;
}

.submenu.open {
  max-height: 500px;
  /* maior que qualquer submenu possível */
  opacity: 1;
  transform: translateY(0);
}

.submenu-inner {
  display: flex;
  flex-direction: column;
  gap: calc(var(--p) * 0.5);
  padding-top: calc(var(--p) * 0.5);
}

.nav-link--sub {
  padding-left: var(--p);
  width: calc(100% - 20px);
  height: calc(var(--wh-btn) * 0.85);
  position: relative;
  font-size: 0.92em;
  align-self: flex-end;
  
  &.active {
    background-color: var(--active-painel-rgba);
  }
  &.active::before {
    opacity: .5;
    filter: brightness(2);
  }

  & i {
    font-size: 20px;
  }
}
</style>
