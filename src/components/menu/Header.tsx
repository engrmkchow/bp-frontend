'use client';

import Image from "next/image";
import { useState } from "react";
import useWindowDimensions from '../hooks/useWindowDimensions';
import { Roboto } from 'next/font/google';

import * as Icons from "@phosphor-icons/react";
import Searchbar from "./SearchBar";

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
});

export default function Navbar() {
    const { width } = useWindowDimensions();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            {/* Desktop Navbar */}
            <div className={`sticky top-0 z-50 hidden lg:block relative w-full ${roboto.className}`}>
                <div className="grid grid-cols-10 bg-slate-900 text-white">
                    {/* Left Section: Logo */}
                    <div className="flex items-center justify-center text-center col-span-1 cursor-pointer">
                        <Image
                            src="/images/logo.png"
                            alt="Logo"
                            width={125}
                            height={40}
                            style={{ width: width < 1800 ? 125 : width / 15, height: 40 }}
                        />
                    </div>

                    {/* Nav Links */}
                    <button className="flex items-center gap-2 hover:text-yellow-200 transition">
                        <Icons.GridFourIcon size={20} />
                        <span className="font-semibold">Departments</span>
                    </button>

                    <button className="flex items-center gap-2 hover:text-yellow-200 transition">
                        <Icons.GearSixIcon size={20} />
                        <span className="font-semibold">Services</span>
                    </button>

                    {/* Search Bar */}
                    <div className="py-4 px-1 text-center col-span-3">
                        <Searchbar />
                    </div>

                    {/* Right Section */}
                    <div className="flex justify-between col-span-4 px-20 font-semibold">
                        <button className="flex items-center gap-2 hover:text-yellow-200 transition">
                            <Icons.GlobeIcon size={20} />
                            <span className="font-semibold">English</span>
                        </button>

                        <button className="flex items-center gap-2 hover:text-yellow-200 transition">
                            <Icons.HeartIcon size={20} />
                            <span>Wishlist</span>
                        </button>

                        <button className="flex items-center gap-2 hover:text-yellow-200 transition">
                            <Icons.UserIcon size={22} />
                            <span>Account</span>
                        </button>

                        <button className="flex items-center gap-2 hover:text-yellow-200 transition">
                            <Icons.ShoppingCartIcon size={22} />
                            <span>Cart</span>
                        </button>
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

                        {/* Mobile Sidebar */}
                        {mobileOpen && (
                            <div className="fixed inset-0 z-50 flex">
                                {/* Sidebar Panel */}
                                <div className="bg-slate-900 w-3/4 max-w-xs p-4 flex flex-col gap-4">
                                    <button
                                        onClick={() => setMobileOpen(false)}
                                        className="self-end text-white hover:text-yellow-200"
                                    >
                                        <Icons.XCircleIcon weight="fill" size={24} />
                                    </button>

                                    <div className="mt-4">
                                        <Searchbar />
                                    </div>

                                    <button className="flex items-center gap-2 hover:text-yellow-200 transition">
                                        <Icons.GridFourIcon size={20} />
                                        <span className="font-semibold">Departments</span>
                                    </button>

                                    <button className="flex items-center gap-2 hover:text-yellow-200 transition">
                                        <Icons.GearSixIcon size={20} />
                                        <span className="font-semibold">Services</span>
                                    </button>

                                    <button className="flex items-center gap-2 hover:text-yellow-200 transition">
                                        <Icons.GlobeIcon size={20} />
                                        <span className="font-semibold">English</span>
                                    </button>

                                    <button className="flex items-center gap-2 hover:text-yellow-200 transition">
                                        <Icons.HeartIcon size={20} />
                                        <span className="font-semibold">Wishlist</span>
                                    </button>
                                </div>

                                {/* Backdrop to close */}
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
