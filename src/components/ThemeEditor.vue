<script setup>
import { ref, reactive } from 'vue'
import {
  palette,
  defaultTheme,
  themeLabels,
  loadTheme,
  saveTheme,
  resetTheme,
  hexToRgba,
} from '@/composables/useTheme.js'

// ─── State ────────────────────────────────────────
const theme = reactive(loadTheme())
const saved = ref(false)
const activeVar = ref(null)

// Variáveis que são rgba — exibem slider de opacidade
const rgbaVars = ['--active-painel-rgba', '--text-h1-rgba']

// Extrai opacidade atual de um valor rgba
function getAlpha(rgbaStr) {
  const match = rgbaStr?.match(/[\d.]+(?=\s*\))/)
  return match ? parseFloat(match[0]) : 1
}

// Extrai hex de um rgba ou retorna o próprio hex
function getHexFromValue(val) {
  if (!val) return '#000000'
  if (val.startsWith('rgba')) {
    const nums = val.match(/\d+/g)
    if (!nums) return '#000000'
    const toHex = (n) => parseInt(n).toString(16).padStart(2, '0')
    return `#${toHex(nums[0])}${toHex(nums[1])}${toHex(nums[2])}`
  }
  return val
}

// Atualiza uma variável do tema
function updateColor(variable, hex) {
  if (rgbaVars.includes(variable)) {
    const alpha = getAlpha(theme[variable])
    theme[variable] = hexToRgba(hex, alpha)
  } else {
    theme[variable] = hex
  }
}

function updateAlpha(variable, alpha) {
  const hex = getHexFromValue(theme[variable])
  theme[variable] = hexToRgba(hex, parseFloat(alpha))
}

function selectFromPalette(variable, hex) {
  updateColor(variable, hex)
  activeVar.value = null
}

// Salva e mostra feedback
function handleSave() {
  saveTheme({ ...theme })
  saved.value = true
  setTimeout(() => (saved.value = false), 2000)
}

// Reseta tudo
function handleReset() {
  const fresh = resetTheme()
  Object.assign(theme, fresh)
}
</script>

<template>
  <div class="theme-editor">

    <div class="te-header">
      <span class="te-title">
        <i class="ri-palette-line"></i>
        Tema
      </span>
      <div class="te-actions">
        <button class="btn-reset" @click="handleReset" title="Restaurar padrão">
          <i class="ri-refresh-line"></i>
        </button>
        <button class="btn-save" :class="{ success: saved }" @click="handleSave">
          <i :class="saved ? 'ri-check-line' : 'ri-save-line'"></i>
          {{ saved ? 'Salvo!' : 'Salvar' }}
        </button>
      </div>
    </div>

    <div class="te-list">
      <div
        v-for="(value, variable) in theme"
        :key="variable"
        class="te-row"
      >
        <!-- Preview + label -->
        <div class="te-info">
          <div
            class="te-swatch"
            :style="{ background: value }"
            @click="activeVar = activeVar === variable ? null : variable"
          >
            <i class="ri-pencil-line swatch-icon"></i>
          </div>
          <div class="te-labels">
            <span class="te-friendly">{{ themeLabels[variable] }}</span>
            <span class="te-var">{{ variable }}</span>
          </div>
        </div>

        <!-- Valor atual + input nativo -->
        <div class="te-controls">
          <input
            type="color"
            class="color-input"
            :value="getHexFromValue(value)"
            @input="updateColor(variable, $event.target.value)"
            :title="value"
          />
          <span class="te-value">{{ value }}</span>
        </div>

        <!-- Painel expandido: paleta + alpha -->
        <transition name="expand">
          <div v-if="activeVar === variable" class="te-panel">
            <p class="panel-label">Paleta</p>
            <div class="te-palette">
              <button
                v-for="color in palette"
                :key="color.value"
                class="palette-swatch"
                :style="{ background: color.value }"
                :title="color.label"
                @click="selectFromPalette(variable, color.value)"
              />
            </div>

            <template v-if="rgbaVars.includes(variable)">
              <p class="panel-label">Opacidade</p>
              <div class="alpha-row">
                <input
                  type="range"
                  min="0" max="1" step="0.05"
                  :value="getAlpha(value)"
                  @input="updateAlpha(variable, $event.target.value)"
                  class="alpha-slider"
                />
                <span class="alpha-val">{{ getAlpha(value).toFixed(2) }}</span>
              </div>
            </template>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.theme-editor {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;
  font-family: 'DM Sans', sans-serif;
}

/* ── Header ─────────────────────────────────────── */
.te-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px 12px;
  border-bottom: 1px solid var(--line-painel);
}

.te-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--dark);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  opacity: 0.7;
  & i { font-size: 18px; }
}

.te-actions {
  display: flex;
  gap: 8px;
}

.btn-reset {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--text-painel);
  opacity: 0.5;
  cursor: pointer;
  transition: opacity 0.2s, background 0.2s;
  & i { font-size: 18px; }
  &:hover { opacity: 1; background: var(--line-painel); }
  &:active { scale: 0.93; }
}

.btn-save {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 14px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: var(--active-painel);
  color: var(--white, #f7f6e5);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.25s, scale 0.15s;
  & i { font-size: 16px; }
  &:active { scale: 0.95; }
  &.success { background: #22c55e; }
}

/* ── Lista de variáveis ──────────────────────────── */
.te-list {
  display: flex;
  flex-direction: column;
}

.te-row {
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  border-bottom: 1px solid color-mix(in srgb, var(--line-painel) 60%, transparent);
  transition: background 0.2s;
  &:hover { background: color-mix(in srgb, var(--line-painel) 30%, transparent); }
}

.te-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.te-swatch {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 2px solid color-mix(in srgb, var(--line-painel) 80%, white);
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: scale 0.15s, box-shadow 0.2s;
  overflow: hidden;
  &:hover { scale: 1.08; box-shadow: 0 2px 8px rgba(0,0,0,0.3); }
  &:active { scale: 0.95; }
}

.swatch-icon {
  font-size: 14px;
  color: white;
  opacity: 0;
  text-shadow: 0 1px 3px rgba(0,0,0,0.8);
  transition: opacity 0.2s;
  pointer-events: none;
}
.te-swatch:hover .swatch-icon { opacity: 1; }

.te-labels {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
}

.te-friendly {
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--dark);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.te-var {
  font-size: 0.72rem;
  color: var(--text-muted, #707070);
  font-family: monospace;
  opacity: 0.7;
}

.te-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 48px;
  margin-top: 4px;
}

.color-input {
  -webkit-appearance: none;
  appearance: none;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 6px;
  padding: 0;
  cursor: pointer;
  background: transparent;
  &::-webkit-color-swatch-wrapper { padding: 0; border-radius: 6px; }
  &::-webkit-color-swatch { border: none; border-radius: 6px; }
}

.te-value {
  font-size: 0.72rem;
  font-family: monospace;
  color: var(--text-muted, #707070);
  opacity: 0.8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 160px;
}

/* ── Painel expandido ────────────────────────────── */
.te-panel {
  margin-top: 12px;
  margin-left: 48px;
  padding: 12px;
  background: color-mix(in srgb, var(--line-painel) 40%, transparent);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.panel-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted, #707070);
  font-weight: 600;
  margin: 0;
}

.te-palette {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.palette-swatch {
  width: 26px;
  height: 26px;
  border-radius: 6px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: scale 0.15s, border-color 0.15s;
  &:hover { scale: 1.15; border-color: white; }
  &:active { scale: 0.9; }
}

.alpha-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.alpha-slider {
  flex: 1;
  accent-color: var(--active-painel);
  cursor: pointer;
}

.alpha-val {
  font-size: 0.78rem;
  font-family: monospace;
  color: var(--text-painel);
  min-width: 32px;
  text-align: right;
}

/* ── Animação expand ─────────────────────────────── */
.expand-enter-active,
.expand-leave-active {
  transition: max-height 0.28s ease, opacity 0.22s ease;
  overflow: hidden;
  max-height: 200px;
}
.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
