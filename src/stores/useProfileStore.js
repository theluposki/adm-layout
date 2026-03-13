import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { db } from "@/db/db.js";

export const useProfileStore = defineStore("profile", () => {
  // ─── State ───────────────────────────────────────
  const id = ref(null);
  const name = ref("Lucas Pereira de Oliveira");
  const nickname = ref("lupoanon");
  const email = ref("");
  const jobTitle = ref("Administrador");
  const status = ref("online");
  const avatar = ref(null);
  const coverImage = ref(null);
  const settings = ref({
    theme: "dark",
    language: "pt-BR",
    notifications: true,
  });

  const isLoaded = ref(false);

  // ─── Getters ─────────────────────────────────────
  const initials = computed(() =>
    name.value
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0].toUpperCase())
      .join(""),
  );

  const isOnline = computed(() => status.value === "online");

  // ─── Load do banco (roda 1x ao iniciar) ──────────
  async function loadProfile() {
    const saved = await db.profile.toCollection().first();

    if (saved) {
      id.value = saved.id;
      name.value = saved.name;
      nickname.value = saved.nickname;
      email.value = saved.email ?? "";
      jobTitle.value = saved.jobTitle;
      status.value = saved.status;
      avatar.value = saved.avatar;
      coverImage.value = saved.coverImage ?? null;
      settings.value = saved.settings ?? settings.value;
    } else {
      // Primeira vez: cria perfil padrão
      await _save();
    }

    isLoaded.value = true;
  }

  // ─── Salva/atualiza no banco ──────────────────────
  async function _save() {
    const data = {
      name: name.value,
      nickname: nickname.value,
      email: email.value,
      jobTitle: jobTitle.value,
      status: status.value,
      avatar: avatar.value,
      coverImage: coverImage.value,
      settings: JSON.parse(JSON.stringify(settings.value)),
    };

    if (id.value) {
      await db.profile.update(id.value, data);
    } else {
      id.value = await db.profile.add(data);
    }
  }

  // ─── Actions ─────────────────────────────────────
  async function setName(val) {
    name.value = val;
    await _save();
  }
  async function setNickname(val) {
    nickname.value = val;
    await _save();
  }
  async function setEmail(val) {
    email.value = val;
    await _save();
  }
  async function setJobTitle(val) {
    jobTitle.value = val;
    await _save();
  }
  async function setStatus(val) {
    status.value = val;
    await _save();
  }
  async function setAvatar(val) {
    avatar.value = val;
    await _save();
  }
  async function setCoverImage(val) {
    coverImage.value = val;
    await _save();
  }

  async function updateSettings(partial) {
    settings.value = { ...settings.value, ...partial };
    await _save();
  }

  // Lê arquivo e salva como base64
  function _fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function uploadAvatar(file) {
    const base64 = await _fileToBase64(file);
    avatar.value = base64;
    await _save();
  }

  async function uploadCoverImage(file) {
    const base64 = await _fileToBase64(file);
    coverImage.value = base64;
    await _save();
  }

  return {
    id,
    name,
    nickname,
    email,
    jobTitle,
    status,
    avatar,
    coverImage,
    settings,
    isLoaded,
    initials,
    isOnline,
    loadProfile,
    setName,
    setNickname,
    setEmail,
    setJobTitle,
    setStatus,
    setAvatar,
    setCoverImage,
    updateSettings,
    uploadAvatar,
    uploadCoverImage,
  };
});
