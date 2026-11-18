const CACHE_NAME = "vila-do-saber-rpg-v4";
const SPRITE_CACHE_NAME = "vila-pokemon-sprites-v2";
const PRECACHE_URLS = [
  "/rpg",
  "/manifest.json",
  "/icon.svg",
  "/icon-192.png",
  "/icon-512.png",
  "/apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS).catch(() => {});
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) => {
            if (key !== CACHE_NAME && key !== SPRITE_CACHE_NAME) {
              return caches.delete(key);
            }
          })
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Skip dynamic API and sync endpoints
  if (url.pathname.startsWith("/api/")) return;

  // 1. POKÉMON SPRITES & IMAGES: Cache-First strategy with automatic offline storage
  const isPokemonImage =
    url.hostname.includes("raw.githubusercontent.com") ||
    url.hostname.includes("pokeapi.co") ||
    url.hostname.includes("assets.pokemon.com") ||
    url.pathname.includes("/pokemon/") ||
    url.pathname.startsWith("/assets/rpg/battle/") ||
    url.pathname.startsWith("/assets/rpg/items/") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".gif") ||
    url.pathname.endsWith(".svg");

  if (isPokemonImage) {
    event.respondWith(
      caches.open(SPRITE_CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(req);
        if (cached) {
          return cached;
        }

        try {
          const networkRes = await fetch(req);
          if (networkRes && (networkRes.status === 200 || networkRes.type === "opaque")) {
            cache.put(req, networkRes.clone());
          }
          return networkRes;
        } catch {
          // If network failed and nothing cached, return fallback if available
          return cached || new Response("", { status: 408, statusText: "Offline" });
        }
      })
    );
    return;
  }

  // 2. CORE APP & STATIC ASSETS: Network-first with cache fallback
  event.respondWith(
    fetch(req)
      .then((networkRes) => {
        if (networkRes && networkRes.status === 200 && networkRes.type === "basic") {
          const copy = networkRes.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        }
        return networkRes;
      })
      .catch(() => caches.match(req))
  );
});
