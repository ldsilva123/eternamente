'use client'
import { useState } from 'react'
import AppShell from '@/components/AppShell'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Search } from 'lucide-react'

type Memorial = { id: string; slug: string; name: string; birth_date: string; death_date: string; quote?: string }

export default function ExplorarPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Memorial[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  async function handleSearch() {
    if (!query.trim()) return
    setLoading(true)
    setSearched(true)
    const sb = createClient()
    const { data } = await sb.from('memorials').select('*').ilike('name', `%${query}%`).limit(20)
    setResults(data || [])
    setLoading(false)
  }

  function fmt(d: string) {
    return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  return (
    <AppShell>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '32px 16px' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 500, color: 'var(--text)', marginBottom: 24 }}>Search memorials</h1>

        <div style={{ display: 'flex', gap: 10, marginBottom: 32 }}>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="Search by name..."
            style={{ flex: 1, padding: '12px 16px', borderRadius: 12, border: '1px solid var(--sep2)', background: 'var(--card)', fontSize: 15, color: 'var(--text)', outline: 'none' }}
          />
          <button onClick={handleSearch} disabled={loading} style={{ padding: '12px 20px', borderRadius: 12, background: 'var(--night)', color: '#f0e8d8', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Search size={16} /> {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {searched && !loading && results.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text3)', fontStyle: 'italic', fontFamily: 'Playfair Display, serif' }}>No memorials found for "{query}"</div>
        )}

        {results.map(m => (
          <Link key={m.id} href="/memorial" style={{ textDecoration: 'none', display: 'block', background: 'var(--card)', border: '1px solid var(--sep)', borderRadius: 16, padding: '20px', marginBottom: 12, boxShadow: '0 2px 10px rgba(42,32,24,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg,#8a6a4a,#c4a47a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 600, color: '#fff', flexShrink: 0 }}>
                {m.name.split(' ').map((w: string) => w[0]).slice(0, 2).join('')}
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 500, color: 'var(--text)', fontFamily: 'Playfair Display, serif' }}>{m.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>{fmt(m.birth_date)} · {fmt(m.death_date)}</div>
                {m.quote && <div style={{ fontSize: 13, color: 'var(--text2)', fontStyle: 'italic', marginTop: 4 }}>"{m.quote}"</div>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </AppShell>
  )
}