'use client';
import React from "react";
import Image from "next/image";

export interface ItemMastProps {
    item_mid: number;
    item_cat: string;
    item_dept: string;
    item_srvc: string;
    pcode: string;
    item_mast: string;
    item_var1: string | null;
    item_var2: string | null;
    idesc: string | null;
    pub: 'N' | 'Y' | string;
    gp: 'N' | 'Y' | string;
    tk_ord: 'N' | 'Y' | string;
    atr_val: string | null;
    sp: number | null;
    sp1: number | null;
    dsl: number | null;
    hfee: number | null;
    cpn_code: string | null;
    mkrid: string;
    mkr_date: string;
    last_update: string;
    cmp_code: string;
}

interface WishlistItemCardProps {
  item: ItemMastProps;
  displayFor: "wishlistPage" | "sideList";
}

function makeTestNormal(text: string) {
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

const WishlistItemCard: React.FC<WishlistItemCardProps> = ({ item, displayFor }) => {
  if (displayFor === "sideList") {
    return (
      <div className="flex items-center justify-between border-b border-white/10 py-3 pl-2">
        <div className="grid grid-cols-6 gap-4 items-center w-full pr-6">
          <div className="col-span-5 flex space-x-2 items-center">
            <div className="w-10 h-10 rounded overflow-hidden bg-white/10 shrink-0">
              <Image
                src={`/product/${item.item_mid}/1.jpg`}
                alt={makeTestNormal(item.item_mast) || 'image'}
                width={48}
                height={48}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <span className="font-medium text-[13px] text-white">{makeTestNormal(item.item_mast)}</span>
          </div>

          <div className="text-xs text-white font-semibold text-right whitespace-nowrap pl-2">
            ${item.sp}
          </div>
        </div>
      </div>
    );
  }

  // wishlistPage layout
  return (
    <div className="w-full grid grid-cols-5 items-center border-b border-white/10 py-3 px-2 hover:bg-white/5 rounded transition">
      <div className="flex items-center gap-4 col-span-2">
        <div className="w-14 h-12 rounded overflow-hidden bg-white/10">
          <Image
            src={`/product/${item.item_mid}/1.jpg`}
            alt={makeTestNormal(item.item_mast) || 'image'}
            width={64}
            height={48}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <span className="text-sm font-semibold text-gray-100">{makeTestNormal(item.item_mast)}</span>
      </div>

      {/* Price */}
      <div className="text-sm text-gray-100">
        <span className="text-green-400 font-semibold ml-2">${item.sp}</span>
      </div>

      {/* Add to Cart button */}
      <div className="text-right col-span-2 flex items-start">
        <button className="text-sm text-white bg-gray-700 px-3 py-1 rounded hover:bg-gray-600 transition">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default WishlistItemCard;
