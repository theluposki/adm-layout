<script setup>
import { RouterLink } from 'vue-router'
import Avatar from '@/components/avatar.vue';
import DetailsProfile from '@/components/detailsProfile.vue';
import { Emitter } from '@/utils/Emitter.js'
import { useProfileStore } from '@/stores/useProfileStore'
import NavGroup from './navGroup.vue';

const profile = useProfileStore()
// linkis
const navLinks = [
  { to: '/',      icon: 'ri-home-3-line',       label: 'Início' },
  { to: '/about', icon: 'ri-information-2-line', label: 'Sobre' },
  {
    type: 'group',
    label: 'Usuários',
    icon: 'ri-user-community-fill',
    basePath: '/users',
    links: [
      { to: '/users',     icon: 'ri-list-check',   label: 'Lista' },
      { to: '/users/add', icon: 'ri-user-add-line', label: 'Adicionar' },
    ]
  },
  { to: '/setup', icon: 'ri-settings-2-line', label: 'Configurações' },
]

const closeMenu = () => {
  Emitter.emit('close-menu');
}
</script>

<template>
  <div class="container-menu">
    <header class="header-menu">
      <Avatar wh="80px" :status="profile.status" :avatar="profile.avatar" :initials="profile.initials" />
      <DetailsProfile :name="profile.name" :nickname="profile.nickname" :jobTitle="profile.jobTitle" />
    </header>

    <main class="main-menu">
      <template v-for="link in navLinks" :key="link.to ?? link.basePath">
        <NavGroup
          v-if="link.type === 'group'"
          :label="link.label"
          :icon="link.icon"
          :basePath="link.basePath"
          :links="link.links"
          @close="closeMenu"
        />
        <RouterLink
          v-else
          :to="link.to"
          class="nav-link"
          exact-active-class="active"
          @click="closeMenu"
        >
          <i :class="link.icon"></i>
          <span>{{ link.label }}</span>
        </RouterLink>
      </template>
    </main>

    <footer class="footer-menu">
      <div class="link-btn-logout">
        <i class="ri-logout-circle-line"></i>
        <span>Sair</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.container-menu {
  --h-hearder-menu: 100px;
  --h-footer-menu: 100px;
  position: absolute;
  top: var(--header);
  background-color: var(--bg-painel);
  color: var(--text-painel);
  overflow: hidden;
  width: 280px;
  min-height: 400px;
  height: calc(var(--h) - var(--header) - 16px);
  border-top: solid 1px var(--line-painel);
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 0 0 12px 0;
  box-shadow: 0 0 14px var(--dark);
}

.header-menu {
  width: 100%;
  height: var(--h-hearder-menu);
  display: flex;
  align-items: center;
  padding: 0 var(--p);
  border-bottom: solid 1px var(--line-painel);
}

.main-menu {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--p);
  padding: var(--p);
  overflow-y: auto;
}

.footer-menu {
  width: 100%;
  height: var(--h-hearder-menu);
  display: flex;
  align-items: center;
  padding: 0 var(--p);

  & .link-btn-logout {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--p);
    width: 100%;
    height: var(--wh-btn);
    background-color: transparent;
    border-radius: var(--r);
    color: var(--white);
    box-shadow: 0 0 2px var(--line-painel),
      inset 0 0 1px var(--line-painel);
    cursor: pointer;

    & i { font-size: 26px; }
    &:active { scale: .95; }
  }
}

.nav-link {
  text-decoration: none;
  color: var(--text-painel);
  display: flex;
  align-items: center;
  gap: var(--p);
  padding: 0 var(--p);
  height: var(--wh-btn);

  &.active {
    background-color: var(--active-painel);
    border-radius: var(--r);
  }

  & i { font-size: 26px; }
  &:active { scale: .95; }
}
</style>
