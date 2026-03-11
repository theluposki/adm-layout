// src/utils/haptic.js
export const haptic = (duration = 10) => navigator.vibrate?.(duration)
