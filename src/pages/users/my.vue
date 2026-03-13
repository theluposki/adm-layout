<script setup>
import { useProfileStore } from '@/stores/useProfileStore.js'
import Avatar from '@/components/avatar.vue'
import FloatingInput from '@/components/FloatingInput.vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const store = useProfileStore()
const { name, nickname, email, status, avatar, coverImage } = storeToRefs(store)

// ─── Refs para os inputs de arquivo ocultos ───────
const avatarInput = ref(null)
const coverInput = ref(null)

// ─── Upload avatar ────────────────────────────────
function triggerAvatarUpload() {
  avatarInput.value.click()
}
async function onAvatarChange(e) {
  const file = e.target.files[0]
  if (file) await store.uploadAvatar(file)
  e.target.value = ''
}

// ─── Upload capa ──────────────────────────────────
function triggerCoverUpload() {
  coverInput.value.click()
}
async function onCoverChange(e) {
  const file = e.target.files[0]
  if (file) await store.uploadCoverImage(file)
  e.target.value = ''
}

// ─── Debounce p/ salvar campos de texto ──────────
let nameTimer, nicknameTimer, emailTimer

function onNameInput(val) {
  clearTimeout(nameTimer)
  nameTimer = setTimeout(() => store.setName(val), 600)
}
function onNicknameInput(val) {
  clearTimeout(nicknameTimer)
  nicknameTimer = setTimeout(() => store.setNickname(val), 600)
}
function onEmailInput(val) {
  clearTimeout(emailTimer)
  emailTimer = setTimeout(() => store.setEmail(val), 600)
}
</script>

<template>
  <div class="page profile">

    <!-- ── Capa ───────────────────────────────────── -->
    <div
      class="capa"
      :style="coverImage ? `background-image: url('${coverImage}')` : `background-image: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600')`"
      @click="triggerCoverUpload"
    >
      <div class="capa-overlay">
        <span class="capa-hint">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          Alterar capa
        </span>
      </div>

      <!-- Avatar clicável sobre a capa -->
      <div class="avatar-wrapper" @click.stop="triggerAvatarUpload">
        <Avatar wh="110px" :status="status" :imageProfile="avatar ?? undefined" />
        <div class="avatar-overlay">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- inputs de arquivo ocultos -->
    <input ref="avatarInput" type="file" accept="image/*" style="display:none" @change="onAvatarChange" />
    <input ref="coverInput"  type="file" accept="image/*" style="display:none" @change="onCoverChange" />

    <!-- ── Formulário ─────────────────────────────── -->
    <div class="fields">
      <div class="form-control">
        <FloatingInput
          v-model="name"
          label="Nome completo"
          @update:modelValue="onNameInput"
        />
      </div>
      <div class="form-control">
        <FloatingInput
          v-model="nickname"
          label="Nickname"
          @update:modelValue="onNicknameInput"
        />
      </div>
      <div class="form-control">
        <FloatingInput
          v-model="email"
          label="E-mail"
          type="email"
          @update:modelValue="onEmailInput"
        />
      </div>
    </div>

  </div>
</template>

<style scoped>
.profile {
  padding: 0 !important;
  display: flex;
  flex-direction: column;
}

/* ── Capa ───────────────────────────────────────── */
.capa {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 44px 0;
  background-color: var(--dark);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 0 0 13px var(--dark);
  cursor: pointer;
  overflow: hidden;
  min-height: 200px;
}

/* overlay escuro ao hover na capa */
.capa-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0);
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 12px 16px;
  transition: background 0.25s ease;
}
.capa:hover .capa-overlay {
  background: rgba(0, 0, 0, 0.45);
}

.capa-hint {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 500;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.25s ease, transform 0.25s ease;
  letter-spacing: 0.03em;
  text-shadow: 0 1px 4px rgba(0,0,0,0.6);
  pointer-events: none;
}
.capa:hover .capa-hint {
  opacity: 1;
  transform: translateY(0);
}

/* ── Avatar sobre a capa ────────────────────────── */
.avatar-wrapper {
  position: relative;
  cursor: pointer;
  border-radius: 50%;
  transition: transform 0.2s ease;
}
.avatar-wrapper:hover {
  transform: scale(1.05);
}

.avatar-overlay {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  opacity: 0;
  transition: background 0.25s ease, opacity 0.25s ease;
  pointer-events: none;
}
.avatar-wrapper:hover .avatar-overlay {
  background: rgba(0, 0, 0, 0.5);
  opacity: 1;
}

/* ── Campos ─────────────────────────────────────── */
.fields {
  padding: 12px 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-control {
  width: 100%;
}

.form-control :deep(.input-wrapper) {
  width: 100%;
}
</style>
