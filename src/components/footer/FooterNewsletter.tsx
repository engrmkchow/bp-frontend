'use client'
import { useState } from 'react'
import { Info } from '@phosphor-icons/react'

export default function FooterNewsletter() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setMsg('Please enter a valid email address.')
      return
    }
    setMsg('Subscribing...')
    setTimeout(() => {
      setMsg('You have successfully subscribed to the newsletter.')
      setEmail('')
    }, 1000)
  }

  return (
    <div className="relative m-2 p-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white">
      <h2 className="text-sm font-semibold tracking-wide">Be in the Know!</h2>
      <p className="text-[11px] mt-1 text-gray-200 leading-snug">
        Get updates on flyer features, Rollbacks, exclusive products, and offers. Unsubscribe anytime.
      </p>

      <form onSubmit={handleSubmit} className="mt-2">
        <div className="flex items-center gap-1">
          <input
            type="email"
            value={email}
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

      {msg && <p className="mt-1 text-[10px] text-gray-300 italic">{msg}</p>}

      <p className="text-[10px] text-gray-400 mt-2 leading-tight">
        Personal information provided may be collected, used, and disclosed in accordance with the{' '}
        <span className="inline-flex items-center underline hover:text-gray-200 cursor-pointer">
          Privacy Notice <Info weight="bold" size={8} className="ml-1" />
        </span>.
      </p>
    </div>
  )
}
