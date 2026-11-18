"use client";

import React, { useState, useEffect } from "react";
import { getPokemonFallbackChain } from "@/app/rpg/data/kantoPokedex";

interface PokemonImageProps {
  pokedexId: number;
  name: string;
  emoji?: string;
  className?: string;
  containerClassName?: string;
  priorityUrl?: string;
  alt?: string;
}

export function PokemonImage({
  pokedexId,
  name,
  emoji = "🐾",
  className = "w-full h-full object-contain",
  containerClassName = "relative flex items-center justify-center",
  priorityUrl,
  alt,
}: PokemonImageProps) {
  const [sources, setSources] = useState<string[]>(() => {
    const chain = getPokemonFallbackChain(pokedexId);
    return priorityUrl ? [priorityUrl, ...chain.filter((u) => u !== priorityUrl)] : chain;
  });
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [hasFailedAll, setHasFailedAll] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Reset when pokedexId or priorityUrl changes
  useEffect(() => {
    const chain = getPokemonFallbackChain(pokedexId);
    setSources(priorityUrl ? [priorityUrl, ...chain.filter((u) => u !== priorityUrl)] : chain);
    setCurrentIndex(0);
    setHasFailedAll(false);
    setIsLoading(true);
  }, [pokedexId, priorityUrl]);

  const handleImageError = () => {
    if (currentIndex < sources.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setHasFailedAll(true);
      setIsLoading(false);
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  if (hasFailedAll || sources.length === 0) {
    return (
      <div className={containerClassName}>
        <div className="flex flex-col items-center justify-center text-center p-2">
          <span className="text-5xl sm:text-6xl filter drop-shadow select-none animate-pulse">
            {emoji}
          </span>
          <span className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-wider">
            {name}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClassName}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-4xl filter blur-[1px] opacity-40 animate-pulse">{emoji}</span>
        </div>
      )}
      <img
        key={`${pokedexId}-${currentIndex}`}
        src={sources[currentIndex]}
        alt={alt || name}
        className={`${className} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-200`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        loading="eager"
        decoding="async"
      />
    </div>
  );
}
