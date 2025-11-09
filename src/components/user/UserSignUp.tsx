'use client';

import Link from "next/link";
import Image from "next/image";
import { SignOutIcon } from "@phosphor-icons/react";

export default function SignupForm() {
  return (
    <>
      <div className="flex items-center justify-center min-h-[85vh] text-white px-4 py-8">
        <div className="w-full max-w-md bg-gray-950 bg-opacity-70 shadow-2xl rounded-xl overflow-hidden p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-orange-400">Sign Up</h2>
            <Link href="/">
              <span className="text-orange-400 hover:text-orange-500 transition-colors">
                <SignOutIcon size={28} />
              </span>
            </Link>
          </div>

          {/* Form */}
          <form className="space-y-5">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-300">First Name</label>
              <input
                type="text"
                placeholder="Enter your first name"
                className="w-full p-3 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-300">Last Name</label>
              <input
                type="text"
                placeholder="Enter your last name"
                className="w-full p-3 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-300">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-3 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-300">Mobile</label>
              <input
                type="text"
                placeholder="Enter your mobile number"
                className="w-full p-3 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-300">Domain</label>
              <input
                type="text"
                placeholder="Enter your domain"
                defaultValue="buyerpanda.com"
                className="w-full p-3 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                className="w-full py-3 bg-orange-400 border-2 border-orange-600 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-200 focus:outline-none"
              >
                Sign Up
              </button>
            </div>

            {/* Login Link */}
            <p className="text-sm text-center text-gray-400 mt-4">
              Already have an account?{" "}
              <Link href="/user/login" className="text-orange-400 hover:underline">
                Log in
              </Link>{" "}
              instead
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
