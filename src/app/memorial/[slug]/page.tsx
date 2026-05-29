'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import AppShell from '@/components/AppShell'
import CemeteryScene from '@/components/CemeteryScene'
import { createClient } from '@/lib/supabase/client'
import { Flower2, Plus, Share2, GitBranch, Heart } from 'lucide-react'

type Memorial = { id: string; slug: string; name: string; birth_date: string; death_date: string; quote?: string }
type Comment = { id: string; body: string; created_at: string }

function fmt(d: string) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()
}

export default function MemorialPage({ params }: { params: { slug: string } }) {
  const resolvedSlug = params?.slug || ''
  const [memorial, setMemorial] = useState<Memorial | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [followed, setFollowed] = useState(false)
  const [loading, setLoading] = useState(true)
  const [posting, setPosting] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const sb = createClient()
        const { data: m, error: e } = await sb.from('memorials').select('*').eq('slug', resolvedSlug).single()
        console.log('MEMORIAL DEBUG:', params.slug, m, e)
        if (m) {
          setMemorial(m)
          const { data: c } = await sb.from('comments').select('*').eq('memorial_id', m.id).order('created_at', { ascending: false })
          if (c) setComments(c)
        }
      } catch(e) {
        console.error(e)
      }
      setLoading(false)
    }
    load()
  }, [params.slug])

  async function submit() {
    if (!newComment.trim() || !memorial || posting) return
    setPosting(true)
    const sb = createClient()
    const { error } = await sb.from('comments').insert({ memorial_id: memorial.id, body: newComment.trim(), is_approved: true })
    if (!error) {
      setNewComment('')
      const { data: c2 } = await sb.from('comments').select('*').eq('memorial_id', memorial.id).order('created_at', { ascending: false })
      if (c2) setComments(c2)
    }
    setPosting(false)
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://lv-forever.com'
  const shareText = memorial ? `In memory of ${memorial.name} — LV Forever` : 'LV Forever'

  function copyLink() {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const CONN = [
    { i:'JS', g:'linear-gradient(135deg,#2d4a6a,#4a6a8a)', n:'José Sousa', r:'husband', slug:'jose-sousa' },
    { i:'PS', g:'linear-gradient(135deg,#2d5a2d,#4a8a4a)', n:'Pedro Sousa', r:'son', slug:'pedro-sousa' },
    { i:'AS', g:'linear-gradient(135deg,#6a2d2d,#8a4a4a)', n:'Ana Sousa', r:'daughter', slug:'ana-sousa' },
  ]

  if (loading) return <AppShell><div style={{padding:60,textAlign:'center',color:'var(--text3)',fontFamily:'Playfair Display,serif',fontSize:18}}>Loading...</div></AppShell>
  if (!memorial) return <AppShell><div style={{padding:60,textAlign:'center',color:'var(--text3)'}}>Memorial not found.</div></AppShell>

  const ini = memorial.name.split(' ').map((w:string)=>w[0]).slice(0,2).join('')

  return (
    <AppShell>
      <div style={{maxWidth:760,margin:'0 auto'}}>
        <div style={{position:'relative'}}>
          <CemeteryScene height={340} />
          <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'28px 28px 0',background:'linear-gradient(to top,rgba(30,60,30,0.97) 30%,rgba(30,60,30,0.5) 70%,transparent)'}}>
            <div style={{display:'flex',alignItems:'flex-end',gap:22}}>
              <div style={{flexShrink:0,marginBottom:20,width:110,height:110,borderRadius:'50%',border:'4px solid rgba(255,255,255,0.6)',background:'linear-gradient(135deg,#8a6a4a,#c4a47a)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:2}}>
                <div style={{fontSize:28,fontWeight:600,color:'rgba(255,255,255,0.9)',fontFamily:'Playfair Display,serif'}}>{ini}</div>
              </div>
              <div style={{paddingBottom:22,flex:1}}>
                <div style={{fontSize:11,color:'rgba(255,255,255,0.5)',letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:8}}>In memory of</div>
                <h1 style={{fontFamily:'Playfair Display,serif',fontSize:32,fontWeight:500,color:'#fff',textShadow:'0 2px 16px rgba(0,0,0,0.4)',lineHeight:1.1,marginBottom:8}}>{memorial.name}</h1>
                <div style={{fontSize:13,color:'rgba(255,255,255,0.6)',marginBottom:8}}>{fmt(memorial.birth_date)} · {fmt(memorial.death_date)}</div>
                {memorial.quote&&<div style={{fontSize:15,color:'rgba(255,255,255,0.78)',fontStyle:'italic',fontFamily:'Playfair Display,serif'}}>"{memorial.quote}"</div>}
              </div>
            </div>
          </div>
        </div>

        <div style={{background:'var(--night)',padding:'12px 28px',display:'flex',gap:28}}>
          {[{n:'47',l:'memories'},{n:'23',l:'flowers'},{n:String(comments.length),l:'comments'}].map(s=>(
            <div key={s.l}><span style={{fontSize:18,fontWeight:600,color:'#f0e8d8'}}>{s.n}</span><span style={{fontSize:12,color:'rgba(240,232,216,0.4)',marginLeft:5}}>{s.l}</span></div>
          ))}
        </div>

        <div style={{background:'var(--card)',padding:'14px 24px',display:'flex',gap:8,borderBottom:'1px solid var(--sep)',flexWrap:'wrap'}}>
          <Link href='/flores' style={{display:'flex',alignItems:'center',gap:7,padding:'10px 22px',borderRadius:99,background:'var(--gold)',color:'#fff',border:'none',fontSize:13,fontWeight:500,cursor:'pointer',textDecoration:'none'}}><Flower2 size={15}/> Leave flowers</Link>
          <button style={{display:'flex',alignItems:'center',gap:7,padding:'10px 18px',borderRadius:99,border:'1px solid var(--sep2)',background:'transparent',color:'var(--text2)',fontSize:13,cursor:'pointer'}}><Plus size={15}/> Memory</button>
          <button onClick={()=>setFollowed(f=>!f)} style={{display:'flex',alignItems:'center',gap:7,padding:'10px 18px',borderRadius:99,border:`1px solid ${followed?'var(--gold-b)':'var(--sep2)'}`,background:followed?'var(--gold-t)':'transparent',color:followed?'var(--gold)':'var(--text2)',fontSize:13,cursor:'pointer',transition:'all .2s'}}><Heart size={15} fill={followed?'currentColor':'none'}/> {followed?'Following':'Follow'}</button>
          <button onClick={()=>setShowShare(s=>!s)} style={{display:'flex',alignItems:'center',gap:7,padding:'10px 18px',borderRadius:99,border:'1px solid var(--sep2)',background:'transparent',color:'var(--text2)',fontSize:13,cursor:'pointer'}}><Share2 size={15}/> Share</button>
          {showShare&&(<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',zIndex:100,display:'flex',alignItems:'flex-end',justifyContent:'center'}} onClick={()=>setShowShare(false)}><div style={{background:'var(--card)',borderRadius:'20px 20px 0 0',padding:'24px',width:'100%',maxWidth:480}} onClick={e=>e.stopPropagation()}><div style={{fontSize:16,fontWeight:500,color:'var(--text)',marginBottom:20,textAlign:'center'}}>Share this memorial</div><div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:12,marginBottom:20}}><a href={`https://wa.me/?text=${encodeURIComponent(shareText+' '+shareUrl)}`} target="_blank" rel="noopener" style={{display:'flex',flexDirection:'column',alignItems:'center',gap:8,textDecoration:'none'}}><div style={{width:52,height:52,borderRadius:16,background:'#25D366',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24}}>📱</div><span style={{fontSize:11,color:'var(--text2)'}}>WhatsApp</span></a><a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener" style={{display:'flex',flexDirection:'column',alignItems:'center',gap:8,textDecoration:'none'}}><div style={{width:52,height:52,borderRadius:16,background:'#1877F2',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24}}>📘</div><span style={{fontSize:11,color:'var(--text2)'}}>Facebook</span></a><a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener" style={{display:'flex',flexDirection:'column',alignItems:'center',gap:8,textDecoration:'none'}}><div style={{width:52,height:52,borderRadius:16,background:'#000',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24}}>🐦</div><span style={{fontSize:11,color:'var(--text2)'}}>X</span></a><a href={`mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareUrl)}`} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:8,textDecoration:'none'}}><div style={{width:52,height:52,borderRadius:16,background:'var(--bg2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24}}>✉️</div><span style={{fontSize:11,color:'var(--text2)'}}>Email</span></a><button onClick={()=>{navigator.clipboard.writeText(shareUrl);alert('Link copied! Open Instagram and paste it.')}} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:8,background:'transparent',border:'none',cursor:'pointer',padding:0}}><div style={{width:52,height:52,borderRadius:16,background:'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24}}>📸</div><span style={{fontSize:11,color:'var(--text2)'}}>Instagram</span></button></div><button onClick={copyLink} style={{width:'100%',padding:'12px',borderRadius:12,border:'1px solid var(--sep2)',background:'var(--bg)',color:'var(--text)',fontSize:13,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>{copied?'✅ Link copied!':'🔗 Copy link'}</button></div></div>)}
        </div>

        <div style={{background:'var(--card)',padding:'16px 24px',borderBottom:'1px solid var(--sep)'}}>
          <div style={{display:'flex',alignItems:'center',gap:6,fontSize:11,color:'var(--text3)',fontWeight:500,letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:14}}><GitBranch size={12}/> Family</div>
          <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
            {CONN.map(c=>(
              <Link key={c.n} href={`/memorial/${c.slug}`} style={{display:'flex',alignItems:'center',gap:10,background:'var(--bg)',borderRadius:12,padding:'10px 18px 10px 10px',border:'1px solid var(--sep2)',cursor:'pointer',textDecoration:'none'}}>
                <div style={{width:34,height:34,borderRadius:'50%',background:c.g,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:600,color:'#fff'}}>{c.i}</div>
                <div><div style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>{c.n}</div><div style={{fontSize:11,color:'var(--text3)'}}>{c.r}</div></div>
              </Link>
            ))}
            <button style={{display:'flex',alignItems:'center',gap:6,borderRadius:12,padding:'10px 18px',border:'1px dashed var(--sep2)',cursor:'pointer',background:'transparent',color:'var(--text3)',fontSize:13}}><Plus size={13}/> Add</button>
          </div>
        </div>

        <div style={{display:'flex',background:'var(--card)',borderBottom:'1px solid var(--sep)',padding:'0 24px'}}>
          {['Memories','Gallery','Flowers (23)'].map((t,i)=>(
            <button key={t} style={{fontSize:13,padding:'13px 18px',color:i===0?'var(--text)':'var(--text3)',fontWeight:i===0?500:400,background:'transparent',cursor:'pointer',border:'none',borderBottom:i===0?'2px solid var(--gold)':'2px solid transparent'}}>{t}</button>
          ))}
        </div>

        <div style={{padding:'20px 24px',background:'var(--bg)'}}>
          {comments.length===0&&(
            <div style={{textAlign:'center',padding:'40px 0',color:'var(--text3)',fontStyle:'italic',fontFamily:'Playfair Display,serif',fontSize:15}}>Be the first to share a memory.</div>
          )}
          {comments.map(c=>(
            <article key={c.id} style={{background:'var(--card)',border:'1px solid var(--sep)',borderRadius:16,marginBottom:16,overflow:'hidden'}}>
              <div style={{padding:'16px 20px'}}>
                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
                  <div style={{width:34,height:34,borderRadius:'50%',background:'linear-gradient(135deg,#6a4a2a,#a87a4a)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16}}>💭</div>
                  <span style={{fontSize:14,fontWeight:500,color:'var(--text)'}}>Visitor</span>
                  <span style={{fontSize:12,color:'var(--text3)'}}> · {new Date(c.created_at).toLocaleDateString('en-GB')}</span>
                </div>
                <p style={{fontSize:15,color:'var(--text2)',lineHeight:1.75,fontStyle:'italic',fontFamily:'Playfair Display,serif'}}>"{c.body}"</p>
              </div>
              <div style={{padding:'10px 20px',borderTop:'1px solid var(--sep)',display:'flex',gap:6}}>
                <button style={{fontSize:13,color:'var(--text3)',display:'flex',alignItems:'center',gap:5,padding:'5px 14px',borderRadius:99,background:'var(--bg)',border:'1px solid var(--sep)',cursor:'pointer'}}>🕯 0</button>
                <button style={{fontSize:13,color:'var(--text3)',display:'flex',alignItems:'center',gap:5,padding:'5px 14px',borderRadius:99,background:'var(--bg)',border:'1px solid var(--sep)',cursor:'pointer'}}>🌹 0</button>
              </div>
            </article>
          ))}
          <div style={{background:'var(--card)',border:'1px solid var(--sep)',borderRadius:16,padding:20}}>
            <div style={{fontSize:14,fontWeight:500,color:'var(--text)',marginBottom:12}}>Share a memory</div>
            <textarea value={newComment} onChange={e=>setNewComment(e.target.value)} placeholder={`Write a memory about ${memorial.name}...`} style={{width:'100%',minHeight:100,resize:'vertical',background:'var(--bg)',border:'1px solid var(--sep2)',borderRadius:10,padding:'12px 14px',fontSize:14,color:'var(--text)',fontFamily:'Playfair Display,serif',fontStyle:'italic',marginBottom:12,lineHeight:1.7}}/>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <button style={{fontSize:12,color:'var(--text3)',background:'transparent',border:'1px solid var(--sep2)',borderRadius:99,padding:'7px 16px',cursor:'pointer'}}>📷 Add photo</button>
              <button onClick={submit} disabled={posting} style={{padding:'9px 26px',borderRadius:99,background:posting?'var(--bg3)':'var(--night)',color:posting?'var(--text3)':'#f0e8d8',border:'none',fontSize:13,fontWeight:500,cursor:posting?'not-allowed':'pointer'}}>{posting?'Publishing...':'Publish'}</button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}