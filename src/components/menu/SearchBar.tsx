'use client'
import { useState } from "react";
import * as Icons from '@phosphor-icons/react';
import { Roboto } from 'next/font/google'
 
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export default function Searchbar({ displayFor }: { displayFor?: 'searchPage' | '' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={`${roboto.className}`}>
      {/* Desktop / Large screens */}
      <div className="hidden lg:block relative w-full">
        <input
          type="text"
          placeholder="Use keywords"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full rounded-full bg-[#13233b] text-white px-4 py-2 outline-none placeholder-gray-400 ${roboto.className}`}
        />
        <Icons.MagnifyingGlassIcon
          weight="bold"
          size={22}
          color="skyblue"
          className="absolute right-3 top-2.5 cursor-pointer"
        />
      </div>

      {/* Mobile / Small screens */}
      <div className="block lg:hidden relative">
        {displayFor !== 'searchPage' ? (
          <>
            <Icons.MagnifyingGlassIcon
              size={22}
              color="white"
              className="cursor-pointer"
              onClick={() => setMobileOpen(true)}
            />

            {mobileOpen && (
              <div className="fixed top-0 left-0 w-full h-full bg-black/80 z-40 flex items-center justify-center p-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Use keywords"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full rounded-full bg-[#13233b] text-white px-4 py-2 outline-none placeholder-gray-400 ${roboto.className}`}
                  />
                  <div className="absolute top-2.5 right-3 flex items-center gap-1 bg-slate-900 hover:bg-slate-950 rounded-full px-3 py-1 mt-[-6] mr-[-8] cursor-pointer">
                    <p>Go</p>
                    <Icons.ArrowRightIcon size={20} />
                  </div>
                </div>
                <Icons.XIcon
                  size={32}
                  color="white"
                  className="fixed top-4 right-4 p-1 hover:bg-white/20 rounded-md cursor-pointer"
                  onClick={() => setMobileOpen(false)}
                />
              </div>
            )}
          </>
        ) : (
          <div className="relative mt-2 w-full">
            <input
              type="text"
              placeholder="Use keywords"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full bg-[#13233b] text-white px-4 py-2 outline-none placeholder-gray-400"
            />
            <Icons.MagnifyingGlassIcon
              size={20}
              color="white"
              className="absolute right-3 top-2.5 cursor-pointer mt-[-2]"
            />
          </div>
        )}
      </div>
    </div>
  );
}
