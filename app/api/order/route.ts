import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const data = await request.json()
  const required = ['name', 'discord', 'serverName', 'invite']
  if (required.some((key) => typeof data[key] !== 'string' || !data[key].trim())) return NextResponse.json({ error: 'Hiányzó adat' }, { status: 400 })
  const webhook = process.env.DISCORD_WEBHOOK_URL
  if (!webhook) return NextResponse.json({ error: 'A webhook nincs beállítva' }, { status: 503 })
  const price = String(data.coupon || '').trim().toUpperCase() === 'ELSO10' ? '351 Ft (10% kedvezménnyel)' : '390 Ft'
  const content = [`**Új dewyhosting rendelés**`, `Név: ${data.name}`, `Discord: ${data.discord}`, `Szerver: ${data.serverName}`, `Meghívó: ${data.invite}`, `Kupon: ${data.coupon || '—'}`, `Fizetendő: ${price}`].join('\n')
  const response = await fetch(webhook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content, allowed_mentions: { parse: [] } }) })
  if (!response.ok) return NextResponse.json({ error: 'Webhook hiba' }, { status: 502 })
  return NextResponse.json({ ok: true })
}
