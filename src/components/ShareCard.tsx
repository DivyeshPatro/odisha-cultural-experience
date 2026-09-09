import { useRef } from 'react'
import { usePassport } from '../hooks/usePassport'
import { useLanguage } from '../context/LanguageContext'

export function ShareCard() {
  const { discoveries, unlockedBadges } = usePassport()
  const { t } = useLanguage()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const generateCard = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Draw card background
    ctx.fillStyle = '#100d0a'
    ctx.fillRect(0, 0, 600, 340)

    // Border
    ctx.strokeStyle = '#e0a548'
    ctx.lineWidth = 4
    ctx.strokeRect(12, 12, 576, 316)

    // Header
    ctx.fillStyle = '#f7d18a'
    ctx.font = 'bold 24px Georgia, serif'
    ctx.fillText('MY ODISHA PASSPORT', 36, 54)

    ctx.fillStyle = '#c9bda4'
    ctx.font = '14px sans-serif'
    ctx.fillText('Digital Cultural Exhibition Certificate', 36, 78)

    // Stats
    ctx.fillStyle = '#e0a548'
    ctx.font = '36px Georgia, serif'
    ctx.fillText(`${discoveries.length} / 12`, 36, 140)

    ctx.fillStyle = '#9b8f7a'
    ctx.font = '12px sans-serif'
    ctx.fillText('CULTURAL DISCOVERIES UNLOCKED', 36, 160)

    // Badges list
    ctx.fillStyle = '#f5ecdb'
    ctx.font = '14px sans-serif'
    const badgeTitles = unlockedBadges.map((b) => b.title).join(' · ') || 'Explorer'
    ctx.fillText(`Badges: ${badgeTitles}`, 36, 210)

    // Footer signature
    ctx.fillStyle = '#9b8f7a'
    ctx.font = '11px monospace'
    ctx.fillText('ODISHA — WHERE STONE LEARNED TO KEEP TIME', 36, 290)

    // Download trigger
    const link = document.createElement('a')
    link.download = 'My-Odisha-Passport.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="share-card card">
      <canvas ref={canvasRef} width="600" height="340" style={{ display: 'none' }} />
      <div className="share-card__head">
        <p className="eyebrow">{t('Culture Passport Summary', 'ସଂସ୍କୃତି ପାସପୋର୍ଟ ସାରାଂଶ')}</p>
        <h3>{t('Your Odisha Experience', 'ଆପଣଙ୍କ ଓଡ଼ିଶା ଅନୁଭୂତି')}</h3>
      </div>

      <div className="share-card__stats">
        <div className="share-card__stat">
          <strong>{discoveries.length}</strong>
          <span>{t('Discoveries Collected', 'ସଂଗୃହିତ ଆବିଷ୍କାର')}</span>
        </div>
        <div className="share-card__stat">
          <strong>{unlockedBadges.length}</strong>
          <span>{t('Badges Earned', 'ଅର୍ଜିତ ବ୍ୟାଜ୍')}</span>
        </div>
      </div>

      <div className="share-card__badges">
        {unlockedBadges.map((b) => (
          <span key={b.id} className="badge-pill">
            <i>{b.icon}</i> {t(b.title, b.titleOdia)}
          </span>
        ))}
      </div>

      <div className="share-card__actions">
        <button type="button" onClick={generateCard} className="btn">
          {t('Download Passport Card ↓', 'ପାସପୋର୍ଟ କାର୍ଡ ଡାଉନଲୋଡ୍ କରନ୍ତୁ ↓')}
        </button>
      </div>
    </div>
  )
}
