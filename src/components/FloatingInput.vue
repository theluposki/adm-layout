<script setup>
import { ref, computed } from 'vue'
import { haptic } from '@/utils/haptic.js'

const props = defineProps({
  label: {
    type: String,
    default: 'Digite aqui',
  },
  type: {
    type: String,
    default: 'text',
  },
  id: {
    type: String,
    default: () => `input-${Math.random().toString(36).slice(2, 7)}`,
  },
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const isFocused = ref(false)

const inputValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const hasValue = computed(() => inputValue.value !== '' && inputValue.value !== null && inputValue.value !== undefined)
</script>

<template>
  <div class="input-wrapper" :class="{ focused: isFocused, filled: hasValue }">
    <input :id="id" v-model="inputValue" :type="type" class="input-field" @focus="isFocused = true"
      @blur="isFocused = false" @keyup="haptic" />
    <label :for="id" class="input-label">{{ label }}</label>
    <span class="input-border"></span>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');

.input-wrapper {
  position: relative;
  width: 100%;
  margin: 12px 0 12px;
  font-family: 'DM Sans', sans-serif;
}

/* Campo de input */
.input-field {
  width: 100%;
  padding: 14px 0 10px;
  font-size: 1rem;
  font-family: 'DM Sans', sans-serif;
  font-weight: 400;
  color: var(--text);
  background: transparent;
  border: none;
  border-bottom: 1.5px solid var(--text-muted);
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
  caret-color: var(--active-painel);
}

/* Label flutuante */
.input-label {
  position: absolute;
  left: 0;
  top: 14px;
  font-size: 1rem;
  font-weight: 400;
  color: var(--text-muted);
  pointer-events: none;
  transform-origin: left center;
  transition:
    transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    color 0.25s ease,
    font-size 0.25s ease;
}

/* Linha animada inferior */
.input-border {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 2px;
  background: linear-gradient(90deg, var(--active-painel), var(--active-painel-rgba));
  border-radius: 2px;
  transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Estado: focado ou preenchido — label sobe */
.input-wrapper.focused .input-label,
.input-wrapper.filled .input-label {
  transform: translateY(-22px) scale(0.78);
  color: var(--active-painel);
}

/* Label cor neutra quando preenchido mas não focado */
.input-wrapper.filled:not(.focused) .input-label {
  color: var(--text-h1);
}

/* Borda inferior animada quando focado */
.input-wrapper.focused .input-border {
  width: 100%;
}

/* Borda do campo ao focar */
.input-wrapper.focused .input-field {
  border-bottom-color: transparent;
}
</style>
