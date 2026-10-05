import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const data = await request.json()
  if (typeof data.serverName !== 'string' || !data.serverName.trim()) return NextResponse.json({ error: 'A szerver neve kötelező' }, { status: 400 })
  const webhook = process.env.DISCORD_WEBHOOK_URL
  if (!webhook) return NextResponse.json({ error: 'A webhook nincs beállítva' }, { status: 503 })
  const price = data.total || (String(data.coupon || '').trim().toUpperCase() === 'ELSO10' ? '346 Ft (10% kedvezménnyel)' : '385 Ft')
  const content = [`**Új dewyhosting rendelés**`, `Szerver: ${data.serverName}`, `Kupon: ${data.coupon || '—'}`, `Tárhely bővítés: ${data.ramAddon || 'Nincs'}`, `CPU bővítés: ${data.cpuAddon || 'Nincs'}`, `Fizetőeszköz: ${data.currency || 'HUF'}`, `Fizetendő: ${price}`].join('\\n')
  const response = await fetch(webhook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content, allowed_mentions: { parse: [] } }) })
  if (!response.ok) return NextResponse.json({ error: 'Webhook hiba' }, { status: 502 })
  return NextResponse.json({ ok: true })
}
