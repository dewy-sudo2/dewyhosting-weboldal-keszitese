'use client'

import { useState } from 'react'
import { Check, Cpu, HardDrive, MemoryStick, ShieldCheck, X } from 'lucide-react'
import { SiteShell } from '@/components/site-shell'
import { OrderForm } from '@/components/order-form'

const pythonLogo = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/python-Lg0qqcHwOmfFMfJDgxdfxuxw7Ay0Tz.png'
const minecraftLogo = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/minecraft-71ibi7ZQ0gZlUqPinck46W5E6TZlBb.png'

function PackageCard({ type, title, description, logo, soon = false, onOrder }: { type: string; title: string; description: string; logo: string; soon?: boolean; onOrder?: () => void }) {
  return <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#111111] p-6 shadow-[0_24px_70px_-45px_rgba(215,25,32,.8)] transition hover:-translate-y-1 hover:border-[#d71920]/70">
    <img src={logo} alt="" aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 size-44 opacity-[0.06] blur-[1px]" /><div className="relative flex items-start justify-between gap-4"><div><div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-black p-2 ring-1 ring-white/10"><img src={logo} alt={`${title} logó`} className="size-full object-contain" /></div><p className="eyebrow">{type}</p><h2 className="mt-2 text-2xl font-black text-white">{title}</h2></div>{soon ? <span className="rounded-full border border-[#d71920]/40 bg-[#d71920]/10 px-3 py-1 text-xs font-bold text-[#ef343b]">Hamarosan</span> : <span className="rounded-full bg-[#d71920] px-3 py-1 text-xs font-bold text-white">Elérhető</span>}</div>
    <p className="mt-5 text-sm leading-6 text-white/55">{description}</p>
    <ul className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm font-semibold text-white/70"><li><Check className="mr-2 inline text-[#ef343b]" size={16} />DDoS védelem</li><li><Check className="mr-2 inline text-[#ef343b]" size={16} />0–24 órás futtatás</li><li><Check className="mr-2 inline text-[#ef343b]" size={16} />Frankfurti lokáció</li></ul>
    <button disabled={soon} onClick={onOrder} className="mt-7 w-full rounded-xl bg-[#d71920] px-5 py-3.5 font-bold text-white transition hover:bg-[#b51218] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/40">{soon ? 'Hamarosan!' : 'Megrendelés'}</button>
  </article>
}

export default function PackagesPage() {
  const [orderOpen, setOrderOpen] = useState(false)
  return <SiteShell><main className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-20"><div className="max-w-2xl"><p className="eyebrow">Csomagok</p><h1 className="section-title text-5xl sm:text-6xl">Válaszd ki a<br /><span className="text-[#ef343b]">neked való csomagot.</span></h1><p className="mt-5 text-lg leading-8 text-white/60">Egyszerű, átlátható hosting csomagok botokhoz és szerverekhez.</p></div><div className="mt-12 grid gap-6 md:grid-cols-3"><PackageCard type="Python hosting" title="Python csomag" logo={pythonLogo} description="Python szerverekhez optimalizált alapcsomag, stabil futtatással és rugalmas bővítési lehetőségekkel." onOrder={() => setOrderOpen(true)} /><PackageCard type="Minecraft hosting" title="Minecraft csomag" logo={minecraftLogo} description="Minecraft szerverekhez készülő csomag. A részleteken már dolgozunk, hamarosan elérhető lesz." soon /><div className="flex min-h-[380px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/15 bg-[#0d0d0d] p-6 text-center"><div className="mb-4 text-4xl font-black text-[#d71920]">+</div><h2 className="text-xl font-black text-white">További csomagok</h2><p className="mt-3 max-w-xs text-sm leading-6 text-white/45">Új csomagok hamarosan érkeznek. Kövesd a frissítéseket Discordon.</p></div></div></main>{orderOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"><div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[#d71920]/50 bg-[#111111] p-6 shadow-2xl sm:p-8"><button onClick={() => setOrderOpen(false)} aria-label="Bezárás" className="absolute right-5 top-5 rounded-full p-2 text-white/50 transition hover:bg-white/10 hover:text-white"><X size={20} /></button><p className="eyebrow">Python csomag</p><h2 className="mt-2 text-3xl font-black text-white">Megrendelés</h2><p className="mt-2 text-sm text-white/55">Add meg az adatokat, majd válaszd ki a szükséges bővítéseket.</p><OrderForm onSuccess={() => setOrderOpen(false)} /></div></div>}</SiteShell>
}
