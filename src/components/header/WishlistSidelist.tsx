'use client';

import WishlistItemCard from "./WishlistItemCard";
import { useState, useRef, useEffect } from "react";
import * as Icons from "@phosphor-icons/react";

export default function WishlistSidePanel() {
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const wishlistRef = useRef<HTMLDivElement>(null);

  // Close panel on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wishlistRef.current && !wishlistRef.current.contains(event.target as Node)) {
        setWishlistOpen(false);
      }
    };

    if (wishlistOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wishlistOpen]);

  // Empty wishlist for now
  const wishlistItems: any[] = [];

  return (
    <div className="relative">
      {/* Toggle */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setWishlistOpen(true)}
      >
        <Icons.HeartStraightIcon size={24} color="#fcfcfc" weight="duotone" />
        <span className="text-white">Wishlist ({wishlistItems.length})</span>
      </div>

      {/* Side Panel */}
      <div
        ref={wishlistRef}
        className={`fixed top-0 right-0 z-50 w-80 bg-slate-800 text-white shadow-xl flex flex-col h-full transform transition-transform duration-300 ease-in-out
        ${wishlistOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-white/20">
          <h2 className="font-bold text-lg">Wishlist</h2>
          <Icons.CaretRightIcon
            size={28}
            className="cursor-pointer hover:bg-slate-700 rounded p-1 transition"
            onClick={() => setWishlistOpen(false)}
          />
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          <div className="text-center text-gray-400">Your wishlist is empty.</div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/20 flex justify-center">
          <div
            className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded cursor-pointer hover:bg-yellow-400 transition"
            onClick={() => window.location.href = "/user/wishlist"}
          >
            Go to Wishlist
          </div>
        </div>
      </div>
    </div>
  );
}
