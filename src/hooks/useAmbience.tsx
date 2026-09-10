import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'

/* ------------------------------------------------------------------
   SOUND, WITHOUT ASSETS

   Synthesised in the browser with the Web Audio API:
     ocean — white noise through a low-pass filter with LFO modulation.
     bell  — additive synthesis on inharmonic partials.

   Configured to start with sound ON by default. Autoplay restrictions
   are handled by resuming the AudioContext upon the visitor's first
   interaction if default sound state is ON.
-------------------------------------------------------------------*/

export interface Ambience {
  supported: boolean
  playing: boolean
  start: () => void
  stop: () => void
  toggle: () => void
  strike: (f0?: number) => void
}

const AmbienceContext = createContext<Ambience | undefined>(undefined)

export function AmbienceProvider({ children }: { children: ReactNode }) {
  const [playing, setPlaying] = useState(true)
  const [supported] = useState(
    () => typeof window !== 'undefined' && !!(window.AudioContext || (window as any).webkitAudioContext),
  )

  const ctxRef = useRef<AudioContext | null>(null)
  const masterRef = useRef<GainNode | null>(null)
  const surfRef = useRef<{ stop: () => void } | null>(null)
  const playingRef = useRef(true)
  const bellTimerRef = useRef(0)

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      const Ctor = window.AudioContext || (window as any).webkitAudioContext
      const ctx: AudioContext = new Ctor()
      const master = ctx.createGain()
      master.gain.value = 0
      master.connect(ctx.destination)
      ctxRef.current = ctx
      masterRef.current = master
    }
    return ctxRef.current
  }, [])

  const strike = useCallback(
    (f0 = 262) => {
      if (!supported || !playingRef.current) return
      const ctx = getCtx()
      const master = masterRef.current!
      if (ctx.state === 'suspended') void ctx.resume()

      const t = ctx.currentTime
      const partials: [ratio: number, gain: number, decay: number][] = [
        [1.0, 0.5, 5.2],
        [2.76, 0.32, 3.1],
        [5.4, 0.18, 1.9],
        [8.93, 0.1, 1.1],
        [13.34, 0.05, 0.6],
      ]

      const bus = ctx.createGain()
      bus.gain.value = 1.0
      bus.connect(master)

      for (const [ratio, g, decay] of partials) {
        const osc = ctx.createOscillator()
        const env = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.value = f0 * ratio
        env.gain.setValueAtTime(0, t)
        env.gain.linearRampToValueAtTime(g * 0.22, t + 0.004)
        env.gain.exponentialRampToValueAtTime(0.0001, t + decay)
        osc.connect(env).connect(bus)
        osc.start(t)
        osc.stop(t + decay + 0.05)
      }
    },
    [getCtx, supported],
  )

  const startSurf = useCallback(() => {
    const ctx = getCtx()
    const master = masterRef.current!
    if (ctx.state === 'suspended') void ctx.resume()

    if (surfRef.current) {
      master.gain.cancelScheduledValues(ctx.currentTime)
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime)
      master.gain.linearRampToValueAtTime(0.80, ctx.currentTime + 1.2)
      return
    }

    const seconds = 2
    const buf = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1

    const src = ctx.createBufferSource()
    src.buffer = buf
    src.loop = true

    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 420
    lp.Q.value = 0.6

    const swell = ctx.createGain()
    swell.gain.value = 0.55

    const lfoA = ctx.createOscillator()
    const lfoAGain = ctx.createGain()
    lfoA.frequency.value = 0.07
    lfoAGain.gain.value = 210
    lfoA.connect(lfoAGain).connect(lp.frequency)

    const lfoB = ctx.createOscillator()
    const lfoBGain = ctx.createGain()
    lfoB.frequency.value = 0.041
    lfoBGain.gain.value = 0.3
    lfoB.connect(lfoBGain).connect(swell.gain)

    src.connect(lp).connect(swell).connect(master)
    src.start()
    lfoA.start()
    lfoB.start()

    master.gain.cancelScheduledValues(ctx.currentTime)
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime)
    master.gain.linearRampToValueAtTime(0.80, ctx.currentTime + 1.6)

    surfRef.current = {
      stop: () => {
        const now = ctx.currentTime
        master.gain.cancelScheduledValues(now)
        master.gain.setValueAtTime(master.gain.value, now)
        master.gain.linearRampToValueAtTime(0, now + 0.4)
        window.setTimeout(() => {
          try {
            src.stop()
            lfoA.stop()
            lfoB.stop()
          } catch {
            /* already stopped */
          }
          surfRef.current = null
        }, 500)
      },
    }
  }, [getCtx])

  const start = useCallback(() => {
    if (!supported) return
    playingRef.current = true
    startSurf()
    bellTimerRef.current = window.setTimeout(() => strike(), 260)
    setPlaying(true)
  }, [startSurf, strike, supported])

  const stop = useCallback(() => {
    playingRef.current = false
    window.clearTimeout(bellTimerRef.current)
    if (masterRef.current && ctxRef.current) {
      const ctx = ctxRef.current
      const now = ctx.currentTime
      masterRef.current.gain.cancelScheduledValues(now)
      masterRef.current.gain.setValueAtTime(masterRef.current.gain.value, now)
      masterRef.current.gain.linearRampToValueAtTime(0, now + 0.3)
    }
    surfRef.current?.stop()
    surfRef.current = null
    setPlaying(false)
  }, [])

  const toggle = useCallback(() => {
    if (playingRef.current) {
      stop()
    } else {
      start()
    }
  }, [start, stop])

  useEffect(() => {
    const onVis = () => {
      const ctx = ctxRef.current
      if (!ctx) return
      if (document.hidden) void ctx.suspend()
      else if (playingRef.current) void ctx.resume()
    }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  useEffect(() => {
    if (!supported) return
    const onInteract = () => {
      if (playingRef.current) {
        startSurf()
        bellTimerRef.current = window.setTimeout(() => strike(), 260)
      }
    }
    document.addEventListener('click', onInteract, { once: true })
    document.addEventListener('scroll', onInteract, { once: true })
    document.addEventListener('touchstart', onInteract, { once: true })
    document.addEventListener('keydown', onInteract, { once: true })
    return () => {
      document.removeEventListener('click', onInteract)
      document.removeEventListener('scroll', onInteract)
      document.removeEventListener('touchstart', onInteract)
      document.removeEventListener('keydown', onInteract)
    }
  }, [supported, startSurf, strike])

  useEffect(
    () => () => {
      window.clearTimeout(bellTimerRef.current)
      surfRef.current?.stop()
      void ctxRef.current?.close()
    },
    [],
  )

  return (
    <AmbienceContext.Provider value={{ supported, playing, start, stop, toggle, strike }}>
      {children}
    </AmbienceContext.Provider>
  )
}

export function useAmbience(): Ambience {
  const context = useContext(AmbienceContext)
  if (!context) {
    return {
      supported: false,
      playing: false,
      start: () => {},
      stop: () => {},
      toggle: () => {},
      strike: () => {},
    }
  }
  return context
}

