'use client';

import React, { useEffect, useState, useRef } from 'react';

export interface UserLocation {
  address: string;
  postalCode: string;
  division: string;
  country: string;
}

interface LocationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveLocation: (newLocation: UserLocation) => void;
}

const LocationPopup: React.FC<LocationPopupProps> = ({ isOpen, onClose, onSaveLocation }) => {
  const [zip, setZip] = useState('');
  const [regionName, setRegionName] = useState('');
  const [country, setCountry] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [addressSuggestions, setAddressSuggestions] = useState<{ fullAddress: string; zip: string; region: string; country: string }[]>([]);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  const popupRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Fetch user's location on mount
  useEffect(() => {
    if (isOpen) {
      fetch("http://ip-api.com/json/")
        .then(response => response.json())
        .then(data => {
          if (data.zip && data.regionName && data.country) {
            setZip(data.zip);
            setRegionName(data.regionName);
            setCountry(data.country);
            setInputValue(`${data.zip}, ${data.regionName}, ${data.country}`);
          }
        })
        .catch(error => console.error("Failed to fetch geolocation details:", error));
    }
  }, [isOpen]);

  const fetchAddressSuggestions = async (query: string) => {
    if (query.length > 2) {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1`);
        const data = await response.json();

        const suggestions = data.map((item: any) => ({
          fullAddress: [
            item.address.road,
            item.address.city,
            item.address.state,
            item.address.postcode,
            item.address.country_code?.toUpperCase()
          ].filter(Boolean).join(', '),
          zip: item.address.postcode || '',
          region: item.address.state || '',
          country: item.address.country_code?.toUpperCase() || ''
        }));

        setAddressSuggestions(suggestions.slice(0, 5));
      } catch (error) {
        console.error('Error fetching address suggestions:', error);
      }
    } else {
      setAddressSuggestions([]);
    }
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setInputValue(query);

    if (debounceTimeout) clearTimeout(debounceTimeout);

    const newTimeout = setTimeout(() => fetchAddressSuggestions(query), 500);
    setDebounceTimeout(newTimeout);
  };

  const handleSelectAddress = (address: { fullAddress: string; zip: string; region: string; country: string }) => {
    setInputValue(address.fullAddress);
    setZip(address.zip);
    setRegionName(address.region);
    setCountry(address.country);
    setAddressSuggestions([]);
  };

  const handleSaveLocation = () => {
    if (zip.trim() && regionName.trim() && country.trim()) {
      onSaveLocation({
        address: inputValue,
        postalCode: zip,
        division: regionName,
        country: country
      });
      onClose();
      window.location.href = "#";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div ref={popupRef} className="bg-slate-800 p-5 rounded-md shadow-lg w-80 text-center text-white">
        <h2 className="text-lg font-bold mb-3 text-yellow-400">Enter Your Location</h2>
        <input
          type="text"
          value={inputValue}
          onChange={handleAddressChange}
          placeholder="Enter your location"
          className="p-2 border border-slate-600 rounded-md w-full mb-3 bg-slate-900 text-white placeholder-slate-400 focus:outline-yellow-400"
        />
        {addressSuggestions.length > 0 && (
          <ul className="bg-slate-900 border border-slate-600 mt-2 p-2 max-h-40 overflow-y-auto rounded-md">
            {addressSuggestions.map((suggestion, index) => (
              <li
                key={index}
                className="cursor-pointer hover:bg-yellow-500 hover:text-slate-900 p-2 rounded transition"
                onClick={() => handleSelectAddress(suggestion)}
              >
                {suggestion.fullAddress}
              </li>
            ))}
          </ul>
        )}
        <div className="flex justify-between mt-3">
          <button
            onClick={handleSaveLocation}
            className="px-4 py-2 bg-yellow-500 text-slate-900 rounded hover:bg-yellow-600 transition"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationPopup;
