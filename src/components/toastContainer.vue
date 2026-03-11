<script setup>
import { useToast } from '@/utils/useToast.js'
const { toasts, remove } = useToast()
</script>

<template>
  <div class="toast-container">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast"
        :class="toast.type"
        @click="remove(toast.id)"
      >
        <i :class="{
          'ri-checkbox-circle-line': toast.type === 'success',
          'ri-error-warning-line':   toast.type === 'error',
          'ri-information-line':     toast.type === 'info',
          'ri-notification-3-line':  toast.type === 'default',
        }"></i>
        <span>{{ toast.message }}</span>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 24px;
  left: 50%;
  translate: -50% 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 9999;
  pointer-events: none;
}

.toast {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  border-radius: 99px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  pointer-events: all;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  backdrop-filter: blur(8px);

  background-color: var(--dark1);
  color: var(--white);

  &.success { background-color: var(--marron);  color: var(--maron2); }
  &.error   { background-color: var(--red);     color: var(--white);  }
  &.info    { background-color: var(--blue2);   color: var(--blue);   }

  & i { font-size: 20px; }
}

/* Animação */
.toast-enter-active { transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.toast-leave-active { transition: all 0.2s ease; }
.toast-enter-from   { opacity: 0; transform: translateY(20px) scale(0.9); }
.toast-leave-to     { opacity: 0; transform: translateY(10px) scale(0.95); }
.toast-move         { transition: transform 0.3s ease; }
</style>
