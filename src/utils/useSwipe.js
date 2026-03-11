// src/utils/useSwipe.js
import { onMounted, onUnmounted } from 'vue'

export function useSwipe({ onSwipeRight, onSwipeLeft, threshold = 50, edgeZone = 30 }) {
  let startX = 0
  let startY = 0

  const onTouchStart = (e) => {
    startX = e.touches[0].clientX
    startY = e.touches[0].clientY
  }

  const onTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX
    const endY = e.changedTouches[0].clientY

    const diffX = endX - startX
    const diffY = endY - startY

    // ignora se o swipe foi mais vertical que horizontal
    if (Math.abs(diffY) > Math.abs(diffX)) return

    // swipe direita — só dispara se começou na borda esquerda
    if (diffX > threshold && startX <= edgeZone) {
      onSwipeRight?.()
    }

    // swipe esquerda — fecha de qualquer lugar
    if (diffX < -threshold) {
      onSwipeLeft?.()
    }
  }

  onMounted(() => {
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('touchstart', onTouchStart)
    window.removeEventListener('touchend', onTouchEnd)
  })
}
