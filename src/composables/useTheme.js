// useTheme.js
// Gerencia as variáveis de tema da aplicação com persistência no localStorage

const STORAGE_KEY = 'app-theme'

// Paleta de cores disponíveis para escolha
export const palette = [
  // ── Neutros ──────────────────────────────────────
  { label: 'White',      value: '#f7f6e5' },
  { label: 'Cream',      value: '#faf8f0' },
  { label: 'Linen',      value: '#ede8d8' },
  { label: 'Gray Light', value: '#c8c8c8' },
  { label: 'Gray',       value: '#9a9a9a' },
  { label: 'Dark 4',     value: '#707070' },
  { label: 'Dark 3',     value: '#5a5a5a' },
  { label: 'Dark 2',     value: '#464646' },
  { label: 'Dark 1',     value: '#333333' },
  { label: 'Dark',       value: '#212121' },
  { label: 'Black',      value: '#111111' },

  // ── Marrons / Terrosos ───────────────────────────
  { label: 'Marron 3',   value: '#e3dbbb' },
  { label: 'Marron 2',   value: '#aeb784' },
  { label: 'Marron',     value: '#41431b' },
  { label: 'Olive',      value: '#6b6f2a' },
  { label: 'Khaki',      value: '#c4b96a' },
  { label: 'Sand',       value: '#d4c07a' },
  { label: 'Tan',        value: '#b89c6e' },
  { label: 'Sienna',     value: '#8b4513' },
  { label: 'Umber',      value: '#5c3317' },
  { label: 'Walnut',     value: '#3b2a1a' },

  // ── Azuis ────────────────────────────────────────
  { label: 'Blue 2',     value: '#071e3b' },
  { label: 'Blue',       value: '#1e4f8e' },
  { label: 'Blue Mid',   value: '#2d6cc0' },
  { label: 'Sky',        value: '#4a90d9' },
  { label: 'Powder',     value: '#90bce8' },
  { label: 'Navy',       value: '#0a1628' },
  { label: 'Teal',       value: '#0d7377' },
  { label: 'Cyan',       value: '#14a8b0' },
  { label: 'Slate',      value: '#3c5a78' },
  { label: 'Denim',      value: '#1560bd' },

  // ── Vermelhos / Quentes ──────────────────────────
  { label: 'Red',        value: '#da4848' },
  { label: 'Red Dark',   value: '#a52828' },
  { label: 'Crimson',    value: '#c0392b' },
  { label: 'Rose',       value: '#e8758a' },
  { label: 'Blush',      value: '#f0b8c0' },
  { label: 'Orange',     value: '#e07b3a' },
  { label: 'Amber',      value: '#d4920a' },
  { label: 'Gold',       value: '#c9a227' },
  { label: 'Yellow',     value: '#e8d44d' },
  { label: 'Rust',       value: '#8b3a2a' },

  // ── Verdes ───────────────────────────────────────
  { label: 'Green',      value: '#22c55e' },
  { label: 'Green Dark', value: '#15803d' },
  { label: 'Forest',     value: '#1a4d2e' },
  { label: 'Sage',       value: '#7d9b76' },
  { label: 'Mint',       value: '#a8d5b5' },
  { label: 'Moss',       value: '#4a5e3a' },
  { label: 'Lime',       value: '#84cc16' },

  // ── Roxos / Rosa ─────────────────────────────────
  { label: 'Purple',     value: '#6b3fa0' },
  { label: 'Violet',     value: '#4c1d95' },
  { label: 'Lavender',   value: '#a78bca' },
  { label: 'Plum',       value: '#7e2a5a' },
  { label: 'Mauve',      value: '#b07090' },
  { label: 'Pink',       value: '#ec4899' },
  { label: 'Magenta',    value: '#c026d3' },
]

// Tema padrão (valores iniciais)
export const defaultTheme = {
  '--bg':                 '#e3dbbb',
  '--bg-painel':          '#41431b',
  '--text-painel':        '#f7f6e5',
  '--line-painel':        '#212121',
  '--active-painel':      '#da4848',
  '--active-painel-rgba': 'rgba(218, 68, 72, 0.7)',
  '--text':               '#212121',
  '--text-h1':            '#1e4f8e',
  '--text-h1-rgba':       'rgba(118, 210, 219, 0.1)',
  '--text-muted':         '#707070',
}

// Labels amigáveis para exibição
export const themeLabels = {
  '--bg':                 'Fundo geral',
  '--bg-painel':          'Fundo do painel',
  '--text-painel':        'Texto do painel',
  '--line-painel':        'Linha do painel',
  '--active-painel':      'Cor ativa',
  '--active-painel-rgba': 'Cor ativa (transparência)',
  '--text':               'Texto padrão',
  '--text-h1':            'Destaque / H1',
  '--text-h1-rgba':       'Destaque (transparência)',
  '--text-muted':         'Texto apagado',
}

// Aplica as variáveis no :root
function applyTheme(theme) {
  const root = document.documentElement
  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })
}

// Carrega do localStorage (ou usa o padrão) e aplica
export function loadTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    const theme = saved ? { ...defaultTheme, ...JSON.parse(saved) } : { ...defaultTheme }
    applyTheme(theme)
    return theme
  } catch {
    applyTheme(defaultTheme)
    return { ...defaultTheme }
  }
}

// Salva no localStorage e aplica
export function saveTheme(theme) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(theme))
  applyTheme(theme)
}

// Reseta para o tema padrão
export function resetTheme() {
  localStorage.removeItem(STORAGE_KEY)
  applyTheme(defaultTheme)
  return { ...defaultTheme }
}

// Helper: converte hex → rgba com opacidade
export function hexToRgba(hex, alpha = 1) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
