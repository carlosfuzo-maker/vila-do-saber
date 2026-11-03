"use client";

import React from "react";

interface BuildingArtProps {
  type: "castle" | "library" | "lab" | "tower" | "english" | "tech" | "art" | "garden";
  className?: string;
}

export function BuildingArt({ type, className = "w-20 h-20" }: BuildingArtProps) {
  switch (type) {
    case "castle":
      // Math: Castle with calculator clock and ruler flags
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Base */}
          <rect x="22" y="44" width="56" height="46" rx="8" fill="#FDE68A" stroke="#D97706" strokeWidth="3" />
          {/* Towers */}
          <rect x="14" y="32" width="20" height="58" rx="6" fill="#FBBF24" stroke="#D97706" strokeWidth="3" />
          <polygon points="12,32 24,14 36,32" fill="#F97316" stroke="#C2410C" strokeWidth="2.5" />
          <rect x="66" y="32" width="20" height="58" rx="6" fill="#FBBF24" stroke="#D97706" strokeWidth="3" />
          <polygon points="64,32 76,14 88,32" fill="#F97316" stroke="#C2410C" strokeWidth="2.5" />
          {/* Central Roof */}
          <polygon points="34,44 50,22 66,44" fill="#FB923C" stroke="#EA580C" strokeWidth="3" />
          {/* Door */}
          <path d="M42 90V64C42 59.5 45.5 56 50 56C54.5 56 58 59.5 58 64V90H42Z" fill="#B45309" stroke="#78350F" strokeWidth="2.5" />
          {/* Math Symbols Badge on roof */}
          <circle cx="50" cy="40" r="8" fill="#FFFFFF" stroke="#D97706" strokeWidth="2" />
          <text x="50" y="44" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#EA580C">±</text>
          {/* Windows */}
          <rect x="20" y="44" width="8" height="12" rx="4" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.5" />
          <rect x="72" y="44" width="8" height="12" rx="4" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.5" />
          {/* Flag */}
          <line x1="50" y1="22" x2="50" y2="10" stroke="#78350F" strokeWidth="2" />
          <polygon points="50,10 64,15 50,20" fill="#EF4444" />
        </svg>
      );

    case "library":
      // Portuguese: Giant magical book library with scroll chimney
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Base */}
          <rect x="18" y="42" width="64" height="48" rx="8" fill="#FCE7F3" stroke="#DB2777" strokeWidth="3" />
          {/* Book roof */}
          <path d="M12 42C26 30 46 38 50 42C54 38 74 30 88 42L82 24C68 18 54 22 50 24C46 22 32 18 18 24Z" fill="#F43F5E" stroke="#BE123C" strokeWidth="3" />
          {/* Spine bookmark ribbon */}
          <path d="M47 24V48L50 45L53 48V24" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
          {/* Door */}
          <path d="M42 90V62C42 57.5 45.5 54 50 54C54.5 54 58 57.5 58 62V90H42Z" fill="#9D174D" stroke="#831843" strokeWidth="2.5" />
          {/* Windows with book shapes */}
          <rect x="25" y="56" width="12" height="16" rx="4" fill="#FFF1F2" stroke="#BE123C" strokeWidth="2" />
          <line x1="31" y1="56" x2="31" y2="72" stroke="#FDA4AF" strokeWidth="1.5" />
          <rect x="63" y="56" width="12" height="16" rx="4" fill="#FFF1F2" stroke="#BE123C" strokeWidth="2" />
          <line x1="69" y1="56" x2="69" y2="72" stroke="#FDA4AF" strokeWidth="1.5" />
          {/* Quill feather flag */}
          <path d="M80 20C82 12 88 10 90 10C88 16 86 19 82 22Z" fill="#A855F7" stroke="#7E22CE" strokeWidth="1.5" />
        </svg>
      );

    case "lab":
      // Sciences: Futuristic laboratory with bubble flask dome and telescope
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Base */}
          <rect x="20" y="46" width="60" height="44" rx="10" fill="#CCFBF1" stroke="#0D9488" strokeWidth="3" />
          {/* Glass Dome */}
          <path d="M28 46C28 32 38 20 50 20C62 20 72 32 72 46Z" fill="#99F6E4" fillOpacity="0.8" stroke="#0F766E" strokeWidth="3" />
          {/* Flask neck at top */}
          <rect x="44" y="12" width="12" height="10" rx="3" fill="#5EEAD4" stroke="#0F766E" strokeWidth="2.5" />
          <rect x="40" y="8" width="20" height="5" rx="2.5" fill="#14B8A6" stroke="#0F766E" strokeWidth="2" />
          {/* Glowing bubbles */}
          <circle cx="45" cy="34" r="3" fill="#FFFFFF" />
          <circle cx="56" cy="28" r="4.5" fill="#FFFFFF" fillOpacity="0.9" />
          <circle cx="52" cy="40" r="2.5" fill="#FFFFFF" />
          {/* Door */}
          <rect x="42" y="60" width="16" height="30" rx="4" fill="#042F2E" stroke="#115E59" strokeWidth="2.5" />
          <circle cx="54" cy="74" r="2" fill="#2DD4BF" />
          {/* Porthole windows */}
          <circle cx="31" cy="66" r="6" fill="#FEF08A" stroke="#0D9488" strokeWidth="2" />
          <circle cx="69" cy="66" r="6" fill="#FEF08A" stroke="#0D9488" strokeWidth="2" />
        </svg>
      );

    case "tower":
      // History & Geography: Ancient Explorer Tower with clock and compass
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Base */}
          <polygon points="26,90 32,38 68,38 74,90" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3" />
          {/* Conical Roof */}
          <polygon points="28,38 50,12 72,38" fill="#0284C7" stroke="#0369A1" strokeWidth="3" />
          {/* Compass / Clock Rose */}
          <circle cx="50" cy="50" r="10" fill="#FEF08A" stroke="#B45309" strokeWidth="2" />
          <line x1="50" y1="42" x2="50" y2="58" stroke="#DC2626" strokeWidth="2" />
          <line x1="42" y1="50" x2="58" y2="50" stroke="#DC2626" strokeWidth="2" />
          {/* Door */}
          <path d="M44 90V72C44 68.5 46.5 66 50 66C53.5 66 56 68.5 56 72V90H44Z" fill="#075985" stroke="#0C4A6E" strokeWidth="2" />
          {/* Weather vane */}
          <line x1="50" y1="12" x2="50" y2="4" stroke="#D97706" strokeWidth="2" />
          <polygon points="46,4 54,4 50,0" fill="#F59E0B" />
        </svg>
      );

    case "english":
      // English: London / international cottage with red telephone booth style door
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Base */}
          <rect x="20" y="44" width="60" height="46" rx="8" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="3" />
          {/* Triangular Roof with shingles */}
          <polygon points="14,44 50,16 86,44" fill="#8B5CF6" stroke="#6D28D9" strokeWidth="3" />
          {/* Little Chimney */}
          <rect x="66" y="20" width="10" height="16" fill="#A78BFA" stroke="#6D28D9" strokeWidth="2" />
          {/* London Red Door */}
          <rect x="42" y="58" width="16" height="32" rx="4" fill="#EF4444" stroke="#B91C1C" strokeWidth="2.5" />
          <circle cx="54" cy="74" r="1.5" fill="#FEF08A" />
          {/* Big circular window with UK / Globe hint */}
          <circle cx="50" cy="34" r="7" fill="#FEF3C7" stroke="#7C3AED" strokeWidth="2" />
          <text x="50" y="37" textAnchor="middle" fontSize="9" fontWeight="black" fill="#6D28D9">EN</text>
          {/* Side Windows */}
          <rect x="26" y="60" width="10" height="12" rx="3" fill="#FFFBEB" stroke="#7C3AED" strokeWidth="1.5" />
          <rect x="64" y="60" width="10" height="12" rx="3" fill="#FFFBEB" stroke="#7C3AED" strokeWidth="1.5" />
        </svg>
      );

    case "tech":
      // Technology & Robotics: Futuristic Byte Workshop with robot antenna and glowing gear
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Base with metallic chamfer */}
          <rect x="20" y="42" width="60" height="48" rx="10" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3" />
          {/* Cyber Roof with solar panels */}
          <polygon points="16,42 28,24 72,24 84,42" fill="#0EA5E9" stroke="#0369A1" strokeWidth="3" />
          {/* Antenna */}
          <line x1="50" y1="24" x2="50" y2="8" stroke="#0284C7" strokeWidth="2.5" />
          <circle cx="50" cy="8" r="4.5" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
          {/* Glowing Circuit Lines */}
          <path d="M28 58H38V70H44" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
          <circle cx="44" cy="70" r="2.5" fill="#10B981" />
          {/* Robot Door */}
          <rect x="46" y="60" width="18" height="30" rx="4" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
          <rect x="50" y="66" width="10" height="6" rx="2" fill="#38BDF8" />
          {/* Gear icon on roof */}
          <circle cx="50" cy="33" r="5" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
        </svg>
      );

    case "garden":
      // Nature Garden / Science for 2nd grade: Greenhouse with flowers and sunshine
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Greenhouse arch base */}
          <path d="M20 90V50C20 33.4 33.4 20 50 20C66.6 20 80 33.4 80 50V90H20Z" fill="#DCFCE7" stroke="#16A34A" strokeWidth="3" />
          {/* Greenhouse frame lines */}
          <path d="M35 90V30" stroke="#86EFAC" strokeWidth="2" />
          <path d="M65 90V30" stroke="#86EFAC" strokeWidth="2" />
          <path d="M20 55H80" stroke="#86EFAC" strokeWidth="2" />
          <path d="M20 72H80" stroke="#86EFAC" strokeWidth="2" />
          {/* Wooden door */}
          <path d="M42 90V64C42 59.5 45.5 56 50 56C54.5 56 58 59.5 58 64V90H42Z" fill="#CA8A04" stroke="#854D0E" strokeWidth="2" />
          {/* Big Sunflower on top */}
          <circle cx="50" cy="18" r="6" fill="#F59E0B" />
          <circle cx="50" cy="18" r="3" fill="#78350F" />
        </svg>
      );

    case "art":
      // Arts & Studio: Rainbow palette studio with paintbrush chimney
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Base */}
          <rect x="20" y="44" width="60" height="46" rx="10" fill="#FDF4FF" stroke="#C026D3" strokeWidth="3" />
          {/* Rainbow arched roof */}
          <path d="M16 44C16 25 31 16 50 16C69 16 84 25 84 44H16Z" fill="#F472B6" stroke="#DB2777" strokeWidth="3" />
          {/* Paint drips / splashes on roof */}
          <circle cx="34" cy="30" r="4" fill="#38BDF8" />
          <circle cx="50" cy="24" r="4.5" fill="#FACC15" />
          <circle cx="66" cy="30" r="4" fill="#4ADE80" />
          {/* Paintbrush on side */}
          <line x1="78" y1="36" x2="88" y2="12" stroke="#B45309" strokeWidth="3" strokeLinecap="round" />
          <polygon points="86,16 92,10 88,8 82,14" fill="#E11D48" />
          {/* Studio Door */}
          <rect x="42" y="60" width="16" height="30" rx="6" fill="#701A75" stroke="#4A044E" strokeWidth="2" />
          <circle cx="53" cy="75" r="1.5" fill="#FDE047" />
          {/* Artist Palette window */}
          <circle cx="30" cy="64" r="6" fill="#FDE047" stroke="#C026D3" strokeWidth="1.5" />
          <circle cx="70" cy="64" r="6" fill="#67E8F9" stroke="#C026D3" strokeWidth="1.5" />
        </svg>
      );

    default:
      return null;
  }
}
