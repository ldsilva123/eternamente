'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, Bell, BookOpen, User, Flower2, Leaf } from 'lucide-react'

const NAV = [
  { href: '/feed',         icon: Home,     label: 'Feed' },
  { href: '/explorar',     icon: Search,   label: 'Explorar' },
  { href: '/notificacoes', icon: Bell,     label: 'Notificações' },
  { href: '/memoriais',    icon: BookOpen, label: 'Memoriais' },
  { href: '/flores',        icon: Flower2,  label: 'Flowers' },
  { href: '/perfil',       icon: User,     label: 'Perfil' },
]

export default function AppShell({ children, unreadCount = 0 }: {
  children: React.ReactNode
  unreadCount?: number
}) {
  const path = usePathname()
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <aside style={{
        width: 64, background: 'var(--night)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '16px 0', gap: 4,
        position: 'sticky', top: 0, height: '100vh', flexShrink: 0,
      }}>
        <Link href="/feed" style={{
          width: 38, height: 38, borderRadius: 11,
          background: 'rgba(240,232,216,0.14)',
          border: '1px solid rgba(240,232,216,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 12, color: '#f0e8d8', textDecoration: 'none',
        }}>
          <Leaf size={17} />
        </Link>
        {NAV.map(({ href, icon: Icon, label }) => {
          const active = path.startsWith(href)
          const isNotif = href === '/notificacoes'
          return (
            <Link key={href} href={href} title={label} style={{
              width: 42, height: 42, borderRadius: 11,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: active ? '#f0e8d8' : 'rgba(240,232,216,0.35)',
              background: active ? 'rgba(240,232,216,0.13)' : 'transparent',
              textDecoration: 'none', position: 'relative', transition: 'all .15s',
            }}>
              <Icon size={19} />
              {isNotif && unreadCount > 0 && (
                <span style={{
                  position: 'absolute', top: 7, right: 7,
                  width: 7, height: 7, borderRadius: '50%',
                  background: '#e07050', border: '1.5px solid var(--night)',
                }} />
              )}
            </Link>
          )
        })}
        <Link href="/perfil" style={{
          marginTop: 'auto', width: 32, height: 32, borderRadius: '50%',
          background: 'rgba(240,232,216,0.18)',
          border: '1.5px solid rgba(240,232,216,0.28)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#f0e8d8', fontSize: 11, fontWeight: 500, textDecoration: 'none',
        }}>
          AS
        </Link>
      </aside>
      <main style={{ flex: 1, minWidth: 0 }}>{children}</main>
    </div>
  )
}
