/* eslint-disable @next/next/no-img-element */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UserMenuData from '@jds/menu/userMenu.json';
import Image from 'next/image';
import { UserIcon } from '@phosphor-icons/react';

interface UserMenuProps { path: string, label: string, className?: string }

const UserMenu: React.FC = () => {
  const menuItemsData = UserMenuData as UserMenuProps[];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter(); // For client-side navigation
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    imgloc: '',
  });

  useEffect(() => {
    const getCookie = (name: string) => {
      const cookieString = document.cookie || '';
      const cookies = cookieString.split('; ').reduce((acc, current) => {
        const [key, value] = current.split('=');
        acc[key] = decodeURIComponent(value || '');
        return acc;
      }, {} as Record<string, string>);
      return cookies[name] || '';
    };

    setFormData({
      imgloc: getCookie('imgloc'),
    });

    if (formData.imgloc !== '') setIsLoggedIn(true);

  }, [formData.imgloc]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleNavigation = (path: string) => {
    setIsMenuOpen(false); // Close menu
    router.push(path); // Navigate to the specified path
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
<div className="relative">
  {/* User Icon */}
  <button
    onClick={toggleMenu}
    className="pt-1 border-none flex flex-row gap-2"
    aria-expanded={isMenuOpen}
    aria-controls="user-menu"
  >
    {formData.imgloc ? (
      <Image
        src={formData.imgloc}
        alt="Profile Picture"
        className="w-10 h-10 object-cover rounded-full rounded-full bg-white hover:bg-gray-200 focus:outline-none"
        width={40}
        height={40}
      />
    ) : (
      <UserIcon size={22} />
    )}
    <span>Account</span>
  </button>

  {/* Pop-up Menu */}
  {isMenuOpen && (
    <div
      id="user-menu"
      ref={menuRef}
      className="absolute mt-2 w-48 bg-white rounded-lg shadow-lg z-50 border border-gray-200 overflow-hidden"
    >
      {isLoggedIn ? (
        <ul className="py-2 text-gray-700">
          {menuItemsData.map((item, index) => (
            <li
              key={index}
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer transition ${item.className || ''}`}
              onClick={() => handleNavigation(item.path)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      ) : (
        <ul className="py-2 bg-slate-900 text-white">
          <li
            className="px-4 py-2 hover:bg-slate-800 cursor-pointer transition"
            onClick={() => handleNavigation("/user/login")}
          >
            Login
          </li>
          <hr></hr>
          <li
            className="px-4 py-2 hover:bg-slate-800 cursor-pointer transition"
            onClick={() => handleNavigation("/user/signup")}
          >
            Sign Up
          </li>
        </ul>
      )}
    </div>
  )}
</div>

  );
};

export default UserMenu;
