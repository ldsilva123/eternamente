'use client'
import { useEffect, useState } from 'react'
import AppShell from '@/components/AppShell'
import CemeteryScene from '@/components/CemeteryScene'
import { createClient } from '@/lib/supabase/client'
import { Flower2, Plus, Share2, GitBranch, MessageCircle, Heart } from 'lucide-react'

type Memorial = { id: string; slug: string; name: string; birth_date: string; death_date: string; quote?: string }
type Comment = { id: string; body: string; created_at: string }

function fmt(d: string) {
  return new Date(d).toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()
}

export default function MemorialPage() {
  const [memorial, setMemorial] = useState<Memorial | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [followed, setFollowed] = useState(false)
  const [loading, setLoading] = useState(true)
  const [posting, setPosting] = useState(false)

  useEffect(() => {
    async function load() {
      const sb = createClient()
      const { data: m } = await sb.from('memorials').select('*').eq('slug','maria-helena-sousa').single()
      if (m) {
        setMemorial(m)
        const { data: c } = await sb.from('comments').select('*').eq('memorial_id', m.id).order('created_at',{ascending:false})
        if (c) setComments(c)
      }
      setLoading(false)
    }
    load()
  }, [])

  async function submit() {
    if (!newComment.trim() || !memorial || posting) return
    setPosting(true)
    const sb = createClient()
    const { data, error } = await sb.from('comments').insert({ memorial_id: memorial.id, body: newComment.trim(), is_approved: true }).select().single()
    console.log('insert result:', data, error)
    if (!error) {
      setNewComment('')
      const sb2 = createClient()
      const { data: c2 } = await sb2.from('comments').select('*').eq('memorial_id', memorial.id).order('created_at',{ascending:false})
      if (c2) setComments(c2)
    }
    setPosting(false)
  }

  const CONN = [
    { i:'JS', g:'linear-gradient(135deg,#2d4a6a,#4a6a8a)', n:'José Sousa', r:'marido' },
    { i:'PS', g:'linear-gradient(135deg,#2d5a2d,#4a8a4a)', n:'Pedro Sousa', r:'filho' },
    { i:'AS', g:'linear-gradient(135deg,#6a2d2d,#8a4a4a)', n:'Ana Sousa', r:'filha' },
  ]

  if (loading) return <AppShell><div style={{padding:60,textAlign:'center',color:'var(--text3)',fontFamily:'Playfair Display,serif',fontSize:18}}>A carregar...</div></AppShell>
  if (!memorial) return <AppShell><div style={{padding:60,textAlign:'center',color:'var(--text3)'}}>Memorial não encontrado.</div></AppShell>

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
                <div style={{fontSize:10,color:'rgba(255,255,255,0.5)',letterSpacing:'0.08em'}}>FOTO</div>
              </div>
              <div style={{paddingBottom:22,flex:1}}>
                <div style={{fontSize:11,color:'rgba(255,255,255,0.5)',letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:8}}>Em memória de</div>
                <h1 style={{fontFamily:'Playfair Display,serif',fontSize:32,fontWeight:500,color:'#fff',textShadow:'0 2px 16px rgba(0,0,0,0.4)',lineHeight:1.1,marginBottom:8}}>{memorial.name}</h1>
                <div style={{fontSize:13,color:'rgba(255,255,255,0.6)',marginBottom:8}}>{fmt(memorial.birth_date)} · {fmt(memorial.death_date)}</div>
                {memorial.quote&&<div style={{fontSize:15,color:'rgba(255,255,255,0.78)',fontStyle:'italic',fontFamily:'Playfair Display,serif'}}>"{memorial.quote}"</div>}
              </div>
            </div>
          </div>
        </div>

        <div style={{background:'var(--night)',padding:'12px 28px',display:'flex',gap:28}}>
          {[{n:'47',l:'memórias'},{n:'23',l:'flores'},{n:String(comments.length),l:'comentários'}].map(s=>(
            <div key={s.l}><span style={{fontSize:18,fontWeight:600,color:'#f0e8d8'}}>{s.n}</span><span style={{fontSize:12,color:'rgba(240,232,216,0.4)',marginLeft:5}}>{s.l}</span></div>
          ))}
        </div>

        <div style={{background:'var(--card)',padding:'14px 24px',display:'flex',gap:8,borderBottom:'1px solid var(--sep)',flexWrap:'wrap'}}>
          <button style={{display:'flex',alignItems:'center',gap:7,padding:'10px 22px',borderRadius:99,background:'var(--gold)',color:'#fff',border:'none',fontSize:13,fontWeight:500,cursor:'pointer'}}><Flower2 size={15}/> Deixar flores</button>
          <button style={{display:'flex',alignItems:'center',gap:7,padding:'10px 18px',borderRadius:99,border:'1px solid var(--sep2)',background:'transparent',color:'var(--text2)',fontSize:13,cursor:'pointer'}}><Plus size={15}/> Memória</button>
          <button onClick={()=>setFollowed(f=>!f)} style={{display:'flex',alignItems:'center',gap:7,padding:'10px 18px',borderRadius:99,border:`1px solid ${followed?'var(--gold-b)':'var(--sep2)'}`,background:followed?'var(--gold-t)':'transparent',color:followed?'var(--gold)':'var(--text2)',fontSize:13,cursor:'pointer',transition:'all .2s'}}><Heart size={15} fill={followed?'currentColor':'none'}/> {followed?'A seguir':'Seguir'}</button>
          <button style={{display:'flex',alignItems:'center',gap:7,padding:'10px 18px',borderRadius:99,border:'1px solid var(--sep2)',background:'transparent',color:'var(--text2)',fontSize:13,cursor:'pointer'}}><Share2 size={15}/> Partilhar</button>
        </div>

        <div style={{background:'var(--card)',padding:'16px 24px',borderBottom:'1px solid var(--sep)'}}>
          <div style={{display:'flex',alignItems:'center',gap:6,fontSize:11,color:'var(--text3)',fontWeight:500,letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:14}}><GitBranch size={12}/> Família</div>
          <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
            {CONN.map(c=>(
              <button key={c.n} style={{display:'flex',alignItems:'center',gap:10,background:'var(--bg)',borderRadius:12,padding:'10px 18px 10px 10px',border:'1px solid var(--sep2)',cursor:'pointer'}}>
                <div style={{width:34,height:34,borderRadius:'50%',background:c.g,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:600,color:'#fff'}}>{c.i}</div>
                <div><div style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>{c.n}</div><div style={{fontSize:11,color:'var(--text3)'}}>{c.r}</div></div>
              </button>
            ))}
            <button style={{display:'flex',alignItems:'center',gap:6,borderRadius:12,padding:'10px 18px',border:'1px dashed var(--sep2)',cursor:'pointer',background:'transparent',color:'var(--text3)',fontSize:13}}><Plus size={13}/> Adicionar</button>
          </div>
        </div>

        <div style={{display:'flex',background:'var(--card)',borderBottom:'1px solid var(--sep)',padding:'0 24px'}}>
          {['Memórias','Galeria','Flores (23)'].map((t,i)=>(
            <button key={t} style={{fontSize:13,padding:'13px 18px',color:i===0?'var(--text)':'var(--text3)',fontWeight:i===0?500:400,background:'transparent',cursor:'pointer',border:'none',borderBottom:i===0?'2px solid var(--gold)':'2px solid transparent'}}>{t}</button>
          ))}
        </div>

        <div style={{padding:'20px 24px',background:'var(--bg)'}}>
          {comments.length===0&&(
            <div style={{textAlign:'center',padding:'40px 0',color:'var(--text3)',fontStyle:'italic',fontFamily:'Playfair Display,serif',fontSize:15}}>Sê o primeiro a partilhar uma memória.</div>
          )}
          {comments.map(c=>(
            <article key={c.id} style={{background:'var(--card)',border:'1px solid var(--sep)',borderRadius:16,marginBottom:16,overflow:'hidden',boxShadow:'0 2px 10px rgba(42,32,24,0.06)'}}>
              <div style={{padding:'16px 20px'}}>
                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
                  <div style={{width:34,height:34,borderRadius:'50%',background:'linear-gradient(135deg,#6a4a2a,#a87a4a)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16}}>💭</div>
                  <span style={{fontSize:14,fontWeight:500,color:'var(--text)'}}>Visitante</span>
                  <span style={{fontSize:12,color:'var(--text3)'}}>· {new Date(c.created_at).toLocaleDateString('pt-PT')}</span>
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
            <div style={{fontSize:14,fontWeight:500,color:'var(--text)',marginBottom:12}}>Partilhar uma memória</div>
            <textarea value={newComment} onChange={e=>setNewComment(e.target.value)} placeholder={`Escreve aqui uma memória sobre ${memorial.name}...`} style={{width:'100%',minHeight:100,resize:'vertical',background:'var(--bg)',border:'1px solid var(--sep2)',borderRadius:10,padding:'12px 14px',fontSize:14,color:'var(--text)',fontFamily:'Playfair Display,serif',fontStyle:'italic',marginBottom:12,lineHeight:1.7}}/>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <button style={{fontSize:12,color:'var(--text3)',background:'transparent',border:'1px solid var(--sep2)',borderRadius:99,padding:'7px 16px',cursor:'pointer'}}>📷 Adicionar foto</button>
              <button onClick={submit} disabled={posting} style={{padding:'9px 26px',borderRadius:99,background:posting?'var(--bg3)':'var(--night)',color:posting?'var(--text3)':'#f0e8d8',border:'none',fontSize:13,fontWeight:500,cursor:posting?'not-allowed':'pointer'}}>{posting?'A publicar...':'Publicar'}</button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
