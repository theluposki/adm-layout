<script setup>
import { useProfileStore } from '@/stores/useProfileStore.js'
import Avatar from '@/components/avatar.vue';
const {
  name,
  nickname,
  status,
  avatar
} = useProfileStore();

import FloatingInput from '@/components/FloatingInput.vue'
import { ref } from 'vue'

const nome = ref('')
const email = ref('')
</script>

<template>
  <div class="page profile">

    <div class="capa">
      <Avatar wh="150px" :status="status" :avatar="avatar" />
    </div>

    <div class="form-control">
      <FloatingInput v-model="name" label="Nome completo" />
    </div>
    <div class="form-control">
      <FloatingInput v-model="nickname" label="Nome completo" />
    </div>
    <div class="form-control">
      <FloatingInput v-model="email" label="E-mail" type="email" />
    </div>
  </div>
</template>

<style scoped>
.profile {
  padding: 0 !important;
}

.capa {
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 44px 0;
  background-color: var(--dark);
  background-image: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  box-shadow: 0 0 13px var(--dark);
}
</style>
