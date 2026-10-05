'use client'

import Link from 'next/link'
import { ArrowRight, Menu, X } from 'lucide-react'
import { useState } from 'react'

const logoUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT_Image_2026._okt._3._17_43_42-removebg-preview-CUP7xnyxmg6Y25LY2fIKNYiEVJANAe.png'
const selectClass = 'rounded-lg border border-white/15 bg-[#171010] px-2.5 py-1.5 text-[11px] font-bold text-white outline-none focus:border-[#ef343b]'

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <div className="flex flex-wrap items-center justify-center gap-3 bg-[#d71920] px-5 py-2 text-center text-xs font-black uppercase tracking-[0.12em] text-white"><span>10% kedvezmény az ELSO10 kuponkódhoz</span><label className="flex items-center gap-1.5 normal-case tracking-normal"><span className="sr-only">Nyelv</span><select aria-label="Nyelv" className={selectClass} defaultValue="HU"><option>HU</option><option>EN</option></select></label><label className="flex items-center gap-1.5 normal-case tracking-normal"><span className="sr-only">Pénznem</span><select aria-label="Pénznem" className={selectClass} defaultValue="HUF"><option>HUF / Ft</option><option>EUR</option><option>USD</option></select></label></div>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#080808]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
            <img src={logoUrl} alt="dewyhosting" className="h-12 w-auto object-contain" />
          </Link>
          <div className="mr-3 hidden items-center gap-1 rounded-lg border border-white/10 p-1 text-[10px] font-black md:flex"><button className="rounded bg-[#d71920] px-2 py-1 text-white">HU</button><button className="px-2 py-1 text-white/45">EN</button></div><nav className="hidden items-center gap-7 text-sm font-semibold text-white/65 md:flex">
            <Link className="transition hover:text-white" href="/">Kezdőlap</Link>
            <a className="transition hover:text-white" href="/csomagok">Csomagok</a>
            <a className="transition hover:text-white" href="/#miert">Miért mi?</a>
            <a href="https://panel.dewyofficial.hu" target="_blank" rel="noreferrer" className="transition hover:text-white">Panel</a><a href="https://discord.gg/xsHsUJUGC6" target="_blank" rel="noreferrer" className="transition hover:text-white">Discord</a>
            <a href="/csomagok" className="inline-flex items-center gap-2 rounded-full bg-[#d71920] px-5 py-2.5 text-white shadow-sm transition hover:bg-[#b51218]">Rendelés <ArrowRight size={15} /></a>
          </nav>
          <button aria-label={open ? 'Menü bezárása' : 'Menü megnyitása'} onClick={() => setOpen(!open)} className="rounded-lg p-2 text-[#b33a3d] md:hidden">{open ? <X /> : <Menu />}</button>
        </div>
        {open && <nav className="border-t border-[#dedbd8] px-5 py-4 md:hidden"><div className="flex flex-col gap-4 text-sm font-semibold"><Link href="/" onClick={() => setOpen(false)}>Kezdőlap</Link><a href="/csomagok" onClick={() => setOpen(false)}>Csomagok</a><a href="/#miert" onClick={() => setOpen(false)}>Miért mi?</a><a href="https://discord.gg/xsHsUJUGC6" target="_blank" rel="noreferrer">Discord</a></div></nav>}
      </header>
      {children}
      <footer className="border-t border-white/10 bg-[#111111]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© 2026 dewyhosting · Minden jog fenntartva.</p><p className="font-semibold text-[#ef343b]">Hobbyprojekt, szívvel építve.</p>
        </div>
      </footer>
    </div>
  )
}

export { logoUrl }
