import { useCallback, useEffect, useRef, useState } from 'react'

/* ------------------------------------------------------------------
   SOUND, WITHOUT ASSETS

   The brief asked for an optional sound layer but forbade shipping
   audio we cannot license. So nothing is downloaded: both sounds are
   synthesised in the browser with the Web Audio API.

     ocean  — white noise through a low-pass filter whose cutoff and
              gain are pushed around by two slow, mutually detuned
              oscillators, which is what makes a wash sound like surf
              rather than like static.

     bell   — additive synthesis on inharmonic partials (1, 2.76, 5.40,
              8.93 × f0). Those ratios are roughly why a struck bell
              sounds like a bell and a struck string does not, and the
              partials decay at different rates so the tone thins as it
              rings out.

   Total cost: no network request, a few hundred bytes of code, and an
   AudioContext that is not created at all until the visitor asks for it.
   It never autoplays.
-------------------------------------------------------------------*/

interface Ambience {
  supported: boolean
  playing: boolean
  start: () => void
  stop: () => void
  toggle: () => void
  strike: () => void
}

export function useAmbience(): Ambience {
  const [playing, setPlaying] = useState(false)
  const [supported] = useState(
    () => typeof window !== 'undefined' && !!(window.AudioContext || (window as any).webkitAudioContext),
  )

  const ctxRef = useRef<AudioContext | null>(null)
  const masterRef = useRef<GainNode | null>(null)
  const surfRef = useRef<{ stop: () => void } | null>(null)
  const playingRef = useRef(false)
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
      if (!supported) return
      const ctx = getCtx()
      const master = masterRef.current!
      if (ctx.state === 'suspended') void ctx.resume()

      const t = ctx.currentTime
      // Inharmonic partials, with the higher ones dying off faster.
      const partials: [ratio: number, gain: number, decay: number][] = [
        [1.0, 0.5, 5.2],
        [2.76, 0.32, 3.1],
        [5.4, 0.18, 1.9],
        [8.93, 0.1, 1.1],
        [13.34, 0.05, 0.6],
      ]

      const bus = ctx.createGain()
      bus.gain.value = 1.0
      bus.connect(master.gain.value > 0 ? master : ctx.destination)

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

    // Two seconds of noise, looped. Long enough that the loop point is
    // inaudible once it is filtered this heavily.
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

    // Two slow LFOs at incommensurate rates: the wash never repeats
    // audibly, which is the whole trick.
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
        master.gain.linearRampToValueAtTime(0, now + 0.7)
        window.setTimeout(() => {
          try {
            src.stop()
            lfoA.stop()
            lfoB.stop()
          } catch {
            /* already stopped */
          }
        }, 900)
      },
    }
  }, [getCtx])

  const start = useCallback(() => {
    if (!supported || playingRef.current) return
    playingRef.current = true
    startSurf()
    bellTimerRef.current = window.setTimeout(() => strike(), 260)
    setPlaying(true)
  }, [startSurf, strike, supported])

  const stop = useCallback(() => {
    if (!playingRef.current) return
    playingRef.current = false
    window.clearTimeout(bellTimerRef.current)
    surfRef.current?.stop()
    surfRef.current = null
    setPlaying(false)
  }, [])

  const toggle = useCallback(() => {
    if (playingRef.current) stop()
    else start()
  }, [start, stop])

  // Pause when the tab is hidden. Sound following you to another tab is
  // the fastest way to make someone hate a website.
  useEffect(() => {
    const onVis = () => {
      const ctx = ctxRef.current
      if (!ctx) return
      if (document.hidden) void ctx.suspend()
      else if (playing) void ctx.resume()
    }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [playing])

  // Automatically start audio on the first user interaction
  useEffect(() => {
    if (!supported) return
    const onInteract = () => {
      start()
      document.removeEventListener('click', onInteract)
      document.removeEventListener('scroll', onInteract)
      document.removeEventListener('touchstart', onInteract)
      document.removeEventListener('keydown', onInteract)
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
  }, [supported, start])

  useEffect(
    () => () => {
      window.clearTimeout(bellTimerRef.current)
      surfRef.current?.stop()
      void ctxRef.current?.close()
    },
    [],
  )

  return { supported, playing, start, stop, toggle, strike: () => strike() }
}
