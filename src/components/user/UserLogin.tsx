'use client';

import Link from "next/link";
import { SignOutIcon } from "@phosphor-icons/react";
import Image from "next/image";

export default function LoginForm() {
    return (
        <>
            <div className="flex items-center justify-center min-h-screen text-white px-4 py-10">
                <div className="w-full max-w-md bg-gray-950 bg-opacity-70 shadow-2xl rounded-xl overflow-hidden p-6">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-orange-400">Login</h2>
                        <Link href="/">
                            <span className="text-orange-400 hover:text-orange-500 transition-colors">
                                <SignOutIcon size={28} />
                            </span>
                        </Link>
                    </div>

                    {/* Form */}
                    <form className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-300">Email</label>
                            <input
                                type="text"
                                placeholder="Enter your email"
                                className="w-full p-3 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex flex-row gap-2">
                                <label className="block mb-1 text-sm font-medium text-gray-300">Password</label>
                                <Link href="/user/reset-password" className="text-xs text-orange-400 opacity-80 hover:underline mt-0.5">
                                    Forgot Password?
                                </Link>{" "}
                            </div>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full p-3 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <button
                                type="button"
                                className="w-full py-3 bg-orange-400 border-2 border-orange-600 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-200 focus:outline-none"
                            >
                                Use Token Code
                            </button>
                            <button
                                type="button"
                                className="w-full py-3 bg-orange-400 border-2 border-orange-600 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-200 focus:outline-none"
                            >
                                Log In
                            </button>
                        </div>

                        {/* Signup Link */}
                        <p className="text-sm text-center text-gray-400 mt-4">
                            Don&apos;t have an account?{" "}
                            <Link href="/user/signup" className="text-orange-400 hover:underline">
                                Sign up
                            </Link>{" "}
                            instead
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}
