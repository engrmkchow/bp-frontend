'use client';

import { useRef, useEffect, useState } from "react";
import * as Icons from "@phosphor-icons/react";

export default function CartSidePanel() {
  const [cartOpen, setCartOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  // Dummy cart items (empty for now)
  const cartItems: { id: number; name: string; price: number; qty: number }[] = [];

  // Close panel on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setCartOpen(false);
      }
    };

    if (cartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartOpen]);

  return (
    <div className="relative">
      {/* Toggle */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setCartOpen(true)}
      >
        <Icons.ShoppingCart size={24} color="#fcfcfc" weight="duotone" />
        <span className="text-white">Cart ({cartItems.length})</span>
      </div>

      {/* Side Panel */}
      <div
        ref={cartRef}
        className={`cart-styles fixed top-0 right-0 z-50 h-full w-80 bg-slate-800 text-white shadow-xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out
          ${cartOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-white/20">
          <h2 className="font-bold text-lg">Cart</h2>
          <Icons.CaretRight
            size={28}
            className="cursor-pointer hover:bg-slate-700 rounded p-1 transition"
            onClick={() => setCartOpen(false)}
          />
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-400">Your cart is empty.</div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center border-b border-white/10 p-2">
                <span>{item.name}</span>
                <span>{item.qty} × ${item.price}</span>
              </div>
            ))
          )}
        </div>

        {/* Footer buttons */}
        <div className="flex items-center justify-center space-x-2 p-4 border-t border-white/20">
          <div className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded cursor-pointer hover:bg-yellow-400 transition">
            Go to Cart
          </div>
          <div className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded cursor-pointer hover:bg-yellow-400 transition">
            Go to Checkout
          </div>
        </div>
      </div>
    </div>
  );
}
