"use client";

import React, { useState, useEffect } from "react";

export interface NpcConfig {
  id: string;
  name: string;
  role: string;
  emoji: string;
  speechText: string;
  badgeColor: string;
  toolEmoji?: string;
  waypointA: { x: number; y: number };
  waypointB: { x: number; y: number };
}

interface ArticulatedNpcProps {
  npc: NpcConfig;
  onInteract: () => void;
  scale?: number;
  className?: string;
  speechBalloon?: string | null;
  customActionLabel?: string;
  onCustomAction?: () => void;
}

export function ArticulatedNpc({
  npc,
  onInteract,
  scale = 1.2,
  className = "",
  speechBalloon,
  customActionLabel,
  onCustomAction,
}: ArticulatedNpcProps) {
  // Autonomous walking between waypoint A and waypoint B
  const [currentPos, setCurrentPos] = useState<{ x: number; y: number }>(npc.waypointA);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isWalking, setIsWalking] = useState(false);
  const [targetWaypoint, setTargetWaypoint] = useState<"A" | "B">("B");

  // Autonomous roaming patrol loop
  useEffect(() => {
    const patrolInterval = setInterval(() => {
      // Pick next destination
      const nextTarget = targetWaypoint === "A" ? "B" : "A";
      const targetCoords = nextTarget === "A" ? npc.waypointA : npc.waypointB;

      // Determine facing direction
      setDirection(targetCoords.x < currentPos.x ? "left" : "right");
      setIsWalking(true);
      setCurrentPos(targetCoords);
      setTargetWaypoint(nextTarget);

      // Stop walking animation when destination reached (glide takes ~2.2s)
      setTimeout(() => {
        setIsWalking(false);
      }, 2300);
    }, 7000 + Math.random() * 2000);

    return () => clearInterval(patrolInterval);
  }, [currentPos, targetWaypoint, npc.waypointA, npc.waypointB]);

  // Specific thematic SVG details for each NPC character
  const renderNpcFeatures = () => {
    switch (npc.id) {
      case "mamae":
        return (
          <g>
            {/* Soft pink cardigan & dress */}
            <path d="M 20 48 L 50 48 L 54 74 L 16 74 Z" fill="#F472B6" />
            <path d="M 28 48 L 35 58 L 42 48 Z" fill="#FFF1F2" />
            <circle cx="35" cy="62" r="1.5" fill="#BE185D" />
            <circle cx="35" cy="68" r="1.5" fill="#BE185D" />
            {/* Elegant wavy hair */}
            <path
              d="M 17 30 C 17 10, 53 10, 53 30 C 53 44, 48 48, 46 42 C 45 28, 44 20, 35 20 C 26 20, 25 28, 24 42 C 22 48, 17 44, 17 30 Z"
              fill="#581C87"
            />
            {/* Pearl necklace */}
            <ellipse cx="35" cy="46" rx="6" ry="2" fill="none" stroke="#FFFFFF" strokeWidth="1.2" strokeDasharray="1.5,1.5" />
            {/* Tray with tea & heart */}
            <rect x="44" y="56" width="16" height="3" rx="1.5" fill="#D97706" />
            <path d="M 52 54 Q 54 51 52 48" stroke="rgba(255,255,255,0.7)" strokeWidth="1" fill="none" />
          </g>
        );

      case "manuel":
        return (
          <g>
            {/* Baker's White Jacket & Red Scarf */}
            <path d="M 20 48 L 50 48 L 52 74 L 18 74 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
            <path d="M 30 48 L 35 58 L 40 48 Z" fill="#DC2626" />
            <line x1="35" y1="58" x2="35" y2="74" stroke="#CBD5E1" strokeWidth="1.5" />
            {/* Baker's Tall Chef Hat (Toque Blanche) */}
            <ellipse cx="35" cy="18" rx="14" ry="7" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
            <rect x="25" y="17" width="20" height="9" fill="#FFFFFF" />
            <line x1="25" y1="26" x2="45" y2="26" stroke="#DC2626" strokeWidth="2" />
            {/* Friendly Mustache */}
            <path d="M 29 42 Q 35 44 35 41 Q 35 44 41 42 Q 35 46 29 42 Z" fill="#451A03" />
            {/* Wooden Bread Peel paddle */}
            <line x1="48" y1="45" x2="62" y2="75" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
            <ellipse cx="61" cy="72" rx="6" ry="4" fill="#D97706" />
          </g>
        );

      case "carlos":
      case "papai":
        return (
          <g>
            {/* Handsome Dad Polo Shirt / Sweater in Navy & Emerald */}
            <path d="M 20 48 L 50 48 L 52 74 L 18 74 Z" fill="#1E3A8A" />
            <path d="M 28 48 L 35 58 L 42 48 Z" fill="#E2E8F0" />
            <rect x="34" y="58" width="2" height="12" fill="#0284C7" />
            {/* Neat stylish brown hair */}
            <path d="M 18 28 C 18 12, 52 12, 52 28 C 50 18, 22 18, 18 28 Z" fill="#292524" />
            {/* Smart wristwatch */}
            <rect x="14" y="58" width="3" height="4" rx="1" fill="#D97706" />
            {/* Smartphone (SaberPhone) in hand */}
            <rect x="52" y="52" width="6" height="10" rx="1.5" fill="#0F172A" stroke="#38BDF8" strokeWidth="1" />
            <rect x="53.5" y="54" width="3" height="6" fill="#38BDF8" />
          </g>
        );

      case "irma":
      case "bianca_npc":
        return (
          <g>
            {/* Bianca: Playful twin pigtails with cute cyan ribbons & coral dress with yellow star */}
            <path d="M 21 48 L 49 48 L 53 74 L 17 74 Z" fill="#FB7185" />
            <circle cx="35" cy="60" r="3" fill="#FDE047" />
            {/* Twin pigtails */}
            <path d="M 19 30 C 19 12, 51 12, 51 30 C 48 23, 22 23, 19 30 Z" fill="#78350F" />
            <path d="M 19 30 C 10 32, 10 44, 15 50 C 16 44, 17 38, 19 34 Z" fill="#78350F" />
            <path d="M 51 30 C 60 32, 60 44, 55 50 C 54 44, 53 38, 51 34 Z" fill="#78350F" />
            {/* Cyan ribbons */}
            <circle cx="17" cy="30" r="2.8" fill="#38BDF8" />
            <circle cx="53" cy="30" r="2.8" fill="#38BDF8" />
            {/* Toy teddy bear in arm */}
            <ellipse cx="14" cy="58" rx="4.5" ry="5.5" fill="#B45309" />
            <circle cx="12" cy="54" r="1.8" fill="#D97706" />
            <circle cx="16" cy="54" r="1.8" fill="#D97706" />
            <circle cx="14" cy="57" r="1.5" fill="#451A03" />
          </g>
        );

      case "cecilia_npc":
        return (
          <g>
            {/* Cecília: Smart indigo uniform dress with gold star & longer dark brown hair */}
            <path d="M 21 48 L 49 48 L 53 74 L 17 74 Z" fill="#4F46E5" />
            <path d="M 29 48 L 35 56 L 41 48 Z" fill="#FFFFFF" />
            <circle cx="35" cy="62" r="2.5" fill="#FACC15" />
            {/* Longer sleek dark hair with purple headband */}
            <path d="M 17 28 C 17 10, 53 10, 53 28 C 53 46, 50 56, 47 48 C 45 28, 44 20, 35 20 C 26 20, 25 28, 23 48 C 20 56, 17 46, 17 28 Z" fill="#3B1C0B" />
            <path d="M 18 24 C 25 18, 45 18, 52 24" stroke="#A855F7" strokeWidth="2.5" fill="none" />
            <circle cx="21" cy="22" r="2.2" fill="#EC4899" />
            {/* Smart glasses */}
            <circle cx="28" cy="35" r="4.2" stroke="#6366F1" strokeWidth="1.4" fill="rgba(255,255,255,0.4)" />
            <circle cx="42" cy="35" r="4.2" stroke="#6366F1" strokeWidth="1.4" fill="rgba(255,255,255,0.4)" />
            <line x1="32.2" y1="35" x2="37.8" y2="35" stroke="#6366F1" strokeWidth="1.4" />
            {/* Science encyclopedia / book in hand */}
            <rect x="11" y="52" width="7" height="11" rx="1.5" fill="#059669" stroke="#34D399" strokeWidth="1" />
            <rect x="12" y="54" width="5" height="1" fill="#FFFFFF" />
            <rect x="12" y="57" width="5" height="1" fill="#FFFFFF" />
          </g>
        );

      case "market_clerk":
        return (
          <g>
            {/* Poké Mart style emerald green clerk vest & visor cap */}
            <path d="M 20 48 L 50 48 L 52 74 L 18 74 Z" fill="#059669" />
            <path d="M 28 48 L 35 58 L 42 48 Z" fill="#FFFFFF" />
            <circle cx="35" cy="62" r="1.5" fill="#FDE047" />
            <circle cx="35" cy="68" r="1.5" fill="#FDE047" />
            {/* Green cap */}
            <ellipse cx="35" cy="20" rx="14" ry="5" fill="#047857" />
            <rect x="24" y="16" width="22" height="6" rx="2" fill="#047857" />
            <path d="M 22 22 Q 35 25 48 22" stroke="#FDE047" strokeWidth="2" fill="none" />
            {/* Shopping basket in hand */}
            <rect x="50" y="58" width="10" height="8" rx="2" fill="#D97706" />
            <line x1="52" y1="58" x2="55" y2="52" stroke="#B45309" strokeWidth="1.5" />
            <line x1="58" y1="58" x2="55" y2="52" stroke="#B45309" strokeWidth="1.5" />
          </g>
        );

      case "amiga":
        return (
          <g>
            {/* Cute colourful kid dress with star */}
            <path d="M 21 48 L 49 48 L 54 74 L 16 74 Z" fill="#C084FC" />
            <circle cx="35" cy="61" r="3" fill="#FDE047" />
            {/* Twin braided pigtails with cute ribbon ties */}
            <path d="M 19 30 C 19 12, 51 12, 51 30 C 48 23, 22 23, 19 30 Z" fill="#B45309" />
            <path d="M 19 30 C 10 32, 10 46, 14 52 C 16 46, 17 38, 19 34 Z" fill="#B45309" />
            <path d="M 51 30 C 60 32, 60 46, 56 52 C 54 46, 53 38, 51 34 Z" fill="#B45309" />
            <circle cx="18" cy="32" r="2.8" fill="#F43F5E" />
            <circle cx="52" cy="32" r="2.8" fill="#F43F5E" />
            {/* Friendship bracelet */}
            <circle cx="15" cy="58" r="2" fill="#38BDF8" />
            <circle cx="17" cy="59" r="2" fill="#F43F5E" />
          </g>
        );

      case "clara":
        return (
          <g>
            {/* White Science Lab Coat & Teal Lapels */}
            <path d="M 20 48 L 50 48 L 52 74 L 18 74 Z" fill="#F8FAFC" stroke="#99F6E4" strokeWidth="1.5" />
            <path d="M 29 48 L 35 60 L 41 48 Z" fill="#0D9488" />
            {/* Scientist High Bun & Pencil */}
            <ellipse cx="35" cy="18" rx="8" ry="7" fill="#78350F" />
            <line x1="28" y1="16" x2="43" y2="16" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
            {/* Round Protective Glasses */}
            <circle cx="28" cy="34" r="5" stroke="#0D9488" strokeWidth="1.8" fill="rgba(255,255,255,0.4)" />
            <circle cx="42" cy="34" r="5" stroke="#0D9488" strokeWidth="1.8" fill="rgba(255,255,255,0.4)" />
            <line x1="33" y1="34" x2="37" y2="34" stroke="#0D9488" strokeWidth="1.8" />
            {/* Glowing Erlenmeyer Flask */}
            <polygon points="50,68 56,68 54,60 52,60" fill="#10B981" opacity="0.9" />
            <circle cx="53" cy="65" r="1" fill="#FFFFFF" />
          </g>
        );

      case "pitagoras":
        return (
          <g>
            {/* Royal Starry Wizard Robe */}
            <path d="M 20 48 L 50 48 L 54 76 L 16 76 Z" fill="#4338CA" />
            <polygon points="35,50 37,55 35,60 33,55" fill="#FACC15" />
            <polygon points="25,64 27,69 25,74 23,69" fill="#FACC15" />
            <polygon points="45,64 47,69 45,74 43,69" fill="#FACC15" />
            {/* Pointed Wizard Hat with Golden Stars */}
            <polygon points="35,4 20,26 50,26" fill="#3730A3" />
            <ellipse cx="35" cy="26" rx="17" ry="5" fill="#312E81" />
            <circle cx="35" cy="15" r="2" fill="#FDE047" />
            {/* Long Wise Wizard Beard */}
            <path d="M 27 42 C 27 56, 43 56, 43 42 Z" fill="#E2E8F0" />
            {/* Crystal Math Wand */}
            <line x1="52" y1="48" x2="62" y2="34" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="63" cy="33" r="3.5" fill="#38BDF8" className="animate-ping" opacity="0.6" />
            <circle cx="63" cy="33" r="2.5" fill="#38BDF8" />
          </g>
        );

      case "sofia":
        return (
          <g>
            {/* Elegant teacher blazer & scarf */}
            <path d="M 20 48 L 50 48 L 52 74 L 18 74 Z" fill="#9F1239" />
            <path d="M 28 48 L 35 58 L 42 48 Z" fill="#FFE4E6" />
            {/* Dark curled hair with bun */}
            <path d="M 18 30 C 18 12, 52 12, 52 30 C 50 22, 20 22, 18 30 Z" fill="#3B0764" />
            <circle cx="35" cy="16" r="6" fill="#3B0764" />
            {/* Reading Glasses */}
            <circle cx="28" cy="34" r="4.5" stroke="#F59E0B" strokeWidth="1.5" fill="none" />
            <circle cx="42" cy="34" r="4.5" stroke="#F59E0B" strokeWidth="1.5" fill="none" />
            <line x1="32.5" y1="34" x2="37.5" y2="34" stroke="#F59E0B" strokeWidth="1.5" />
            {/* Open Enchanted Storybook */}
            <polygon points="12,56 22,54 22,66 12,68" fill="#FDE047" stroke="#CA8A04" strokeWidth="1" />
            <polygon points="22,54 32,56 32,68 22,66" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1" />
            {/* Little owl Peninha perched on right shoulder */}
            <ellipse cx="56" cy="44" rx="5" ry="6" fill="#78350F" />
            <circle cx="54" cy="42" r="1.5" fill="#FEF08A" />
            <circle cx="58" cy="42" r="1.5" fill="#FEF08A" />
            <polygon points="56,43 55,45 57,45" fill="#EA580C" />
          </g>
        );

      case "emily":
        return (
          <g>
            {/* British Navy Blazer with red and white striped scarf */}
            <path d="M 20 48 L 50 48 L 52 74 L 18 74 Z" fill="#1E3A8A" />
            <path d="M 27 48 L 35 58 L 43 48 Z" fill="#DC2626" />
            <line x1="31" y1="50" x2="39" y2="50" stroke="#FFFFFF" strokeWidth="1.5" />
            {/* Blonde bob hairstyle */}
            <path d="M 18 30 C 18 12, 52 12, 52 30 C 52 42, 49 44, 46 36 C 45 22, 25 22, 24 36 C 21 44, 18 42, 18 30 Z" fill="#EAB308" />
            {/* English Tea Cup in hand */}
            <rect x="50" y="56" width="7" height="6" rx="2" fill="#FFFFFF" stroke="#1E3A8A" strokeWidth="1" />
            <path d="M 57 58 Q 60 59 57 61" stroke="#1E3A8A" strokeWidth="1" fill="none" />
            <path d="M 53 54 Q 55 52 53 50" stroke="rgba(255,255,255,0.7)" strokeWidth="1" fill="none" />
          </g>
        );

      case "leo":
        return (
          <g>
            {/* Cyan Maker Overalls with tool pouch */}
            <path d="M 20 48 L 50 48 L 52 74 L 18 74 Z" fill="#0891B2" />
            <rect x="28" y="58" width="14" height="10" rx="2" fill="#155E75" />
            {/* Maker Protection Goggles on forehead */}
            <ellipse cx="28" cy="24" rx="5" ry="3.5" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
            <ellipse cx="42" cy="24" rx="5" ry="3.5" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
            <line x1="33" y1="24" x2="37" y2="24" stroke="#71717A" strokeWidth="2" />
            {/* Spiky brown hair */}
            <path d="M 19 28 L 24 16 L 30 22 L 36 14 L 42 22 L 48 16 L 51 28 Z" fill="#573812" />
            {/* Cyber Circuit Wrench */}
            <line x1="12" y1="52" x2="16" y2="68" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="12" cy="52" r="3" fill="#22D3EE" />
          </g>
        );

      case "mona":
        return (
          <g>
            {/* Artist Fuchsia Smock with colorful paint splatters */}
            <path d="M 20 48 L 50 48 L 52 74 L 18 74 Z" fill="#C026D3" />
            <circle cx="28" cy="58" r="2" fill="#FACC15" />
            <circle cx="38" cy="64" r="2" fill="#38BDF8" />
            <circle cx="44" cy="56" r="1.5" fill="#4ADE80" />
            {/* Scarlet French Artist Beret tilted */}
            <ellipse cx="37" cy="18" rx="14" ry="6" fill="#DC2626" transform="rotate(-12 37 18)" />
            <circle cx="39" cy="13" r="1.5" fill="#991B1B" />
            {/* Artist Wooden Palette with primary colors & Brush */}
            <ellipse cx="14" cy="62" rx="6" ry="8" fill="#FDE047" stroke="#D97706" strokeWidth="1" />
            <circle cx="12" cy="58" r="1.2" fill="#DC2626" />
            <circle cx="16" cy="60" r="1.2" fill="#2563EB" />
            <circle cx="13" cy="64" r="1.2" fill="#FACC15" />
            <line x1="48" y1="50" x2="58" y2="40" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
            <circle cx="58" cy="40" r="2" fill="#EC4899" />
          </g>
        );

      default:
        return (
          <g>
            <path d="M 20 48 L 50 48 L 52 74 L 18 74 Z" fill="#3B82F6" />
          </g>
        );
    }
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onInteract();
      }}
      className={`npc-character absolute z-25 flex flex-col items-center cursor-pointer group ${className}`}
      style={{
        left: `${currentPos.x}%`,
        top: `${currentPos.y}%`,
        transform: "translate(-50%, -100%)",
        transition: "left 2.5s cubic-bezier(0.35, 1, 0.45, 1), top 2.5s cubic-bezier(0.35, 1, 0.45, 1)",
        willChange: "left, top",
      }}
    >
      {/* Interactive Speech Balloon (stays above NPC) */}
      <div className="mb-2 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-xl border-2 border-amber-300 max-w-[210px] text-center animate-bounce-subtle pointer-events-auto">
        <div className="flex items-center justify-center gap-1.5 mb-0.5">
          <span className="text-[10px] font-black text-slate-500 uppercase">
            {npc.role}
          </span>
          <span className="text-xs">{npc.emoji}</span>
        </div>

        <p className="text-xs font-bold text-slate-800 leading-tight">
          &ldquo;{speechBalloon || npc.speechText}&rdquo;
        </p>

        {customActionLabel && onCustomAction && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onCustomAction();
            }}
            className="btn-game mt-2 w-full px-2.5 py-1.5 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-xl text-xs font-black shadow-md flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>{customActionLabel}</span>
          </button>
        )}
      </div>

      {/* Articulated Vector Body */}
      <div
        className="relative transition-transform duration-300 group-hover:scale-105 active:scale-95"
        style={{
          transform: `scale(${scale}) ${direction === "left" ? "scaleX(-1)" : "scaleX(1)"}`,
        }}
      >
        <svg
          viewBox="0 0 70 95"
          className={`w-16 h-22 sm:w-20 sm:h-28 drop-shadow-md overflow-visible ${
            isWalking ? "animate-wiggle" : "animate-breathe"
          }`}
        >
          {/* Ground shadow */}
          <ellipse cx="35" cy="89" rx="16" ry="3.5" fill="rgba(0,0,0,0.18)" />

          {/* Articulated Walking Legs */}
          <g className={isWalking ? "animate-walk-cycle" : ""}>
            <rect x="26" y="70" width="6.5" height="15" rx="3" fill="#FCD3B0" />
            <ellipse cx="29" cy="86" rx="5" ry="3" fill="#334155" />
            <rect x="37.5" y="70" width="6.5" height="15" rx="3" fill="#FCD3B0" />
            <ellipse cx="41" cy="86" rx="5" ry="3" fill="#334155" />
          </g>

          {/* Thematic Outfit & Props */}
          {renderNpcFeatures()}

          {/* Neck */}
          <rect x="31" y="44" width="8" height="7" rx="2" fill="#FCD3B0" />

          {/* Head & Cute Cheerful Face */}
          <path
            d="M 19 28 C 19 14, 51 14, 51 28 C 51 37, 49 46, 42 49 C 38 50.8, 32 50.8, 28 49 C 21 46, 19 37, 19 28 Z"
            fill="#FCD3B0"
          />

          {/* Soft Blushing Cheeks */}
          <ellipse cx="23.5" cy="40" rx="3" ry="1.5" fill="#FB7185" opacity="0.35" />
          <ellipse cx="46.5" cy="40" rx="3" ry="1.5" fill="#FB7185" opacity="0.35" />

          {/* Cheerful Animated Eyes */}
          <g>
            <ellipse cx="28" cy="35" rx="3.2" ry="4" fill="#1E293B" />
            <circle cx="27" cy="33.5" r="1.3" fill="#FFFFFF" />
            <ellipse cx="42" cy="35" rx="3.2" ry="4" fill="#1E293B" />
            <circle cx="41" cy="33.5" r="1.3" fill="#FFFFFF" />
          </g>

          {/* Sweet Mouth Smile */}
          <path
            d="M 32 42.5 Q 35 45.5 38 42.5"
            stroke="#991B1B"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="#FDA4AF"
          />

          {/* Hands */}
          <circle cx="17" cy="60" r="3.2" fill="#FCD3B0" />
          <circle cx="53" cy="60" r="3.2" fill="#FCD3B0" />
        </svg>

        {/* Name Tag Badge */}
        <div
          className={`mt-0.5 px-2.5 py-0.5 rounded-full text-[10px] font-black shadow-md whitespace-nowrap text-center ${npc.badgeColor}`}
          style={{ transform: direction === "left" ? "scaleX(-1)" : "none" }}
        >
          {npc.name}
        </div>
      </div>
    </div>
  );
}
