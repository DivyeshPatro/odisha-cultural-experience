import { useEffect, useState } from 'react'

interface KioskModeProps {
  isKioskActive: boolean
  onToggleKiosk: () => void
}

export function KioskMode({ isKioskActive, onToggleKiosk }: KioskModeProps) {
  const [isIdle, setIsIdle] = useState(false)

  useEffect(() => {
    if (!isKioskActive) {
      setIsIdle(false)
      return
    }

    let idleTimer: number

    const resetTimer = () => {
      setIsIdle(false)
      window.clearTimeout(idleTimer)
      idleTimer = window.setTimeout(() => {
        setIsIdle(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 60000)
    }

    resetTimer()

    window.addEventListener('pointerdown', resetTimer)
    window.addEventListener('scroll', resetTimer)
    window.addEventListener('keydown', resetTimer)

    return () => {
      window.clearTimeout(idleTimer)
      window.removeEventListener('pointerdown', resetTimer)
      window.removeEventListener('scroll', resetTimer)
      window.removeEventListener('keydown', resetTimer)
    }
  }, [isKioskActive])

  if (!isKioskActive) return null

  if (isIdle) {
    return (
      <div
        className="kiosk-attract"
        onClick={() => setIsIdle(false)}
        role="button"
        tabIndex={0}
        aria-label="Touch to explore exhibition"
      >
        <div className="kiosk-attract__content">
          <p className="kiosk-attract__eyebrow">TOUCHSCREEN EXHIBITION KIOSK</p>
          <h1>ODISHA</h1>
          <p className="kiosk-attract__sub">WHERE STONE LEARNED TO KEEP TIME</p>
          <div className="kiosk-attract__pulse">TOUCH ANYWHERE TO BEGIN THE JOURNEY</div>
        </div>
      </div>
    )
  }

  return (
    <div className="kiosk-bar">
      <span>MUSEUM KIOSK MODE ACTIVE</span>
      <button type="button" onClick={onToggleKiosk} className="kiosk-bar__exit">
        EXIT KIOSK
      </button>
    </div>
  )
}
