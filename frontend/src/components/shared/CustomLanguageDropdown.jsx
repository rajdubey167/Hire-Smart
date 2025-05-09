import { useState } from 'react';
import "./language.css";
const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
];

const CustomLanguageDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLanguageChange = (code) => {
    setSelectedLanguage(code);
    setShowDropdown(false);
    // Trigger language change (you can integrate it with Google Translate API or your language switcher logic)
    console.log(`Language changed to: ${code}`);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center bg-[#333] text-white p-2 rounded-lg hover:bg-[#444] focus:outline-none transition-all duration-300"
      >
        <span>{languages.find((lang) => lang.code === selectedLanguage)?.name}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 ml-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {showDropdown && (
        <div className="absolute bg-[#333] text-white mt-2 rounded-lg shadow-lg w-40 z-10">
          <ul className="text-sm">
            {languages.map((lang) => (
              <li
                key={lang.code}
                className="px-4 py-2 hover:bg-[#444] cursor-pointer"
                onClick={() => handleLanguageChange(lang.code)}
              >
                {lang.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomLanguageDropdown;
