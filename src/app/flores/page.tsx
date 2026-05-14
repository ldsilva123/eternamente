'use client'
import { useState } from 'react'
import AppShell from '@/components/AppShell'
import { Heart, Loader2 } from 'lucide-react'

const MEMORIAL_SLUG = 'maria-helena-sousa'

const ALREADY = [
  { emoji: '🌹', who: 'João F.' },
  { emoji: '🕯', who: 'Ana S.' },
  { emoji: '🌻', who: 'família Costa' },
]

const FLOWERS = [
  { id: 'rosa',      emoji: '🌹', name: 'Rose',      desc: 'A simple gesture',  price: 99  },
  { id: 'ramalhete', emoji: '💐', name: 'Bouquet',   desc: 'For a special tribute', price: 299, featured: true },
  { id: 'girassol',  emoji: '🌻', name: 'Sunflower', desc: 'Joy that never fades', price: 149 },
]

const CANDLES = [
  { id: 'vela',     emoji: '🕯', name: 'Candle',   desc: 'May their light shine', price: 99  },
  { id: 'coroa',    emoji: '🌸', name: 'Wreath',   desc: 'A lasting tribute',     price: 499 },
  { id: 'surpresa', emoji: '🎁', name: 'Surprise', desc: 'On a special date',     price: 199 },
]

function Card({ p, selected, onSelect }: { p: any, selected: string | null, onSelect: (id: string) => void }) {
  const on = selected === p.id
  return (
    <button onClick={() => onSelect(p.id)} style={{ background: on ? '#fffdf8' : 'var(--card)', border: on ? '2px solid var(--gold)' : p.featured ? '1.5px solid var(--gold-b)' : '1px solid var(--sep)', borderRadius: 12, padding: '14px 12px', textAlign: 'center', cursor: 'pointer' }}>
      <span style={{ fontSize: 28, display: 'block', marginBottom: 8 }}>{p.emoji}</span>
      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', marginBottom: 3 }}>{p.name}</div>
      <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 10 }}>{p.desc}</div>
      <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--gold)' }}>€{(p.price/100).toFixed(2)}</div>
    </button>
  )
}

export default function FloresPage() {
  const [selected, setSelected] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const all = [...FLOWERS, ...CANDLES]
  const sel = all.find(p => p.id === selected)

  async function handleCheckout() {
    if (!selected || loading) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: selected, message, memorialSlug: MEMORIAL_SLUG }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else setError('Something went wrong. Please try again.')
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AppShell>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ background: 'var(--night)', padding: '22px 22px 18px' }}>
          <div style={{ fontSize: 12, color: 'rgba(240,232,216,0.45)', marginBottom: 4 }}>Offer to the memory of</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 500, color: '#f0e8d8', marginBottom: 14 }}>Maria Helena Sousa</h1>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {ALREADY.map((a, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 99, padding: '4px 10px', fontSize: 12, color: 'rgba(240,232,216,0.65)', display: 'flex', alignItems: 'center', gap: 4 }}>
                {a.emoji} {a.who}
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: 16, background: 'var(--bg)' }}>
          <div style={{ fontSize: 11, color: 'var(--text3)', fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 12 }}>Flowers</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 18 }}>
            {FLOWERS.map(p => <Card key={p.id} p={p} selected={selected} onSelect={setSelected} />)}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text3)', fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 12 }}>Candles & tributes</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 18 }}>
            {CANDLES.map(p => <Card key={p.id} p={p} selected={selected} onSelect={setSelected} />)}
          </div>
          <div style={{ background: 'var(--card)', border: '1px solid var(--sep)', borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 8 }}>Add a message (optional)</div>
            <input type="text" placeholder="With eternal love..." value={message} onChange={e => setMessage(e.target.value)} style={{ width: '100%', padding: '9px 12px', background: 'var(--bg)', border: '1px solid var(--sep2)', borderRadius: 8, fontSize: 13, color: 'var(--text)', marginBottom: 10 }} />
            {error && <div style={{ fontSize: 12, color: '#c0392b', background: '#fdf0ef', borderRadius: 8, padding: '8px 12px', marginBottom: 10 }}>{error}</div>}
            <button onClick={handleCheckout} disabled={!selected || loading} style={{ width: '100%', padding: '10px 0', background: selected && !loading ? 'var(--night)' : 'var(--bg3)', color: selected && !loading ? '#f0e8d8' : 'var(--text3)', border: 'none', borderRadius: 9, fontSize: 13, fontWeight: 500, cursor: selected && !loading ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
              {loading ? <Loader2 size={14} /> : <Heart size={14} />}
              {loading ? 'Redirecting...' : sel ? `Confirm · €${(sel.price/100).toFixed(2)}` : 'Select an offer'}
            </button>
            <div style={{ textAlign: 'center', marginTop: 10, fontSize: 11, color: 'var(--text3)' }}>Secure payment via Stripe</div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}