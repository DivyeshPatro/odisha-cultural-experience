import { useCallback, useState } from 'react'

export interface Badge {
  id: string
  title: string
  titleOdia: string
  icon: string
  description: string
}

export const ALL_BADGES: Badge[] = [
  {
    id: 'timekeeper',
    title: 'Timekeeper',
    titleOdia: 'ସମୟପାଳ',
    icon: '⚙️',
    description: 'Unlocked by exploring the Konark Sun Wheel & time measurement.',
  },
  {
    id: 'explorer',
    title: 'Explorer',
    titleOdia: 'ପରିଭ୍ରାମକ',
    icon: '🧭',
    description: 'Unlocked by discovering 5 or more places across Odisha.',
  },
  {
    id: 'rasika',
    title: 'Rasika',
    titleOdia: 'ରସିକ',
    icon: '🎨',
    description: 'Unlocked by discovering traditional arts, dance & Ikat weaving.',
  },
  {
    id: 'storyteller',
    title: 'Storyteller',
    titleOdia: 'ଗାଥାକାର',
    icon: '📜',
    description: 'Unlocked by engaging with Odisha in 60s or completing the quiz.',
  },
  {
    id: 'guardian',
    title: 'Guardian',
    titleOdia: 'ରକ୍ଷକ',
    icon: '🐢',
    description: 'Unlocked by exploring Chilika, Similipal or Odisha’s disaster resilience.',
  },
]

const STORAGE_KEY = 'odisha_passport_discoveries'

export function usePassport() {
  const [discoveries, setDiscoveries] = useState<string[]>(() => {
    if (typeof window === 'undefined') return []
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : ['konark']
    } catch {
      return ['konark']
    }
  })

  const discover = useCallback((id: string) => {
    setDiscoveries((prev) => {
      if (prev.includes(id)) return prev
      const next = [...prev, id]
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // ignore storage errors
      }
      return next
    })
  }, [])

  const isDiscovered = useCallback((id: string) => discoveries.includes(id), [discoveries])

  const unlockedBadges = ALL_BADGES.filter((badge) => {
    if (badge.id === 'timekeeper') return discoveries.includes('konark') || discoveries.includes('wheel')
    if (badge.id === 'explorer') return discoveries.length >= 5
    if (badge.id === 'rasika') return discoveries.some((d) => ['pattachitra', 'odissi', 'sambalpuri', 'folk'].includes(d))
    if (badge.id === 'storyteller') return discoveries.some((d) => ['sixty', 'quiz', 'heroes'].includes(d))
    if (badge.id === 'guardian') return discoveries.some((d) => ['chilika', 'similipal', 'gahirmatha', 'resilience'].includes(d))
    return false
  })

  return {
    discoveries,
    discover,
    isDiscovered,
    unlockedBadges,
    totalBadgesCount: ALL_BADGES.length,
  }
}
