'use client'
import Image from 'next/image'
import Link from 'next/link'
import * as Icon from '@phosphor-icons/react'

export default function FooterContactSocials({
  contact,
  socials,
}: {
  contact: { email: string; phone: string; address: string }
  socials: string[]
}) {
  return (
    <div className="px-2 py-2 flex flex-col items-end space-y-1 text-xs text-right w-full col-span-full sm:col-span-1">
      <Image src="/images/logo.png" alt="Buyerpanda X Ridbiz" width={80} height={80} loading="lazy" />

      <p>Email: {contact.email}</p>
      <p>Phone: {contact.phone}</p>
      <p>Address: {contact.address}</p>

      <span className="flex flex-wrap justify-end space-x-0.5 pt-4">
        <Link href={socials[0]}><Icon.XLogoIcon color="cyan" size={26} className="hover:bg-slate-800 rounded-md cursor-pointer p-0.5" /></Link>
        <Link href={socials[1]}><Icon.FacebookLogoIcon color="cyan" size={26} className="hover:bg-slate-800 rounded-md cursor-pointer p-0.5" /></Link>
        <Link href={socials[2]}><Icon.TwitchLogoIcon color="cyan" size={26} className="hover:bg-slate-800 rounded-md cursor-pointer p-0.5" /></Link>
        <Link href={socials[3]}><Icon.SnapchatLogoIcon color="cyan" size={26} className="hover:bg-slate-800 rounded-md cursor-pointer p-0.5" /></Link>
        <Link href={socials[4]}><Icon.YoutubeLogoIcon color="cyan" size={26} className="hover:bg-slate-800 rounded-md cursor-pointer p-0.5" /></Link>
        <Link href={socials[5]}><Icon.PinterestLogoIcon color="cyan" size={26} className="hover:bg-slate-800 rounded-md cursor-pointer p-0.5" /></Link>
      </span>
    </div>
  )
}
