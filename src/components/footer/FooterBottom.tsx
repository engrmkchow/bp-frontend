'use client'
import Link from 'next/link'

export default function FooterBottom() {
  return (
    <div className="bg-slate-950 p-3 text-xs font-light flex flex-wrap gap-4 text-gray-400">
      <p>© 2025 BuyerPanda. All Rights Reserved.</p>
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
  )
}
