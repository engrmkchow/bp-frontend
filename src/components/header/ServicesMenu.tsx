'use client';

import React from 'react';
import * as Icons from '@phosphor-icons/react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import SrvcData from '@jds/menu/srvc.json';

/* =====================================================
   Type Definitions
   ===================================================== */
export interface ServiceProps {
  id?: number;
  label: string;
  path?: string;
  active: boolean;
}

/* =====================================================
   Component: ServiceDropdown
   ===================================================== */
export default function ServiceDropdown() {
  const v_services: ServiceProps[] = SrvcData.filter((s) => s.active);

  return (
    <Menu as="div" className="relative flex items-center justify-center p-4 text-center font-bold">
      {({ open }) => (
        <>
          {/* Dropdown Button */}
          <MenuButton className="MenuButton border-0 hover:bg-slate-800 bg-transparent flex items-center gap-1 rounded-md transition-colors">
            <Icons.GearSix size={20} weight={open ? 'fill' : 'regular'} />
            <span>Services</span>
          </MenuButton>

          {/* Dropdown Menu */}
          <MenuItems className="absolute top-full left-0 mt-2 w-48 bg-[#142941] shadow-lg rounded-md z-40">
            <div className="py-1">
              {v_services.map((service, index) => (
                <MenuItem key={index}>
                  {({ active }) => (
                    <button
                      className={`w-full px-4 py-2 text-left text-sm border-0 bg-transparent transition-colors ${
                        active ? 'bg-slate-800 text-white' : 'text-gray-300'
                      } hover:bg-slate-800`}
                      onClick={() => window.location.href = service.path || '#'}
                    >
                      {service.label}
                    </button>
                  )}
                </MenuItem>
              ))}
            </div>
          </MenuItems>
        </>
      )}
    </Menu>
  );
}
