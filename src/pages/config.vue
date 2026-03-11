<script setup>
import { useToast } from '@/utils/useToast.js'
const toast = useToast()


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
    <div class="btn" @click="save">Salvar</div>
    <div class="btn" @click="error">Erro</div>
    <div class="btn" @click="info">info</div>

  </div>
</template>
