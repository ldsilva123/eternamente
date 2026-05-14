'use client'
import AppShell from '@/components/AppShell'
import { Bell, Plus, Users } from 'lucide-react'

const POSTS = [
  {
    id: '1', avatar: 'MH', bg: 'linear-gradient(135deg,#6a4a2a,#c4a47a)',
    name: 'Maria Helena Sousa', meta: 'March 12 · birthday',
    text: 'Ana shared a photo from their last Christmas together. Every year that passes, this memory becomes more precious.',
    hasPhoto: true, photoBg: 'linear-gradient(160deg,#c8a882,#e8d0b0)',
    candles: 14, roses: 8, comments: 3, tag: null,
    context: 'Would have turned 82 today', contextIcon: '🕯'
  },
  {
    id: '2', avatar: 'JF', bg: 'linear-gradient(135deg,#2d4a6a,#4a6a8a)',
    name: 'João Ferreira', meta: '2 days ago',
    text: 'I found this photo of my father fishing in 1994. I still remember the smell of the sea that day and his smile when he caught the first fish.',
    hasPhoto: true, photoBg: 'linear-gradient(160deg,#a8c4e0,#c8dff0)',
    candles: 6, roses: 22, comments: 7,
    tag: 'António Rodrigues',
    context: 'New memory shared', contextIcon: '📸'
  },
  {
    id: '3', avatar: 'MC', bg: 'linear-gradient(135deg,#4a2a6a,#8a4aaa)',
    name: 'Maria Costa', meta: '4 days ago',
    text: null, hasPhoto: false, photoBg: '',
    candles: 3, roses: 1, comments: 0,
    tag: 'Maria Helena Sousa',
    context: 'Left a candle burning', contextIcon: '🕯'
  },
]

const UPCOMING = [
  { icon: '🌸', title: 'All Souls Day', sub: 'in 8 days' },
  { icon: '🎂', title: 'António R.', sub: 'anniversary — in 12 days' },
]

const SUGGESTED = [
  { i: 'FC', g: 'linear-gradient(135deg,#2d5a2d,#4a8a4a)', n: 'Fernanda Costa', s: '3 friends follow' },
  { i: 'MP', g: 'linear-gradient(135deg,#6a4a2a,#a87a4a)', n: 'Manuel Pereira', s: 'From your region' },
]

export default function FeedPage() {
  return (
    <AppShell>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 28, maxWidth: 1000, margin: '0 auto', padding: '0 0 40px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, paddingTop: 4 }}>
            <div>
              <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: 24, fontWeight: 500, color: 'var(--text)', marginBottom: 4 }}>Your memories</h1>
              <p style={{ fontSize: 13, color: 'var(--text3)' }}>3 new memories since yesterday</p>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px', borderRadius: 99, background: 'var(--night)', color: '#f0e8d8', border: 'none', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
              <Plus size={14} /> New memorial
            </button>
          </div>

          {POSTS.map((p, i) => (
            <article key={p.id} style={{ background: 'var(--card)', border: '1px solid var(--sep)', borderRadius: 16, marginBottom: 16, overflow: 'hidden', boxShadow: '0 2px 10px rgba(42,32,24,0.05)', animation: 'fadeUp .4s ease both', animationDelay: `${i * 0.06}s` }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--sep)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 14 }}>{p.contextIcon}</span>
                <span style={{ fontSize: 12, color: 'var(--text3)' }}>{p.context}</span>
                {p.tag && <span style={{ marginLeft: 'auto', fontSize: 11, padding: '3px 10px', borderRadius: 99, background: 'var(--gold-t)', color: 'var(--gold)', border: '1px solid var(--gold-b)' }}>{p.tag}</span>}
              </div>
              {p.hasPhoto && (
                <div style={{ width: '100%', height: 200, background: p.photoBg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <div style={{ fontSize: 36 }}>🖼️</div>
                  <div style={{ fontSize: 11, color: 'rgba(120,90,60,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Photography</div>
                </div>
              )}
              <div style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: '#fff', flexShrink: 0 }}>{p.avatar}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)' }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text3)' }}>{p.meta}</div>
                  </div>
                </div>
                {p.text && <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.75, fontStyle: 'italic', fontFamily: 'Playfair Display,serif' }}>"{p.text}"</p>}
              </div>
              <div style={{ padding: '10px 16px', borderTop: '1px solid var(--sep)', display: 'flex', gap: 6 }}>
                {[{ e: '🕯', c: p.candles }, { e: '🌹', c: p.roses }].map(r => (
                  <button key={r.e} style={{ fontSize: 13, color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 99, background: 'var(--bg)', border: '1px solid var(--sep)', cursor: 'pointer' }}>{r.e} {r.c}</button>
                ))}
                <button style={{ fontSize: 13, color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 99, background: 'var(--bg)', border: '1px solid var(--sep)', cursor: 'pointer' }}>💬 {p.comments}</button>
              </div>
            </article>
          ))}
        </div>

        <div style={{ paddingTop: 4 }}>
          <div style={{ background: 'var(--card)', border: '1px solid var(--sep)', borderRadius: 16, padding: 20, marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text3)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 14 }}><Bell size={11} /> Upcoming dates</div>
            {UPCOMING.map(u => (
              <div key={u.title} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--sep)' }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--bg2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{u.icon}</div>
                <div><div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{u.title}</div><div style={{ fontSize: 11, color: 'var(--text3)' }}>{u.sub}</div></div>
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--card)', border: '1px solid var(--sep)', borderRadius: 16, padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text3)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 14 }}><Users size={11} /> Suggested memorials</div>
            {SUGGESTED.map(s => (
              <div key={s.n} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--sep)' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: s.g, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: '#fff', flexShrink: 0 }}>{s.i}</div>
                <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{s.n}</div><div style={{ fontSize: 11, color: 'var(--text3)' }}>{s.s}</div></div>
                <button style={{ fontSize: 12, padding: '5px 14px', borderRadius: 99, border: '1px solid var(--sep2)', background: 'transparent', color: 'var(--text2)', cursor: 'pointer' }}>Follow</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
