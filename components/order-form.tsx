'use client'

import { FormEvent, useMemo, useState } from 'react'
import { Check, Loader2, Send } from 'lucide-react'

export function OrderForm({ onSuccess }: { onSuccess?: () => void }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [ram, setRam] = useState(false)
  const [cpu, setCpu] = useState(false)
  const total = useMemo(() => Math.round(351 * (ram || cpu ? 0.9 : 1)) + (ram ? 50 : 0) + (cpu ? 100 : 0), [ram, cpu])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')
    const form = new FormData(event.currentTarget)
    form.set('ramAddon', ram ? '+100 MB tárhely' : 'Nincs')
    form.set('cpuAddon', cpu ? '+10% CPU' : 'Nincs')
    form.set('total', `${total} Ft`)
    try {
      const response = await fetch('/api/order', { method: 'POST', body: JSON.stringify(Object.fromEntries(form)), headers: { 'Content-Type': 'application/json' } })
      if (!response.ok) throw new Error('failed')
      setStatus('success'); onSuccess?.()
    } catch { setStatus('error') }
  }

  if (status === 'success') return <div className="rounded-2xl border border-[#d71920]/40 bg-[#180d0e] p-8 text-center"><div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-[#d71920] text-white"><Check /></div><h3 className="text-xl font-bold text-white">Rendelés elküldve!</h3><p className="mt-2 text-sm text-white/55">Hamarosan felvesszük veled a kapcsolatot Discordon.</p></div>

  return <form onSubmit={submit} className="mt-6 space-y-5">
    <div className="rounded-2xl border border-white/10 bg-black/30 p-5"><p className="text-xs font-black uppercase tracking-[.18em] text-[#ef343b]">Amit veszel</p><h3 className="mt-2 text-xl font-black text-white">Python csomag</h3><ul className="mt-4 space-y-2 text-sm text-white/65"><li>5% CPU</li><li>350 MB RAM</li><li>500 MB tárhely</li><li>DDoS védelem, 0–24 futtatás</li><li>Frankfurt, Németország</li></ul></div>
    <label className="block text-sm font-semibold text-white/80">A szerver neve:<input required name="serverName" className="form-input" placeholder="Mi legyen a szerver neve?" /></label>
    <label className="block text-sm font-semibold text-white/80">Kuponkód <span className="font-normal text-white/40">(opcionális)</span><input name="coupon" className="form-input" placeholder="" /></label>
    <div className="grid gap-3 sm:grid-cols-2"><button type="button" onClick={() => setRam(!ram)} className={`rounded-xl border p-4 text-left transition ${ram ? 'border-[#d71920] bg-[#d71920]/10' : 'border-white/10 bg-black/20'}`}><span className="block font-bold text-white">+100 MB tárhely</span><span className="text-sm text-[#ef343b]">+50 Ft</span></button><button type="button" onClick={() => setCpu(!cpu)} className={`rounded-xl border p-4 text-left transition ${cpu ? 'border-[#d71920] bg-[#d71920]/10' : 'border-white/10 bg-black/20'}`}><span className="block font-bold text-white">+10% CPU</span><span className="text-sm text-[#ef343b]">+100 Ft</span></button></div>
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-4 py-4"><span className="font-bold text-white">Végösszeg</span><strong className="text-2xl text-[#ef343b]">{total} Ft<span className="ml-1 text-xs text-white/45">/ hó</span></strong></div>
    <button disabled={status === 'loading'} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#d71920] px-5 py-3.5 font-bold text-white transition hover:bg-[#b51218] disabled:opacity-50">{status === 'loading' ? <Loader2 className="animate-spin" size={17} /> : <Send size={17} />} Rendelés elküldése</button>
    {status === 'error' && <p className="text-sm text-red-300">Hiba történt. Próbáld újra.</p>}
  </form>
}
