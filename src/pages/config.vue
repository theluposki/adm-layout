<script setup>
import { useToast } from '@/utils/useToast.js'
import ThemeEditor from '@/components/ThemeEditor.vue'

const toast = useToast();


const save = () => {
  toast.success('Usuário salvo!')
}

const error = () => {
  toast.error('Erro ao salvar.')
}

const info = () => {
  toast.info('Sincronizando...')
}

</script>

<template>
  <div class="page">
    <h1>configurações</h1>
    <div class="container">
      <div class="btn btn-full" @click="save">Salvar</div>
      <div class="btn btn-full" @click="error">Erro</div>
      <div class="btn btn-full" @click="info">Info Usuário</div>
    </div>

    <ThemeEditor />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  max-width: 280px;
  margin: 24px auto;
  gap: var(--p);
}
</style>
