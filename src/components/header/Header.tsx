'use client';

import Image from "next/image";
import { useState } from "react";
import useWindowDimensions from './useWindowDimensions';
import { Roboto } from 'next/font/google';
import Link from 'next/link';

import * as Icons from "@phosphor-icons/react";
import Searchbar from "./SearchBar";
import DepartmentDropdown from './DepartmentMenu';
import ServiceDropdown from './ServicesMenu';
import LangSelect from './LanguageSelector';
import DeliveryType from './DeliveryType';
import Location from './Location';
import UserMenu from "./UserMenu";
import WishlistSidePanel from "./WishlistSidelist";
import CartSidePanel from "./CartSidePanel";

import EventsData from '@jds/menu/events.json';

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
});

export default function Header() {
    const { width } = useWindowDimensions();
    const [mobileOpen, setMobileOpen] = useState(false);

    // Store events from JSON
    const [events] = useState(EventsData.filter(e => e.active));

    return (
        <>
            {/* Desktop Navbar */}
            <div className={`sticky top-0 z-50 hidden lg:block relative w-full ${roboto.className}`}>
                <div className="grid grid-cols-10 items-center bg-slate-900 text-white px-6 py-3 gap-2">
                    {/* Left Section: Logo */}
                    <div className="flex items-center justify-center col-span-1 cursor-pointer">
                        <Image
                            src="/images/logo.png"
                            alt="Logo"
                            width={125}
                            height={40}
                            style={{ width: width < 1800 ? 125 : width / 15, height: 40 }}
                        />
                    </div>

                    {/* Nav Links */}
                    <div className="flex items-center justify-start col-span-2 gap-4">
                        <DepartmentDropdown />
                        <ServiceDropdown />
                    </div>

                    {/* Search Bar */}
                    <div className="col-span-4 px-10">
                        <Searchbar />
                    </div>

                    {/* Right Section */}
                    <div className="flex justify-end items-center col-span-3 gap-6 font-semibold pl-4">
                        <LangSelect />
                        <button className="flex items-center gap-2 hover:text-yellow-200 transition">
                            <WishlistSidePanel />
                        </button>
                        <button className="flex items-center gap-2 hover:text-yellow-200 transition">
                            <UserMenu />
                        </button>
                        <button className="flex items-center gap-2 hover:text-yellow-200 transition">
                            <CartSidePanel />
                        </button>
                    </div>
                </div>

                {/* Delivery / Location / Events Bar */}
                <div className='bg-slate-950 h-10 grid grid-cols-[auto,auto,2fr] px-3 gap-4'>
                    <div className='flex items-center justify-start'>
                        <DeliveryType />
                    </div>

                    <div className='flex items-center justify-start'>
                        <Location />
                    </div>

                    <div className='flex flex-row justify-end items-center space-x-2 text-white'>
                        {events.map((evnt, index) => (
                            <Link
                                key={index}
                                href={evnt.path}
                                className='text-white text-xs hover:text-yellow-400 hover:bg-slate-800 p-1 rounded cursor-pointer'
                            >
                                {evnt.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>



            {/* Mobile Navbar */}
            <div className={`sticky top-0 z-50 block lg:hidden relative ${roboto.className}`}>
                <div className="flex items-center justify-between bg-slate-900 text-white px-4 py-2">
                    {/* Left: Hamburger Menu */}
                    <div className="flex items-center">
                        <button
                            className="p-2 hover:text-yellow-200 transition"
                            onClick={() => setMobileOpen(true)}
                        >
                            <Icons.ListIcon weight="bold" size={24} />
                        </button>

                        {mobileOpen && (
                            <div className="fixed inset-0 z-50 flex">
                                <div className="bg-slate-900 w-3/4 max-w-xs p-4 flex flex-col gap-4">
                                    <button
                                        onClick={() => setMobileOpen(false)}
                                        className="self-end text-white hover:text-yellow-200"
                                    >
                                        <Icons.XCircleIcon weight="fill" size={24} />
                                    </button>

                                    <Searchbar />

                                    <DepartmentDropdown />
                                    <ServiceDropdown />
                                    <LangSelect />

                                    <button className="flex items-center gap-2 hover:text-yellow-200 transition">
                                        <Icons.HeartIcon size={20} />
                                        <span className="font-semibold">Wishlist</span>
                                    </button>
                                </div>

                                {/* Backdrop */}
                                <div
                                    className="flex-1 bg-black/80"
                                    onClick={() => setMobileOpen(false)}
                                ></div>
                            </div>
                        )}
                    </div>

                    {/* Center: Logo */}
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <Image
                            src="/images/logo.png"
                            alt="Logo"
                            width={125}
                            height={40}
                            style={{ width: width < 1800 ? 125 : width / 15, height: 40 }}
                        />
                    </div>

                    {/* Right: Icons */}
                    <div className="flex items-center gap-4">
                        <Searchbar />
                        <button className="hover:text-yellow-200 transition">
                            <Icons.UserIcon size={22} />
                        </button>
                        <button className="hover:text-yellow-200 transition">
                            <Icons.ShoppingCartIcon size={22} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
