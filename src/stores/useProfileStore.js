import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { db } from "@/db/db.js";

export const useProfileStore = defineStore("profile", () => {
  // ─── State ───────────────────────────────────────
  const id = ref(null);
  const name = ref("Lucas Pereira de Oliveira");
  const nickname = ref("lupoanon");
  const jobTitle = ref("Adiministrador");
  const status = ref("online");
  const avatar = ref(null);
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
      jobTitle.value = saved.jobTitle;
      status.value = saved.status;
      avatar.value = saved.avatar;
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
      jobTitle: jobTitle.value,
      status: status.value,
      avatar: avatar.value,
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

  async function updateSettings(partial) {
    settings.value = { ...settings.value, ...partial };
    await _save();
  }

  async function uploadAvatar(file) {
    const reader = new FileReader();
    reader.onload = async (e) => {
      avatar.value = e.target.result;
      await _save();
    };
    reader.readAsDataURL(file);
  }

  return {
    id,
    name,
    nickname,
    jobTitle,
    status,
    avatar,
    settings,
    isLoaded,
    initials,
    isOnline,
    loadProfile,
    setName,
    setNickname,
    setJobTitle,
    setStatus,
    setAvatar,
    updateSettings,
    uploadAvatar,
  };
});
