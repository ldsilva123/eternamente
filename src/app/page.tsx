import Link from 'next/link'
import CemeteryScene from '@/components/CemeteryScene'

export default function Home() {
  return (
    <div style={{ fontFamily: 'DM Sans, sans-serif', background: 'var(--bg)', minHeight: '100vh' }}>
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(253,250,246,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--sep)', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: 'var(--night)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🌸</div>
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 500, color: 'var(--text)' }}>LV Forever</span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link href="/auth" style={{ fontSize: 14, color: 'var(--text2)', textDecoration: 'none', padding: '8px 16px' }}>Sign in</Link>
          <Link href="/auth" style={{ fontSize: 14, background: 'var(--night)', color: '#f0e8d8', padding: '9px 20px', borderRadius: 99, textDecoration: 'none', fontWeight: 500 }}>Create memorial</Link>
        </div>
      </nav>

      <div style={{ position: 'relative' }}>
        <CemeteryScene height={420} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px', background: 'linear-gradient(to bottom, transparent 30%, rgba(28,46,28,0.7) 100%)' }}>
          <div style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>A space of memory and love</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 52, fontWeight: 500, color: '#fff', lineHeight: 1.15, marginBottom: 20, textShadow: '0 2px 20px rgba(0,0,0,0.4)', maxWidth: 700 }}>
            The memories of those<br />we love live forever
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.75)', fontStyle: 'italic', fontFamily: 'Playfair Display, serif', marginBottom: 36, maxWidth: 500 }}>
            "A place where families gather to preserve, share<br />and celebrate the lives of their loved ones."
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/auth" style={{ padding: '14px 32px', borderRadius: 99, background: 'rgba(253,250,246,0.95)', color: 'var(--night)', fontSize: 15, fontWeight: 600, textDecoration: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>Create a memorial</Link>
            <Link href="/memorial" style={{ padding: '14px 32px', borderRadius: 99, background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: 15, fontWeight: 500, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(4px)' }}>See example</Link>
          </div>
        </div>
      </div>

      <div style={{ padding: '80px 40px', textAlign: 'center', maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 38, fontWeight: 500, color: 'var(--text)', marginBottom: 16 }}>A living place, not just an archive</h2>
        <p style={{ fontSize: 16, color: 'var(--text2)', marginBottom: 56, maxWidth: 520, margin: '0 auto 56px' }}>Share memories, receive notifications on special dates and keep the family united.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[
            { icon: '📸', title: 'Shared memories', desc: 'Photos, videos, audio and stories that family and friends contribute over time.' },
            { icon: '🕯', title: 'Virtual flowers & candles', desc: 'Anyone can leave a flower or light a candle on special dates, from anywhere in the world.' },
            { icon: '🌳', title: 'Family tree', desc: 'Link memorials together and create a web of memory that spans generations.' },
          ].map(f => (
            <div key={f.title} style={{ background: 'var(--card)', borderRadius: 16, padding: '32px 24px', border: '1px solid var(--sep)', textAlign: 'left' }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 500, color: 'var(--text)', marginBottom: 10 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: 'var(--card)', borderTop: '1px solid var(--sep)', borderBottom: '1px solid var(--sep)', padding: '80px 40px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 38, fontWeight: 500, color: 'var(--text)', marginBottom: 48 }}>What families say</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: 1000, margin: '0 auto' }}>
          {[
            { q: 'Finally a place to keep my mother\'s memories and share them with the whole family, even those far away.', n: 'Sarah M.', r: 'Daughter' },
            { q: 'My grandfather passed before I was born. Thanks to LV Forever, I feel like I know him through the stories the family shared.', n: 'James K.', r: 'Grandson' },
            { q: 'Families love it. It\'s the perfect complement to our service and uptake is nearly 100%.', n: 'Michael R.', r: 'Funeral Director' },
          ].map(t => (
            <div key={t.n} style={{ background: 'var(--bg)', borderRadius: 16, padding: '28px 24px', border: '1px solid var(--sep)', textAlign: 'left' }}>
              <p style={{ fontSize: 15, color: 'var(--text2)', fontStyle: 'italic', fontFamily: 'Playfair Display, serif', lineHeight: 1.75, marginBottom: 20 }}>"{t.q}"</p>
              <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)' }}>{t.n}</div>
              <div style={{ fontSize: 12, color: 'var(--text3)' }}>{t.r}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '80px 40px', textAlign: 'center', background: 'var(--night)' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 38, fontWeight: 500, color: '#f0e8d8', marginBottom: 16 }}>Start today, for just €2.90/month</h2>
        <p style={{ fontSize: 16, color: 'rgba(240,232,216,0.6)', marginBottom: 36 }}>Created in minutes. Shared with the whole family. Saved forever.</p>
        <Link href="/auth" style={{ display: 'inline-block', padding: '16px 40px', borderRadius: 99, background: 'var(--gold)', color: '#fff', fontSize: 16, fontWeight: 600, textDecoration: 'none', boxShadow: '0 4px 20px rgba(184,125,58,0.4)' }}>Create the first memorial</Link>
        <p style={{ fontSize: 13, color: 'rgba(240,232,216,0.35)', marginTop: 20 }}>No commitment · Cancel anytime · Data saved forever</p>
      </div>
    </div>
  )
}