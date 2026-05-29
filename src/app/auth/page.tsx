'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [mode, setMode] = useState<'login'|'register'>('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  async function handleSubmit() {
    if (!email.trim() || !password.trim()) return
    setLoading(true)
    setError('')
    setSuccess('')
    const sb = createClient()

    if (mode === 'register') {
      if (!name.trim()) { setError('Please enter your name.'); setLoading(false); return }
      const { error: err } = await sb.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } }
      })
      if (err) setError(err.message)
      else setSuccess('Account created! Check your email to confirm, then sign in.')
    } else {
      const { error: err } = await sb.auth.signInWithPassword({ email, password })
      if (err) setError('Incorrect email or password.')
      else router.push('/feed')
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
      <div style={{ width:'100%', maxWidth:420 }}>
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <div style={{ fontSize:32, marginBottom:8 }}>🌸</div>
          <h1 style={{ fontFamily:'Playfair Display, serif', fontSize:28, color:'var(--text)', marginBottom:8 }}>LV Forever</h1>
          <p style={{ fontSize:14, color:'var(--text3)' }}>A living place for memories</p>
        </div>

        <div style={{ background:'var(--card)', border:'1px solid var(--sep)', borderRadius:16, padding:28 }}>
          <div style={{ display:'flex', gap:8, marginBottom:24 }}>
            <button onClick={()=>{setMode('login');setError('');setSuccess('')}} style={{ flex:1, padding:'9px 0', borderRadius:99, border:'1px solid var(--sep2)', background:mode==='login'?'var(--night)':'transparent', color:mode==='login'?'#f0e8d8':'var(--text2)', fontSize:13, cursor:'pointer', fontWeight:500 }}>Sign in</button>
            <button onClick={()=>{setMode('register');setError('');setSuccess('')}} style={{ flex:1, padding:'9px 0', borderRadius:99, border:'1px solid var(--sep2)', background:mode==='register'?'var(--night)':'transparent', color:mode==='register'?'#f0e8d8':'var(--text2)', fontSize:13, cursor:'pointer', fontWeight:500 }}>Create account</button>
          </div>

          {mode === 'register' && (
            <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" style={{ width:'100%', padding:'11px 14px', background:'var(--bg)', border:'1px solid var(--sep2)', borderRadius:10, fontSize:14, marginBottom:12, display:'block', color:'var(--text)' }}/>
          )}

          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" style={{ width:'100%', padding:'11px 14px', background:'var(--bg)', border:'1px solid var(--sep2)', borderRadius:10, fontSize:14, marginBottom:12, display:'block', color:'var(--text)' }}/>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" onKeyDown={e=>e.key==='Enter'&&handleSubmit()} style={{ width:'100%', padding:'11px 14px', background:'var(--bg)', border:'1px solid var(--sep2)', borderRadius:10, fontSize:14, marginBottom:16, display:'block', color:'var(--text)' }}/>

          {error && <div style={{ color:'#c0392b', background:'#fdf0ef', border:'1px solid #f5c6c2', borderRadius:8, padding:'8px 12px', marginBottom:14, fontSize:13 }}>{error}</div>}
          {success && <div style={{ color:'#27ae60', background:'#eafaf1', border:'1px solid #a9dfbf', borderRadius:8, padding:'8px 12px', marginBottom:14, fontSize:13 }}>{success}</div>}

          <button onClick={handleSubmit} disabled={loading} style={{ width:'100%', padding:'12px 0', background:loading?'var(--bg3)':'var(--night)', color:loading?'var(--text3)':'#f0e8d8', border:'none', borderRadius:10, fontSize:14, fontWeight:500, cursor:loading?'not-allowed':'pointer' }}>
            {loading ? '...' : mode==='login' ? 'Sign in' : 'Create account'}
          </button>

          {mode === 'login' && (
            <div style={{ textAlign:'center', marginTop:16, fontSize:13, color:'var(--text3)' }}>
              Don't have an account? <button onClick={()=>setMode('register')} style={{ background:'none', border:'none', color:'var(--gold)', cursor:'pointer', fontSize:13, fontWeight:500 }}>Sign up</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}