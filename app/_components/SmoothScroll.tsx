'use client'
/**
 * SmoothScroll — Lenis wrapper.
 *
 * Lenis replaces the browser's native (jittery) scroll with inertia-based
 * smooth scrolling, then forwards scroll progress through requestAnimationFrame
 * so Framer Motion's useScroll hook receives buttery 120fps updates.
 *
 * Respects prefers-reduced-motion: when the user has reduced motion preference
 * we skip Lenis entirely so they get instant native scroll (a11y).
 */
import { useEffect } from 'react'
import Lenis from 'lenis'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const mql = typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : null
    if (mql?.matches) return  // skip Lenis for users who prefer reduced motion

    const lenis = new Lenis({
      lerp: 0.1,                  // friction — lower = more inertia, higher = snappier
      duration: 1.2,              // scroll duration
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    let rafId: number
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
