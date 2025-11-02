/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import { GpsFix, HouseLine } from '@phosphor-icons/react';
import LocationPopup from './LocationPopup';

export interface UserLocation {
  address: string;
  postalCode: string;
  division: string;
  country: string;
}

const Location: React.FC = () => {
    const [h_loading, setLoading] = useState<boolean>(true);
    const [v_customLocation, setCustomLocation] = useState<any | null>(null);
    const [v_storeChosen] = useState<string | null>(
        typeof window !== 'undefined' ? localStorage.getItem('v_storeChosen') : null
    );
    const [v_showPopup, setv_ShowPopup] = useState(false);

    const handleSaveLocation = (newLocation: UserLocation) => {
        const { postalCode, division, country, address } = newLocation;

        const formattedLocation = {
            address: address || 'Unknown address',
            postalCode: postalCode || 'Unknown postal code',
            division: division || 'Unknown state',
            country: country || 'Unknown country',
        };

        localStorage.setItem('location', JSON.stringify(formattedLocation));
        setCustomLocation(formattedLocation);
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCustomLocation(typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('location') || 'null') : null);
            if (v_customLocation) return;
            // console.log("Fetching location from geolocation-db...");
            fetch("http://ip-api.com/json/")
                .then(res => res.json())
                .then(data => {
                    const formattedLocation = {
                        address: `${data.city || 'Unknown city'}`,
                        postalCode: data.zip || 'Unknown postal code',
                        division: data.regionName || 'Unknown state',
                        country: data.country || 'Unknown country',
                    };

                    localStorage.setItem('location', JSON.stringify(formattedLocation));
                    setCustomLocation(formattedLocation);
                })
                .catch(err => console.error("Failed to fetch location:", err));

            setLoading(false)
        }
    }, []);

    if (h_loading) return;
    return (
        <div className="flex flex-col lg:items-center text-white">
            <div className="flex items-center lg:justify-center lg:text-center gap-x-4">
                {!v_customLocation ? (
                    <div className="flex items-center text-sm cursor-pointer" onClick={() => setv_ShowPopup(true)}>
                        <GpsFix className="mr-2" size={24} />
                        Fetching Location...
                    </div>
                ) : (
                    <div className="flex items-center cursor-pointer" onClick={() => setv_ShowPopup(true)}>
                        <GpsFix className="mr-2" size={24} />
                        <span className="text-sm">{`${v_customLocation.address}, ${v_customLocation.country}`}</span>
                    </div>
                )}

                {!v_storeChosen ? (
                    <div className="flex items-center text-sm cursor-pointer" />
                ) : (
                    <div className="flex items-center cursor-pointer">
                        <HouseLine className="mr-2" size={24} />
                        <span className="text-sm">Pickup Store: {v_storeChosen}</span>
                    </div>
                )}
            </div>

            {/* The location popup */}
            <LocationPopup
                isOpen={v_showPopup}
                onClose={() => setv_ShowPopup(false)}
                onSaveLocation={handleSaveLocation}
            />
        </div>
    );
};

export default Location;
