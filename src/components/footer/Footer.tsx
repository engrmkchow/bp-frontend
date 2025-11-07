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
        <div className="relative m-4 p-4 rounded-lg bg-white/10 backdrop-blur-md border border-white/20">
          <h2 className="tracking-wide text-white font-bold">Be in the Know!</h2>
          <p className="text-xs mt-2 text-gray-300">
            Send me up-to-date information on weekly flyer features, Rollback &
            clearance items, exclusive products, and personalized recommendations and
            offers. You may unsubscribe at any time.
          </p>

          {/* Subscription Form */}
          <form onSubmit={handleSubmit} className="my-3">
            <label htmlFor="subEmail" className="text-sm">
              Email Address
            </label>
            <div className="flex flex-row space-x-2">
              <input
                id="subEmail"
                type="email"
                value={v_subEmail}
                onChange={handleChange}
                placeholder="123@example.com"
                className="mt-1 p-2 rounded bg-white text-black w-full"
              />
              <button
                type="submit"
                className="mt-1 p-2 text-xs rounded bg-cyan-600 hover:bg-cyan-700 text-white"
              >
                Submit
              </button>
            </div>
          </form>

          {v_subMsg && (
            <p className="mt-1 mb-3 text-xs text-gray-200">{v_subMsg}</p>
          )}

          <p className="text-xs text-gray-400">
            Personal information provided may be collected, used, and disclosed in
            accordance with the{' '}
            <span className="inline-flex items-center underline hover:text-gray-200 cursor-pointer">
              Privacy Notice <Info weight="bold" size={10} className="ml-1" />
            </span>
            .
          </p>
        </div>

        {/* Contact & Social Section */}
        <div className="px-2 py-4 flex flex-col items-end space-y-2 text-sm text-right w-full col-span-full sm:col-span-1">
          <Image
            src="/images/logo.png"
            alt="Buyerpanda X Ridbiz"
            width={120}
            height={120}
            loading="lazy"
          />

          <p>Email: {footerContact.email}</p>
          <p>Phone: {footerContact.phone}</p>
          <p>Address: {footerContact.address}</p>

          <h6 className="uppercase tracking-wider font-bold text-xl pt-3 text-gray-100">
            Connect with us
          </h6>
          <span className="flex flex-wrap justify-end space-x-1">
            <Link href={footerSocials[0]}>
              <Icon.XLogoIcon
                color="cyan"
                size={36}
                className="hover:bg-slate-800 rounded-lg cursor-pointer p-1"
              />
            </Link>
            <Link href={footerSocials[1]}>
              <Icon.FacebookLogoIcon
                color="cyan"
                size={36}
                className="hover:bg-slate-800 rounded-lg cursor-pointer p-1"
              />
            </Link>
            <Link href={footerSocials[2]}>
              <Icon.TwitchLogoIcon
                color="cyan"
                size={36}
                className="hover:bg-slate-800 rounded-lg cursor-pointer p-1"
              />
            </Link>
            <Link href={footerSocials[3]}>
              <Icon.SnapchatLogoIcon
                color="cyan"
                size={36}
                className="hover:bg-slate-800 rounded-lg cursor-pointer p-1"
              />
            </Link>
            <Link href={footerSocials[4]}>
              <Icon.YoutubeLogoIcon
                color="cyan"
                size={36}
                className="hover:bg-slate-800 rounded-lg cursor-pointer p-1"
              />
            </Link>
            <Link href={footerSocials[5]}>
              <Icon.PinterestLogoIcon
                color="cyan"
                size={36}
                className="hover:bg-slate-800 rounded-lg cursor-pointer p-1"
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
      </div>
    </>
  )
}
