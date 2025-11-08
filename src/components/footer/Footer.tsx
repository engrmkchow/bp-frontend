'use client'

import Image from 'next/image'
import Link from 'next/link'
import * as Icon from '@phosphor-icons/react'
import FooterData from '@jds/menu/ftr.json'
import { Info } from '@phosphor-icons/react'
import { useState } from 'react'

export default function Footer() {
  const footerCols = FooterData.columns as Record<
    string,
    { label: string; path: string }[]
  >
  const footerSocials = FooterData.socials
  const footerContact = FooterData.contact

  const [v_subMsg, setSubMsg] = useState<string | null>(null)
  const [v_subEmail, setSubEmail] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubEmail(e.target.value)
  }

  // Pure UI – no API call
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!v_subEmail || !v_subEmail.includes('@')) {
      setSubMsg('Please enter a valid email address.')
      return
    }

    setSubMsg('Subscribing...')
    setTimeout(() => {
      setSubMsg('You have successfully subscribed to the newsletter.')
      setSubEmail('')
    }, 1000)
  }

  return (
    <>
      {/* Main Footer Body */}
      <div className="bg-slate-900 grid grid-cols-2 sm:grid-cols-[0.7fr,0.7fr,0.7fr,1.5fr,1fr] px-4 py-3 text-white">
        {/* Footer Columns */}
        {Object.entries(footerCols).map(([columnName, items], index) => (
          <div className="px-2 pt-8 text-md" key={index}>
            <h6 className="uppercase tracking-tight mb-2 font-bold text-gray-100">
              {columnName}
            </h6>
            <ul className="space-y-2 text-sm text-gray-300">
              {items.map((item, i) => (
                <li key={i}>
                  <Link href={item.path} className="hover:underline hover:text-gray-100">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter Section */}
        <div className="relative m-2 p-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white">
          <h2 className="text-sm font-semibold tracking-wide">Be in the Know!</h2>

          <p className="text-[11px] mt-1 text-gray-200 leading-snug">
            Get updates on flyer features, Rollbacks, exclusive products, and offers. Unsubscribe anytime.
          </p>

          {/* Subscription Form */}
          <form onSubmit={handleSubmit} className="mt-2">
            <div className="flex items-center gap-1">
              <input
                id="subEmail"
                type="email"
                value={v_subEmail}
                onChange={handleChange}
                placeholder="Enter your email"
                className="p-1.5 rounded-md bg-white/90 text-black text-xs w-full placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
              <button
                type="submit"
                className="p-1.5 text-[11px] rounded-md bg-cyan-600 hover:bg-cyan-700 text-white transition-colors"
              >
                Submit
              </button>
            </div>
          </form>

          {v_subMsg && (
            <p className="mt-1 text-[10px] text-gray-300 italic">{v_subMsg}</p>
          )}

          <p className="text-[10px] text-gray-400 mt-2 leading-tight">
            Personal information provided may be collected, used, and disclosed in accordance with the{" "}
            <span className="inline-flex items-center underline hover:text-gray-200 cursor-pointer">
              Privacy Notice <Info weight="bold" size={8} className="ml-1" />
            </span>.
          </p>
        </div>


        {/* Contact & Social Section */}
        <div className="px-2 py-2 flex flex-col items-end space-y-1 text-xs text-right w-full col-span-full sm:col-span-1">
          <Image
            src="/images/logo.png"
            alt="Buyerpanda X Ridbiz"
            width={80}
            height={80}
            loading="lazy"
          />

          <p>Email: {footerContact.email}</p>
          <p>Phone: {footerContact.phone}</p>
          <p>Address: {footerContact.address}</p>

          <span className="flex flex-wrap justify-end space-x-0.5 pt-4">
            <Link href={footerSocials[0]}>
              <Icon.XLogoIcon
                color="cyan"
                size={26}
                className="hover:bg-slate-800 rounded-md cursor-pointer p-0.5"
              />
            </Link>
            <Link href={footerSocials[1]}>
              <Icon.FacebookLogoIcon
                color="cyan"
                size={26}
                className="hover:bg-slate-800 rounded-md cursor-pointer p-0.5"
              />
            </Link>
            <Link href={footerSocials[2]}>
              <Icon.TwitchLogoIcon
                color="cyan"
                size={26}
                className="hover:bg-slate-800 rounded-md cursor-pointer p-0.5"
              />
            </Link>
            <Link href={footerSocials[3]}>
              <Icon.SnapchatLogoIcon
                color="cyan"
                size={26}
                className="hover:bg-slate-800 rounded-md cursor-pointer p-0.5"
              />
            </Link>
            <Link href={footerSocials[4]}>
              <Icon.YoutubeLogoIcon
                color="cyan"
                size={26}
                className="hover:bg-slate-800 rounded-md cursor-pointer p-0.5"
              />
            </Link>
            <Link href={footerSocials[5]}>
              <Icon.PinterestLogoIcon
                color="cyan"
                size={26}
                className="hover:bg-slate-800 rounded-md cursor-pointer p-0.5"
              />
            </Link>
          </span>
        </div>

      </div>

      {/* Copyright */}
      <div className="bg-slate-950 p-3 text-xs font-light flex flex-wrap gap-4 text-gray-400">
        <p>© 2024 BuyerPanda. All Rights Reserved.</p>
        <p>
          <Link href="/privacy" className="hover:underline hover:text-gray-200">
            Privacy Notice
          </Link>
        </p>
        <p>
          <Link href="/about-us/terms-of-use" className="hover:underline hover:text-gray-200">
            Terms of Use
          </Link>
        </p>
      </div>
    </>
  )
}
