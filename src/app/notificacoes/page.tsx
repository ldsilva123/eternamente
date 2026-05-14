'use client'
import AppShell from '@/components/AppShell'

const TODAY = [
  { id: '1', emoji: '🎂', bg: '#fdf0e8', text: 'Hoje faria 82 anos — Maria Helena Sousa. Partilha uma memória para celebrar o dia.', time: 'há 2 horas', unread: true },
  { id: '2', emoji: '🌹', bg: null,      text: 'João Ferreira deixou uma rosa no memorial da Maria Helena.', time: 'há 3 horas', unread: true },
  { id: '3', emoji: '📸', bg: '#e8f4e8', text: 'Pedro Sousa partilhou uma nova memória com a família.', time: 'há 5 horas', unread: true },
]

const WEEK = [
  { id: '4', emoji: '🌻', bg: null,      text: 'Maria Costa deixou um girassol e uma mensagem de saudade.', time: 'há 2 dias', unread: false },
  { id: '5', emoji: '🕯', bg: '#fdf4e8', text: 'Daqui a 8 dias é o Dia de Finados. Deixa uma vela nos memoriais que segues.', time: 'há 4 dias', unread: false },
  { id: '6', emoji: '🔗', bg: '#e8eef8', text: 'Ana Sousa ligou o José Sousa à Maria Helena como marido e mulher.', time: 'há 5 dias', unread: false },
]

function Group({ label, items }: { label: string, items: typeof TODAY }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 11, color: 'var(--text3)', fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 10 }}>{label}</div>
      {items.map(n => (
        <div key={n.id} className="fade-up" style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 14px', borderRadius: 12, marginBottom: 8, background: n.unread ? 'var(--card)' : 'transparent', border: n.unread ? '1px solid var(--sep2)' : '1px solid transparent', cursor: 'pointer' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0, background: n.bg ?? 'var(--bg2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, border: '1px solid var(--sep)' }}>{n.emoji}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.55 }}>{n.text}</div>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>{n.time}</div>
          </div>
          {n.unread && <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--gold)', marginTop: 4, flexShrink: 0 }} />}
        </div>
      ))}
    </div>
  )
}

export default function NotificacoesPage() {
  return (
    <AppShell unreadCount={3}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid var(--sep)', background: 'var(--card)' }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 500, color: 'var(--text)' }}>Notificações</h1>
        </div>
        <div style={{ padding: '14px 16px', background: 'var(--bg)' }}>
          <Group label="Hoje" items={TODAY} />
          <Group label="Esta semana" items={WEEK} />
        </div>
      </div>
    </AppShell>
  )
}
