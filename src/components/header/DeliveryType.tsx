'use client';

import { useState, useEffect, useRef } from "react";
import { Package, CaretDown, Car, HouseLine, MapPin } from "@phosphor-icons/react";
import LocationPopup from './LocationPopup';
import StoreLocationData from '@jds/menu/storeLocation.json';

export interface UserLocation {
  address: string;
  postalCode: string;
  division: string;
  country: string;
}

interface StoreProps { 
  name: string, 
  address: string, 
  postalCode: string, 
  division: string, 
  country: string, 
  latitude: number;
  longitude: number;
}

export default function DeliveryType() {
  const [v_menuOpen, setMenuOpen] = useState<boolean>(false);
  const [v_deliverySelected, setDeliverySelected] = useState<"pickup" | "delivery">("delivery");
  const [v_customLocation, setv_CustomLocation] = useState<UserLocation | null>(null);
  const [v_showLocationPopup, setv_ShowLocationPopup] = useState<boolean>(false);
  const [v_stores] = useState<StoreProps[]>(StoreLocationData);
  const [v_storeChosen, setStoreChosen] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLocation = localStorage.getItem('location');
      if (storedLocation) {
        try {
          const parsedLocation: UserLocation = JSON.parse(storedLocation);
          setv_CustomLocation(parsedLocation);
        } catch {
          setv_CustomLocation(null);
        }
      }

      const storedStoreName = localStorage.getItem('v_storeChosen');
      if (storedStoreName) setStoreChosen(storedStoreName);

      const storedDeliveryType = localStorage.getItem('deliveryType');
      if (storedDeliveryType === "pickup" || storedDeliveryType === "delivery") {
        setDeliverySelected(storedDeliveryType);
      }
    }
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (v_menuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [v_menuOpen]);

  const handleSaveLocation = (newLocation: UserLocation) => {
    setv_CustomLocation(newLocation);
    localStorage.setItem('location', JSON.stringify(newLocation));
    setv_ShowLocationPopup(false);
  };

  const handleStoreSelection = (store: { name: string }) => {
    setStoreChosen(store.name);
    localStorage.setItem('v_storeChosen', store.name);
  };

  return (
    <div className="relative">
      {/* Main button */}
      <div
        className="flex items-center justify-center space-x-2 text-xs border-r-2 pr-2 border-yellow-500 hover:bg-slate-700 p-1 rounded cursor-pointer text-white"
        onClick={() => setMenuOpen(!v_menuOpen)}
      >
        <Package size={20} />
        <div>How do you want your items?</div>
        <CaretDown size={20} />
      </div>

      {/* Dropdown */}
      {v_menuOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-50 mt-1 left-0 w-full md:w-[25vw] bg-slate-800 rounded p-4 text-white shadow-lg"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => setDeliverySelected("pickup")}
              className={`cursor-pointer rounded-lg p-2 flex flex-col items-center justify-start bg-slate-900 hover:bg-yellow-500 transition-colors ${v_deliverySelected === "pickup" ? "border-4 border-yellow-500" : ""}`}
            >
              <Car size={32} weight="duotone" color="white" />
              Pickup
            </div>
            <div
              onClick={() => setDeliverySelected("delivery")}
              className={`cursor-pointer rounded-lg p-2 flex flex-col items-center justify-start bg-slate-900 hover:bg-yellow-500 transition-colors ${v_deliverySelected === "delivery" ? "border-4 border-yellow-500" : ""}`}
            >
              <HouseLine size={32} weight="duotone" color="white" />
              Delivery
            </div>
          </div>

          {v_deliverySelected === "delivery" ? (
            <div className="bg-slate-900 rounded-md overflow-hidden mt-4 p-3 text-white">
              <div className="flex items-start space-x-2 text-yellow-400">
                <MapPin size={20} weight="duotone" color="yellow" />
                <div>
                  Address for Delivery
                  <br />
                  <span className="text-white">
                    {v_customLocation
                      ? `${v_customLocation.address}, ${v_customLocation.division} ${v_customLocation.postalCode}, ${v_customLocation.country}`
                      : "No location set"}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setv_ShowLocationPopup(true)}
                className="mt-2 px-3 py-1 bg-yellow-500 text-slate-800 rounded hover:bg-yellow-600 transition"
              >
                Change address
              </button>
              <div className="mt-3 italic text-white/70">We will bring it to your doorstep. Minimum $10 shipping fee.</div>
            </div>
          ) : (
            <div className="bg-slate-900 rounded-md overflow-hidden mt-4 p-3 text-white">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-2 text-yellow-400">
                  <MapPin size={20} weight="duotone" color="yellow" />
                  <span>Select a store for pickup:</span>
                </div>
                <ul className="max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 rounded mt-2">
                  {v_stores.length > 0 ? (
                    v_stores.map((store, index) => (
                      <li
                        key={index}
                        onClick={() => handleStoreSelection(store)}
                        className={`cursor-pointer p-2 rounded ${v_storeChosen === store.name ? "bg-yellow-500 text-slate-900" : "hover:bg-yellow-600"}`}
                      >
                        {store.name} - <span className="text-white/70">{store.address}</span>
                      </li>
                    ))
                  ) : (
                    <li>No stores available</li>
                  )}
                </ul>
                <div className="mt-2">
                  Selected Store: <span className="text-yellow-400">{v_storeChosen || "None"}</span>
                </div>
              </div>
              <div className="mt-3 italic text-white/70">We will have it ready for you at this location.</div>
            </div>
          )}
        </div>
      )}

      {/* Location popup */}
      {v_showLocationPopup && (
        <LocationPopup
          isOpen={v_showLocationPopup}
          onClose={() => setv_ShowLocationPopup(false)}
          onSaveLocation={(loc) => {
            setv_CustomLocation(loc);
            localStorage.setItem('location', JSON.stringify(loc));
          }}
        />
      )}
    </div>
  );
}
