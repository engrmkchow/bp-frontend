'use client';

import { useEffect, useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { CaretDownIcon, GlobeIcon, GoogleLogoIcon } from '@phosphor-icons/react';

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

const languages = [
  { name: 'English', code: 'en' },
  { name: 'বাংলা', code: 'bn' },
  { name: 'Español', code: 'es' },
  { name: 'Français', code: 'fr' },
  { name: 'Deutsch', code: 'de' },
  { name: '中文', code: 'zh-CN' }
];

export default function LangSelect() {
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  useEffect(() => {
    // Initialize Google Translate global function
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en', autoDisplay: false },
        'google_translate_element'
      );
    };

    // Inject Google Translate script
    const scriptId = 'google-translate-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);
    }
  }, []);

  const handleLanguageChange = (name: string, code: string) => {
    setSelectedLanguage(name);
    const selectEl = document.querySelector<HTMLSelectElement>('.goog-te-combo');
    if (selectEl) {
      selectEl.value = code;
      selectEl.dispatchEvent(new Event('change'));
    }
  };

  return (
    <div className="flex items-center justify-center text-center notranslate">
      {/* Hidden Google Translate element */}
      <div id="google_translate_element" style={{ display: 'none' }} />

      {/* Dropdown Menu */}
      <Menu as="div" className="relative inline-block text-left">
        <MenuButton className="inline-flex items-center gap-x-2 rounded-md py-2 text-sm font-semibold text-white bg-transparent border-0 hover:bg-slate-800">
          <GlobeIcon size={20} />
          <span>{selectedLanguage}</span>
          <CaretDownIcon className="-mr-1 h-5 w-5 text-white" aria-hidden="true" />
        </MenuButton>

        <MenuItems className="absolute left-0 lg:right-0 z-10 w-44 origin-top-right rounded-md bg-[#142941] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {languages.map(({ name, code }) => (
              <MenuItem key={code}>
                {({ active }) => (
                  <button
                    onClick={() => handleLanguageChange(name, code)}
                    className={`block w-full px-4 py-2 text-sm text-left border-0 ${
                      active ? 'bg-slate-800 text-white' : 'text-gray-300'
                    } hover:bg-slate-800`}
                  >
                    {name}
                  </button>
                )}
              </MenuItem>
            ))}
          </div>
          <div className="text-[9px] flex items-center justify-center py-1 bg-slate-900 rounded-b-md gap-1">
            Powered by Google Translate
            <GoogleLogoIcon size={10} weight="bold" />
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
}
