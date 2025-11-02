'use client';

import React, { useState, useRef } from 'react';
import * as Icons from '@phosphor-icons/react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

import CategoryData from '@jds/menu/itemcat.json';
import DeptData from '@jds/menu/itemdept.json';

/* =====================================================
   Type Definitions
   ===================================================== */
export interface DepartmentProps {
  id?: number;
  did: number;
  dept: string;
  is_actv: 'N' | 'Y' | string;
  c_domain: string;
  mkrid?: string | null;
  mkr_date?: string; // ISO date string
}

/* =====================================================
   Utility: Normalize text (Init Caps, remove dashes)
   ===================================================== */
function makeTestNormal(text: string) {
  return text
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/* =====================================================
   Component: DepartmentDropdown
   ===================================================== */
export default function DepartmentDropdown() {
  const [v_hoverDept, setHoverDept] = useState<string | null>(null);
  const departmentRef = useRef<HTMLDivElement>(null);

  const v_departments = DeptData;
  const v_cats = CategoryData;

  return (
    <Menu
      as="div"
      className="relative flex items-center justify-center p-4 text-center font-bold"
      ref={departmentRef}
    >
      {({ open }) => (
        <>
          {/* Dropdown Button */}
          <MenuButton className="MenuButton border-0 hover:bg-slate-800 bg-transparent flex items-center gap-1  rounded-md transition-colors">
            <Icons.SquaresFourIcon size={20} weight={open ? 'fill' : 'regular'} />
            <span>Departments</span>
          </MenuButton>

          {/* Dropdown Menu */}
          <MenuItems className="absolute top-full left-0 mt-2 shadow-lg rounded-md z-40">
            <div
              onMouseLeave={() => setHoverDept(null)}
              className="flex flex-row"
            >
              {/* LEFT COLUMN — Departments */}
              <div className="py-1 max-h-[80vh] bg-[#142941] overflow-y-auto min-w-fit">
                {v_departments
                  .filter((dept) => dept.is_actv !== 'N')
                  .sort((a, b) => a.dept.localeCompare(b.dept))
                  .map((dept, index) => (
                    <MenuItem key={index}>
                      {({ active }) => (
                        <div
                          onMouseEnter={() => setHoverDept(dept.dept)}
                          className={`cursor-pointer group flex justify-between items-center w-full whitespace-nowrap 
                            px-4 py-2 text-left text-xs capitalize transition-colors
                            ${
                              active || v_hoverDept === dept.dept
                                ? 'bg-slate-800 text-white'
                                : 'text-gray-300'
                            }
                            hover:bg-slate-800`}
                          onClick={() =>
                            (window.location.href = `/departments/${dept.dept.toLowerCase()}`)
                          }
                        >
                          {makeTestNormal(dept.dept)}
                          <Icons.CaretRight
                            size={16}
                            color="orange"
                            weight="fill"
                            className={`transition-all opacity-0 ${
                              v_hoverDept === dept.dept
                                ? 'opacity-100'
                                : 'group-hover:opacity-100'
                            }`}
                          />
                        </div>
                      )}
                    </MenuItem>
                  ))}
              </div>

              {/* RIGHT COLUMN — Categories */}
              <div className="max-h-[80vh] overflow-y-auto bg-slate-900">
                {v_hoverDept && (
                  <div className="p-4 min-w-[50vw]">
                    <h2 className="text-lg text-slate-400 font-bold mb-2">
                      Categories
                    </h2>
                    <div className="grid grid-cols-3 gap-2">
                      {v_cats[v_hoverDept as keyof typeof v_cats]
                        ?.filter((cat) => cat.is_actv !== 'N')
                        .sort((a, b) => a.itemcat.localeCompare(b.itemcat))
                        .map((cat, index) => (
                          <button
                            key={index}
                            className="capitalize hover:bg-slate-800 border-0 border-l border-slate-700 w-full p-2 text-left text-xs bg-transparent transition-all"
                            onClick={() =>
                              (window.location.href = `/categories/${cat.itemcat.toLowerCase()}`)
                            }
                          >
                            {makeTestNormal(cat.itemcat)}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </MenuItems>
        </>
      )}
    </Menu>
  );
}
