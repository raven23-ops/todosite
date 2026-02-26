"use client"

import { useEffect, useRef, useCallback } from "react"

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  twinkleSpeed: number
  twinkleOffset: number
}

interface ShootingStar {
  x: number
  y: number
  cosA: number
  sinA: number
  length: number
  speed: number
  opacity: number
  life: number
  maxLife: number
}

export function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const shootingRef = useRef<ShootingStar[]>([])
  const rafRef = useRef<number>(0)
  const lastFrameRef = useRef<number>(0)
  const dprRef = useRef<number>(1)

  const initStars = useCallback((w: number, h: number) => {
    // Cap star count for performance: ~1 star per 10000px, max 200
    const count = Math.min(Math.floor((w * h) / 6000), 200)
    starsRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.5 + 0.2,
      twinkleSpeed: Math.random() * 0.015 + 0.004,
      twinkleOffset: Math.random() * Math.PI * 2,
    }))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    // Use device pixel ratio for crisp rendering, capped at 2
    dprRef.current = Math.min(window.devicePixelRatio || 1, 2)

    let resizeTimer: ReturnType<typeof setTimeout>

    const resize = () => {
      const dpr = dprRef.current
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initStars(w, h)
    }

    // Debounced resize handler
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 150)
    }

    const spawnShootingStar = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const fromTop = Math.random() < 0.7
      const x = fromTop ? Math.random() * w : w + 10
      const y = fromTop ? -10 : Math.random() * h * 0.4
      const angle = Math.PI * 0.15 + Math.random() * Math.PI * 0.3

      shootingRef.current.push({
        x,
        y,
        cosA: Math.cos(angle),
        sinA: Math.sin(angle),
        length: 50 + Math.random() * 80,
        speed: 5 + Math.random() * 5,
        opacity: 0.7 + Math.random() * 0.3,
        life: 0,
        maxLife: 50 + Math.random() * 60,
      })
    }

    const draw = (now: number) => {
      // Throttle to ~30fps for performance
      const delta = now - lastFrameRef.current
      if (delta < 32) {
        rafRef.current = requestAnimationFrame(draw)
        return
      }
      lastFrameRef.current = now

      const w = window.innerWidth
      const h = window.innerHeight

      ctx.clearRect(0, 0, w, h)

      const stars = starsRef.current
      const shooting = shootingRef.current

      // Batch draw small stars (no glow) in a single fill pass
      ctx.fillStyle = "rgba(220, 210, 255, 0.5)"
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]
        // Simplified twinkle: use bitwise for fast sin approximation
        const twinkle = Math.sin(now * s.twinkleSpeed * 0.001 + s.twinkleOffset) * 0.3 + 0.7
        const alpha = s.opacity * twinkle

        if (s.size <= 1.2) {
          // Draw small stars as tiny rectangles (much faster than arcs)
          ctx.globalAlpha = alpha
          ctx.fillRect(s.x - s.size * 0.5, s.y - s.size * 0.5, s.size, s.size)
        }
      }
      ctx.globalAlpha = 1

      // Draw larger stars with subtle glow (fewer of these)
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]
        if (s.size <= 1.2) continue

        const twinkle = Math.sin(now * s.twinkleSpeed * 0.001 + s.twinkleOffset) * 0.3 + 0.7
        const alpha = s.opacity * twinkle

        // Star dot
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(220, 210, 255, ${alpha})`
        ctx.fill()

        // Subtle glow
        const r = s.size * 2.5
        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r)
        grad.addColorStop(0, `rgba(168, 130, 255, ${alpha * 0.2})`)
        grad.addColorStop(1, "rgba(168, 130, 255, 0)")
        ctx.beginPath()
        ctx.arc(s.x, s.y, r, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      }

      // Draw shooting stars
      for (let i = shooting.length - 1; i >= 0; i--) {
        const s = shooting[i]
        s.x += s.cosA * s.speed
        s.y += s.sinA * s.speed
        s.life++

        const progress = s.life / s.maxLife
        let alpha = s.opacity
        if (progress > 0.5) alpha *= 1 - (progress - 0.5) / 0.5

        if (s.life >= s.maxLife || s.x > w + 150 || s.y > h + 150) {
          shooting.splice(i, 1)
          continue
        }

        const tailX = s.x - s.cosA * s.length
        const tailY = s.y - s.sinA * s.length

        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y)
        grad.addColorStop(0, "rgba(168, 130, 255, 0)")
        grad.addColorStop(0.7, `rgba(200, 180, 255, ${alpha * 0.35})`)
        grad.addColorStop(1, `rgba(255, 255, 255, ${alpha})`)

        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(s.x, s.y)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.lineCap = "round"
        ctx.stroke()

        // Compact head glow
        const hg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 4)
        hg.addColorStop(0, `rgba(255, 255, 255, ${alpha})`)
        hg.addColorStop(1, "rgba(168, 130, 255, 0)")
        ctx.beginPath()
        ctx.arc(s.x, s.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = hg
        ctx.fill()
      }

      // Spawn shooting stars rarely, cap at 1 active at a time
      if (shooting.length < 1 && Math.random() < 0.003) {
        spawnShootingStar()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener("resize", handleResize, { passive: true })
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(rafRef.current)
      clearTimeout(resizeTimer)
    }
  }, [initStars])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ willChange: "transform" }}
      aria-hidden="true"
    />
  )
}
