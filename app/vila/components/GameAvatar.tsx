"use client";

import React from "react";
import { AvatarCustomization } from "../types";

interface GameAvatarProps {
  customization: AvatarCustomization;
  studentName: string;
  level: number;
  isWalking?: boolean;
  direction?: "left" | "right";
  scale?: number;
  className?: string;
  showNameTag?: boolean;
}

export function GameAvatar({
  customization,
  studentName,
  level,
  isWalking = false,
  direction = "right",
  scale = 1,
  className = "",
  showNameTag = true,
}: GameAvatarProps) {
  const {
    gender = "girl",
    skinTone = "#FCD3B0",
    hairStyle = "pigtails",
    hairColor = "#78350F",
    eyeColor = "#451A03",
    outfitId = "starter",
    accessoryId = "none",
    petId = null,
    blushStyle = "none",
  } = customization || {};

  // Render Hair according to hairstyle with glossy highlights
  const renderHair = () => {
    switch (hairStyle) {
      case "pigtails":
        return (
          <g>
            {/* Top base hair with soft volume */}
            <path
              d="M 18 30 C 17 12, 53 12, 52 30 C 52 24, 43 19, 35 19 C 27 19, 18 24, 18 30 Z"
              fill={hairColor}
            />
            {/* Glossy shine highlight across crown */}
            <path
              d="M 23 20 C 28 17, 42 17, 47 20"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Cute curved bangs framing forehead */}
            <path
              d="M 19 28 C 23 23, 29 23, 33 26 C 37 23, 44 23, 51 28 C 46 25, 38 24, 35 25 C 32 24, 24 25, 19 28 Z"
              fill={hairColor}
            />
            {/* Left curved bouncy twintail */}
            <path
              d="M 19 29 C 9 27, 6 42, 11 49 C 13 44, 15 36, 18 34 Z"
              fill={hairColor}
            />
            {/* Left twintail shine */}
            <path
              d="M 11 35 C 10 39, 11 44, 13 46"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
            />
            {/* Right curved bouncy twintail */}
            <path
              d="M 51 29 C 61 27, 64 42, 59 49 C 57 44, 55 36, 52 34 Z"
              fill={hairColor}
            />
            {/* Right twintail shine */}
            <path
              d="M 59 35 C 60 39, 59 44, 57 46"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
            />
            {/* Twintail cute pink bows */}
            <circle cx="18" cy="30" r="3.2" fill="#EC4899" />
            <circle cx="18" cy="30" r="1.5" fill="#FDE047" />
            <circle cx="52" cy="30" r="3.2" fill="#EC4899" />
            <circle cx="52" cy="30" r="1.5" fill="#FDE047" />
          </g>
        );

      case "long":
        return (
          <g>
            {/* Back hair flowing down past shoulders */}
            <path
              d="M 16 32 C 14 55, 16 68, 23 72 C 24 55, 20 38, 20 32 Z"
              fill={hairColor}
            />
            <path
              d="M 54 32 C 56 55, 54 68, 47 72 C 46 55, 50 38, 50 32 Z"
              fill={hairColor}
            />
            {/* Top crown hair */}
            <path
              d="M 17 32 C 17 12, 53 12, 53 32 C 51 24, 44 19, 35 19 C 26 19, 19 24, 17 32 Z"
              fill={hairColor}
            />
            {/* Silky gloss arc */}
            <path
              d="M 23 20 C 28 17, 42 17, 47 20"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Gentle side bangs */}
            <path
              d="M 19 29 Q 27 23 35 26 Q 43 23 51 29 Q 43 24 35 25 Q 27 24 19 29 Z"
              fill={hairColor}
            />
          </g>
        );

      case "curly":
        return (
          <g>
            <circle cx="20" cy="22" r="8.5" fill={hairColor} />
            <circle cx="35" cy="15.5" r="9.5" fill={hairColor} />
            <circle cx="50" cy="22" r="8.5" fill={hairColor} />
            <circle cx="15.5" cy="32" r="7.5" fill={hairColor} />
            <circle cx="54.5" cy="32" r="7.5" fill={hairColor} />
            <circle cx="18" cy="42" r="6.5" fill={hairColor} />
            <circle cx="52" cy="42" r="6.5" fill={hairColor} />
            {/* Curl highlight reflections */}
            <path
              d="M 32 14 Q 35 12 38 14"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 18 20 Q 21 18 24 20"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 46 20 Q 49 18 52 20"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        );

      case "bob":
        return (
          <g>
            <path
              d="M 16 35 C 16 12, 54 12, 54 35 C 54 47, 50 51, 48 46 C 48 35, 48 24, 35 24 C 22 24, 22 35, 22 46 C 20 51, 16 47, 16 35 Z"
              fill={hairColor}
            />
            {/* Gloss shine */}
            <path
              d="M 23 20 C 28 17, 42 17, 47 20"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        );

      case "ponytail":
        return (
          <g>
            <path
              d="M 18 32 C 18 12, 52 12, 52 32 C 50 22, 20 22, 18 32 Z"
              fill={hairColor}
            />
            {/* Gloss shine */}
            <path
              d="M 24 20 C 28 17, 40 17, 44 20"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
            {/* High perky ponytail */}
            <path
              d="M 46 18 C 56 9, 66 22, 61 39 C 57 31, 53 25, 47 23 Z"
              fill={hairColor}
            />
            <path
              d="M 52 18 C 58 20, 60 27, 58 34"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="48" cy="20" r="3.2" fill="#3B82F6" />
          </g>
        );

      case "afro":
        return (
          <g>
            <ellipse cx="35" cy="25" rx="23" ry="21" fill={hairColor} />
            <circle cx="17" cy="26" r="6.5" fill={hairColor} />
            <circle cx="53" cy="26" r="6.5" fill={hairColor} />
            {/* Halo shine */}
            <path
              d="M 24 13 C 29 10, 41 10, 46 13"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        );

      case "short":
      default:
        return (
          <g>
            <path
              d="M 18 32 C 18 14, 52 14, 52 32 C 50 24, 45 21, 35 21 C 25 21, 20 24, 18 32 Z"
              fill={hairColor}
            />
            {/* Layered stylish fringe */}
            <polygon points="24,23 27,29 30,23" fill={hairColor} />
            <polygon points="31,23 35,30 39,23" fill={hairColor} />
            <polygon points="40,23 43,29 46,23" fill={hairColor} />
            {/* Gloss highlight */}
            <path
              d="M 24 19 C 28 16, 42 16, 46 19"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        );
    }
  };

  // Render Outfit (torso & clothes)
  const renderOutfit = () => {
    switch (outfitId) {
      case "scientist":
        return (
          <g>
            {/* White lab coat */}
            <path d="M 21 50 L 49 50 L 52 72 L 18 72 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
            {/* Teal shirt underneath */}
            <path d="M 30 50 L 35 60 L 40 50 Z" fill="#0EA5E9" />
            <line x1="35" y1="60" x2="35" y2="72" stroke="#CBD5E1" strokeWidth="1.5" />
            {/* Pocket with pen & cute flask */}
            <rect x="22" y="61" width="8" height="7" rx="1.5" fill="#E2E8F0" />
            <line x1="25" y1="58" x2="25" y2="62" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="28" cy="64" r="1.5" fill="#10B981" />
          </g>
        );

      case "princess":
        return (
          <g>
            {/* Sparkling lavender dress */}
            <path d="M 23 50 L 47 50 L 56 75 L 14 75 Z" fill="#C084FC" />
            {/* Golden belt & star buckle */}
            <path d="M 22 57 Q 35 61 48 57" stroke="#FDE047" strokeWidth="2.5" fill="none" />
            <circle cx="35" cy="59" r="2.5" fill="#FACC15" />
            {/* Starlight glimmers */}
            <circle cx="25" cy="67" r="1.5" fill="#FFFFFF" opacity="0.9" />
            <circle cx="45" cy="67" r="1.5" fill="#FFFFFF" opacity="0.9" />
            <circle cx="35" cy="71" r="1.2" fill="#FFFFFF" opacity="0.8" />
          </g>
        );

      case "explorer":
        return (
          <g>
            {/* Khaki explorer vest */}
            <path d="M 21 50 L 49 50 L 50 72 L 20 72 Z" fill="#D97706" />
            <path d="M 28 50 L 35 60 L 42 50 Z" fill="#FEF08A" />
            {/* Pockets with brass buttons */}
            <rect x="22" y="60" width="8" height="7" rx="1.5" fill="#B45309" />
            <rect x="40" y="60" width="8" height="7" rx="1.5" fill="#B45309" />
            <circle cx="26" cy="63" r="1" fill="#FDE047" />
            <circle cx="44" cy="63" r="1" fill="#FDE047" />
          </g>
        );

      case "artist":
        return (
          <g>
            {/* Blue painter dungarees */}
            <path d="M 21 50 L 49 50 L 50 72 L 20 72 Z" fill="#3B82F6" />
            <path d="M 24 50 L 29 60 L 41 60 L 46 50 Z" fill="#EF4444" />
            {/* Paint splotches */}
            <circle cx="27" cy="65" r="2" fill="#FACC15" />
            <circle cx="43" cy="63" r="2" fill="#10B981" />
            <circle cx="35" cy="68" r="1.6" fill="#EC4899" />
          </g>
        );

      case "wizard":
        return (
          <g>
            {/* Purple cosmic robe */}
            <path d="M 21 50 L 49 50 L 54 76 L 16 76 Z" fill="#6366F1" />
            <path d="M 33 50 L 35 76 L 37 50 Z" fill="#FACC15" />
            <polygon points="26,61 28,65 24,65" fill="#FDE047" />
            <polygon points="44,63 46,67 42,67" fill="#FDE047" />
          </g>
        );

      case "starter":
      default:
        return (
          <g>
            {/* Cheerful tee & denim overalls */}
            <path d="M 21 50 L 49 50 L 49 72 L 21 72 Z" fill="#FBBF24" />
            <path d="M 24 55 L 46 55 L 48 72 L 22 72 Z" fill="#0284C7" />
            {/* Overalls straps */}
            <rect x="25" y="50" width="4" height="12" fill="#0369A1" rx="1.5" />
            <rect x="41" y="50" width="4" height="12" fill="#0369A1" rx="1.5" />
            <circle cx="27" cy="59" r="1.2" fill="#F1F5F9" />
            <circle cx="43" cy="59" r="1.2" fill="#F1F5F9" />
            {/* Center pocket */}
            <rect x="31" y="62" width="8" height="6" rx="1" fill="#0369A1" />
          </g>
        );
    }
  };

  // Render Accessory on Head
  const renderAccessory = () => {
    switch (accessoryId) {
      case "glasses":
        return (
          <g>
            <circle cx="28" cy="36" r="5.2" stroke="#1E293B" strokeWidth="1.8" fill="rgba(255,255,255,0.3)" />
            <circle cx="42" cy="36" r="5.2" stroke="#1E293B" strokeWidth="1.8" fill="rgba(255,255,255,0.3)" />
            <line x1="33.2" y1="36" x2="36.8" y2="36" stroke="#1E293B" strokeWidth="1.8" />
          </g>
        );

      case "ribbon":
        return (
          <g>
            <ellipse cx="45" cy="18" rx="4.5" ry="3.2" fill="#F43F5E" transform="rotate(-20 45 18)" />
            <ellipse cx="51" cy="18" rx="4.5" ry="3.2" fill="#F43F5E" transform="rotate(20 51 18)" />
            <circle cx="48" cy="18" r="2.8" fill="#BE123C" />
          </g>
        );

      case "cap":
        return (
          <g>
            <path d="M 17 25 C 17 13 53 13 53 25 Z" fill="#EF4444" />
            <path d="M 15 25 Q 35 22 59 25 Q 61 28 50 28 Q 35 26 15 25 Z" fill="#DC2626" />
          </g>
        );

      case "crown":
        return (
          <g>
            <polygon points="23,17 27,24 35,15 43,24 47,17 48,25 22,25" fill="#FACC15" stroke="#CA8A04" strokeWidth="1" />
            <circle cx="35" cy="19" r="1.6" fill="#EF4444" />
            <circle cx="26" cy="22" r="1.2" fill="#3B82F6" />
            <circle cx="44" cy="22" r="1.2" fill="#10B981" />
          </g>
        );

      case "headphones":
        return (
          <g>
            <path d="M 15 35 A 20 20 0 0 1 55 35" stroke="#6366F1" strokeWidth="3" fill="none" />
            <rect x="12" y="31" width="5.5" height="11" rx="2.5" fill="#4F46E5" />
            <rect x="52.5" y="31" width="5.5" height="11" rx="2.5" fill="#4F46E5" />
          </g>
        );

      default:
        return null;
    }
  };

  // Render Pet following the avatar (ONLY if petId is set by buying in shop)
  const renderPet = () => {
    if (!petId) return null;

    const petEmojis: Record<string, string> = {
      cat: "🐱",
      dog: "🐶",
      bunny: "🐰",
      owl: "🦉",
      fox: "🦊",
      panda: "🐼",
    };

    return (
      <div
        className={`absolute bottom-0 ${
          direction === "right" ? "-left-6" : "-right-6"
        } select-none transition-transform ${
          isWalking ? "animate-bounce" : "animate-pulse"
        }`}
        style={{ fontSize: "1.4rem" }}
        title="Seu pet companheiro comprado na loja"
      >
        <span>{petEmojis[petId] || "🐾"}</span>
      </div>
    );
  };

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none ${className}`}
      style={{
        transform: `scale(${scale}) ${direction === "left" ? "scaleX(-1)" : ""}`,
        transition: "transform 0.15s ease",
      }}
    >
      {/* Floating Name & Level Badge */}
      {showNameTag && (
        <div
          className="mb-1 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-sm border-2 border-amber-300 shadow-md flex items-center gap-1.5 whitespace-nowrap pointer-events-none"
          style={{ transform: direction === "left" ? "scaleX(-1)" : "none" }}
        >
          <span className="text-[11px] font-black text-slate-800">{studentName}</span>
          <span className="text-[9px] font-black bg-amber-400 text-amber-950 px-1.5 py-0.2 rounded-full">
            Nv.{level}
          </span>
        </div>
      )}

      {/* Vector Avatar Body */}
      <div className="relative">
        <svg
          viewBox="0 0 70 95"
          className={`w-16 h-22 sm:w-20 sm:h-28 drop-shadow-md overflow-visible ${
            isWalking ? "animate-wiggle" : ""
          }`}
        >
          <defs>
            <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Ground shadow */}
          <ellipse cx="35" cy="90" rx="18" ry="4" fill="rgba(0,0,0,0.18)" />

          {/* Animated Walking Legs & Sneakers */}
          <g className={isWalking ? "animate-walk-cycle" : ""}>
            {/* Left Leg */}
            <rect
              x="25.5"
              y="70"
              width="7"
              height="16"
              rx="3.5"
              fill={skinTone}
            />
            {/* Left Shoe (Cute Sneaker with White Sole) */}
            <ellipse cx="28.5" cy="87.5" rx="5.5" ry="3.5" fill="#E11D48" />
            <path d="M 23 88 Q 28.5 90 34 88" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" fill="none" />

            {/* Right Leg */}
            <rect
              x="37.5"
              y="70"
              width="7"
              height="16"
              rx="3.5"
              fill={skinTone}
            />
            {/* Right Shoe (Cute Sneaker with White Sole) */}
            <ellipse cx="41.5" cy="87.5" rx="5.5" ry="3.5" fill="#E11D48" />
            <path d="M 36 88 Q 41.5 90 47 88" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          </g>

          {/* Torso & Clothes */}
          {renderOutfit()}

          {/* Neck */}
          <rect x="31" y="44" width="8" height="8" rx="2" fill={skinTone} />

          {/* Cute Chibi Head Shape (Tapered sweet jawline, soft cheeks, NOT a plain circle) */}
          <path
            d="M 19 28 C 19 14, 51 14, 51 28 C 51 37, 49 46, 42 49 C 38 50.8, 32 50.8, 28 49 C 21 46, 19 37, 19 28 Z"
            fill={skinTone}
            filter="url(#shadow)"
          />

          {/* Delicate Ears */}
          <path d="M 18.5 32 C 16 32, 16 38, 18.5 38 Z" fill={skinTone} />
          <path d="M 51.5 32 C 54 32, 54 38, 51.5 38 Z" fill={skinTone} />

          {/* Cheeks / Freckles: ONLY rendered if user selected them! */}
          {blushStyle === "soft" && (
            <g>
              <ellipse cx="23.5" cy="40" rx="3.2" ry="1.6" fill="#FB7185" opacity="0.32" />
              <ellipse cx="46.5" cy="40" rx="3.2" ry="1.6" fill="#FB7185" opacity="0.32" />
            </g>
          )}

          {blushStyle === "freckles" && (
            <g opacity="0.5">
              <circle cx="22" cy="39" r="0.6" fill="#B45309" />
              <circle cx="24" cy="40.5" r="0.6" fill="#B45309" />
              <circle cx="25.5" cy="39" r="0.6" fill="#B45309" />
              <circle cx="44.5" cy="39" r="0.6" fill="#B45309" />
              <circle cx="46" cy="40.5" r="0.6" fill="#B45309" />
              <circle cx="48" cy="39" r="0.6" fill="#B45309" />
            </g>
          )}

          {/* Eyebrows (soft and expressive) */}
          <g>
            <path
              d="M 24.5 28.5 Q 28 27 31.5 28.5"
              stroke={hairColor}
              strokeWidth="1.3"
              strokeLinecap="round"
              opacity="0.8"
              fill="none"
            />
            <path
              d="M 38.5 28.5 Q 42 27 45.5 28.5"
              stroke={hairColor}
              strokeWidth="1.3"
              strokeLinecap="round"
              opacity="0.8"
              fill="none"
            />
          </g>

          {/* Big Sparkling Anime/Avatar World Eyes */}
          <g>
            {/* Left Eye */}
            <ellipse cx="28" cy="35.5" rx="3.4" ry="4.4" fill={eyeColor} />
            <ellipse cx="28" cy="36.5" rx="2.2" ry="2.7" fill="#000000" opacity="0.45" />
            {/* Left Eye Highlights */}
            <circle cx="27" cy="33.8" r="1.4" fill="#FFFFFF" />
            <circle cx="29.6" cy="37.5" r="0.75" fill="#FFFFFF" opacity="0.9" />

            {/* Right Eye */}
            <ellipse cx="42" cy="35.5" rx="3.4" ry="4.4" fill={eyeColor} />
            <ellipse cx="42" cy="36.5" rx="2.2" ry="2.7" fill="#000000" opacity="0.45" />
            {/* Right Eye Highlights */}
            <circle cx="41" cy="33.8" r="1.4" fill="#FFFFFF" />
            <circle cx="43.6" cy="37.5" r="0.75" fill="#FFFFFF" opacity="0.9" />

            {/* Feminine Eyelash flick for girls */}
            {gender === "girl" && (
              <>
                <path
                  d="M 23.5 33.5 Q 28 30.5 32.5 33.5"
                  stroke="#0F172A"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M 31.5 32 L 33.5 30.2"
                  stroke="#0F172A"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <path
                  d="M 37.5 33.5 Q 42 30.5 46.5 33.5"
                  stroke="#0F172A"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M 44.5 32 L 42.5 30.2"
                  stroke="#0F172A"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </>
            )}
          </g>

          {/* Delicate Smile */}
          <path
            d="M 32 42.5 Q 35 45.5 38 42.5"
            stroke="#991B1B"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="#FDA4AF"
          />

          {/* Hair */}
          {renderHair()}

          {/* Accessory */}
          {renderAccessory()}

          {/* Cute Little Hands */}
          <circle cx="17.5" cy="62" r="3.4" fill={skinTone} />
          <circle cx="52.5" cy="62" r="3.4" fill={skinTone} />
        </svg>

        {/* Follower Pet (only if purchased) */}
        {renderPet()}
      </div>
    </div>
  );
}
