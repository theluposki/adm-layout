<script setup>
import { useProfileStore } from '@/stores/useProfileStore.js'
import Avatar from '@/components/avatar.vue';
const { 
name,
status,
avatar
} = useProfileStore();
</script>

<template>
  <div class="page profile">
    
    <div class="capa">
       <Avatar 
       wh="150px" 
       :status="status" 
       :avatar="avatar" 
       :initials="initials"
       />
    </div>
    
    <p>{{ name }}</p>
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
  background-size: cover;       /* Cobre toda a div */
  background-position: center;  /* Centraliza a imagem */
  background-repeat: no-repeat; /* Não repete */
}
</style>
