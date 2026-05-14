
'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState('password')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function login() {
    if (!email.trim()) return
    setLoading(true)
    setError('')
    const sb = createClient()
    if (mode === 'magic') {
      await sb.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin + '/auth/callback' } })
      alert('Link enviado para ' + email)
    } else {
      const { error: err } = await sb.auth.signInWithPassword({ email, password })
      if (err) setError('Email ou password incorrectos.')
      else router.push('/feed')
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
      <div style={{ width:'100%', maxWidth:420 }}>
        <h1 style={{ fontFamily:'Playfair Display, serif', fontSize:28, textAlign:'center', marginBottom:32 }}>Entrar</h1>
        <div style={{ background:'var(--card)', border:'1px solid var(--sep)', borderRadius:16, padding:28 }}>
          <div style={{ display:'flex', gap:8, marginBottom:20 }}>
            <button onClick={()=>setMode('password')} style={{ flex:1, padding:'8px 0', borderRadius:99, border:'1px solid var(--sep2)', background:mode==='password'?'var(--night)':'transparent', color:mode==='password'?'#f0e8d8':'var(--text2)', fontSize:12, cursor:'pointer' }}>Password</button>
            <button onClick={()=>setMode('magic')} style={{ flex:1, padding:'8px 0', borderRadius:99, border:'1px solid var(--sep2)', background:mode==='magic'?'var(--night)':'transparent', color:mode==='magic'?'#f0e8d8':'var(--text2)', fontSize:12, cursor:'pointer' }}>Link email</button>
          </div>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" style={{ width:'100%', padding:'11px 14px', background:'var(--bg)', border:'1px solid var(--sep2)', borderRadius:10, fontSize:14, marginBottom:14, display:'block' }}/>
          {mode === 'password' && <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" style={{ width:'100%', padding:'11px 14px', background:'var(--bg)', border:'1px solid var(--sep2)', borderRadius:10, fontSize:14, marginBottom:14, display:'block' }}/>}
          {error && <div style={{ color:'red', marginBottom:12, fontSize:13 }}>{error}</div>}
          <button onClick={login} disabled={loading} style={{ width:'100%', padding:'12px 0', background:'var(--night)', color:'#f0e8d8', border:'none', borderRadius:10, fontSize:14

, cursor:'pointer' }}>{loading?'...':mode==='password'?'Entrar':'Enviar link'}</button>
        </div>
      </div>
    </div>
  )
}

