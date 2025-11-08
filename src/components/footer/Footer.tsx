'use client'

import FooterData from '@jds/menu/ftr.json'
import FooterColumns from './FooterColumns'
import FooterNewsletter from './FooterNewsletter'
import FooterContactSocials from './FooterContactSocials'
import FooterBottom from './FooterBottom'

export default function Footer() {
  const { columns, socials, contact } = FooterData

  return (
    <>
      <div className="bg-slate-900 grid grid-cols-2 sm:grid-cols-[0.7fr,0.7fr,0.7fr,1.5fr,1fr] px-4 py-3 text-white">
        <FooterColumns columns={columns} />
        <FooterNewsletter />
        <FooterContactSocials contact={contact} socials={socials} />
      </div>

      <FooterBottom />
    </>
  )
}
