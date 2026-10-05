'use client'

import { FormEvent, useState } from 'react'
import { Check, Loader2, Send } from 'lucide-react'

export function OrderForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus('loading')
    const form = new FormData(event.currentTarget)
    try {
      const response = await fetch('/api/order', { method: 'POST', body: JSON.stringify(Object.fromEntries(form)), headers: { 'Content-Type': 'application/json' } })
      if (!response.ok) throw new Error('failed')
      setStatus('success'); event.currentTarget.reset()
    } catch { setStatus('error') }
  }
  if (status === 'success') return <div className="rounded-2xl border border-[#b8d8c3] bg-[#effaf2] p-8 text-center"><div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-[#3f8c5a] text-white"><Check /></div><h3 className="text-xl font-bold">Rendelés elküldve!</h3><p className="mt-2 text-sm text-[#587061]">Hamarosan felvesszük veled a kapcsolatot Discordon.</p><button onClick={() => setStatus('idle')} className="mt-5 text-sm font-bold text-[#b33a3d] underline">Új rendelés</button></div>
  return <form onSubmit={submit} className="space-y-4">
    <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold">Neved<input required name="name" className="form-input" placeholder="Pl. Dávid" /></label><label className="text-sm font-semibold">Discord neved<input required name="discord" className="form-input" placeholder="felhasznalo#0000" /></label></div>
    <label className="block text-sm font-semibold">Szerver neve<input required name="serverName" className="form-input" placeholder="A Discord szervered neve" /></label>
    <label className="block text-sm font-semibold">Discord szerver meghívója<input required name="invite" className="form-input" placeholder="https://discord.gg/..." /></label>
    <label className="block text-sm font-semibold">Kuponkód <span className="font-normal text-[#8c8889]">(opcionális)</span><input name="coupon" className="form-input" placeholder="ELSO10" /></label>
    <label className="flex items-start gap-3 text-xs text-[#777274]"><input required type="checkbox" className="mt-0.5 accent-[#b33a3d]" />Elfogadom, hogy a megadott adatokat a rendelés teljesítéséhez kezelitek.</label>
    <button disabled={status === 'loading'} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#b33a3d] px-5 py-3.5 font-bold text-white transition hover:bg-[#942f33] disabled:opacity-60">{status === 'loading' ? <><Loader2 className="animate-spin" size={17} /> Küldés...</> : <><Send size={17} /> Rendelés elküldése</>}</button>
    {status === 'error' && <p className="text-center text-sm font-semibold text-[#b33a3d]">Hiba történt. Próbáld újra később.</p>}
  </form>
}
