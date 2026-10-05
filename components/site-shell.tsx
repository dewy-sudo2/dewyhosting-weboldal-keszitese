'use client'

import Link from 'next/link'
import { ArrowRight, Menu, X } from 'lucide-react'
import { useState } from 'react'

const logoUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT_Image_2026._okt._3._17_43_42-removebg-preview-CUP7xnyxmg6Y25LY2fIKNYiEVJANAe.png'

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="min-h-screen bg-[#f4f3f1] text-[#272628]">
      <header className="sticky top-0 z-40 border-b border-[#dedbd8] bg-[#f4f3f1]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
            <img src={logoUrl} alt="dewyhosting" className="h-12 w-auto object-contain" />
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-[#686567] md:flex">
            <Link className="transition hover:text-[#b33a3d]" href="/">Kezdőlap</Link>
            <Link className="transition hover:text-[#b33a3d]" href="/csomagok">Csomagok</Link>
            <a className="transition hover:text-[#b33a3d]" href="/#miert">Miért mi?</a>
            <Link href="/csomagok" className="inline-flex items-center gap-2 rounded-full bg-[#b33a3d] px-5 py-2.5 text-white shadow-sm transition hover:bg-[#942f33]">Rendelés <ArrowRight size={15} /></Link>
          </nav>
          <button aria-label={open ? 'Menü bezárása' : 'Menü megnyitása'} onClick={() => setOpen(!open)} className="rounded-lg p-2 text-[#b33a3d] md:hidden">{open ? <X /> : <Menu />}</button>
        </div>
        {open && <nav className="border-t border-[#dedbd8] px-5 py-4 md:hidden"><div className="flex flex-col gap-4 text-sm font-semibold"><Link href="/" onClick={() => setOpen(false)}>Kezdőlap</Link><Link href="/csomagok" onClick={() => setOpen(false)}>Csomagok</Link><a href="/#miert" onClick={() => setOpen(false)}>Miért mi?</a></div></nav>}
      </header>
      {children}
      <footer className="border-t border-[#dedbd8] bg-[#ebe9e7]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-[#777274] sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© 2026 dewyhosting · Minden jog fenntartva.</p><p className="font-semibold text-[#b33a3d]">Hobbyprojekt, szívvel építve.</p>
        </div>
      </footer>
    </div>
  )
}

export { logoUrl }
