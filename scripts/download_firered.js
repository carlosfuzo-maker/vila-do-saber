import fs from 'fs';
import path from 'path';
import https from 'https';

const dirs = [
  'public/assets/rpg/tiles',
  'public/assets/rpg/characters',
  'public/assets/rpg/battle',
  'public/assets/rpg/items'
];

for (const d of dirs) {
  fs.mkdirSync(d, { recursive: true });
}

const FILES = [
  // Tilesets & Buildings (Official FireRed)
  ['public/assets/rpg/tiles/outdoor.png', 'https://raw.githubusercontent.com/blackscythe123/FireRed-RPG/main/assets/overworld/outdoor.png'],
  ['public/assets/rpg/tiles/flowers.png', 'https://raw.githubusercontent.com/blackscythe123/FireRed-RPG/main/assets/overworld/flowers.png'],
  ['public/assets/rpg/tiles/ground.png', 'https://raw.githubusercontent.com/blackscythe123/FireRed-RPG/main/assets/overworld/ground.png'],
  ['public/assets/rpg/tiles/house.png', 'https://raw.githubusercontent.com/blackscythe123/FireRed-RPG/main/assets/overworld/house.png'],
  ['public/assets/rpg/tiles/center.png', 'https://raw.githubusercontent.com/blackscythe123/FireRed-RPG/main/assets/overworld/center.png'],
  ['public/assets/rpg/tiles/mart.png', 'https://raw.githubusercontent.com/blackscythe123/FireRed-RPG/main/assets/overworld/mart.png'],

  // Battle Arena Grass Base
  ['public/assets/rpg/battle/back_grass.png', 'https://raw.githubusercontent.com/blackscythe123/FireRed-RPG/main/assets/battle/back_grass.png'],

  // Character Spritesheets (4 directions x 4 walk frames)
  ['public/assets/rpg/characters/player.png', 'https://raw.githubusercontent.com/blackscythe123/FireRed-RPG/main/assets/characters/player.png'],
  ['public/assets/rpg/characters/parent.png', 'https://raw.githubusercontent.com/blackscythe123/FireRed-RPG/main/assets/characters/parent.png'],
  ['public/assets/rpg/characters/prof.png', 'https://raw.githubusercontent.com/blackscythe123/FireRed-RPG/main/assets/characters/prof.png'],
  ['public/assets/rpg/characters/rival.png', 'https://raw.githubusercontent.com/blackscythe123/FireRed-RPG/main/assets/characters/rival.png'],
  ['public/assets/rpg/characters/clerk.png', 'https://raw.githubusercontent.com/blackscythe123/FireRed-RPG/main/assets/characters/clerk.png'],
  ['public/assets/rpg/characters/nurse.png', 'https://raw.githubusercontent.com/blackscythe123/FireRed-RPG/main/assets/characters/nurse.png'],
  ['public/assets/rpg/characters/scout.png', 'https://raw.githubusercontent.com/blackscythe123/FireRed-RPG/main/assets/characters/scout.png'],
  ['public/assets/rpg/characters/picnic.png', 'https://raw.githubusercontent.com/blackscythe123/FireRed-RPG/main/assets/characters/picnic.png'],
  ['public/assets/rpg/characters/villager.png', 'https://raw.githubusercontent.com/blackscythe123/FireRed-RPG/main/assets/characters/villager.png'],
  ['public/assets/rpg/characters/villager2.png', 'https://raw.githubusercontent.com/blackscythe123/FireRed-RPG/main/assets/characters/villager2.png'],

  // Items
  ['public/assets/rpg/items/poke-ball.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'],
  ['public/assets/rpg/items/great-ball.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png'],
  ['public/assets/rpg/items/potion.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/potion.png'],
  ['public/assets/rpg/items/super-potion.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/super-potion.png'],
  ['public/assets/rpg/items/antidote.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/antidote.png'],
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, dest).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function run() {
  console.log('Downloading official Pokémon FireRed assets...');
  for (const [dest, url] of FILES) {
    try {
      await download(url, dest);
      const stats = fs.statSync(dest);
      console.log(`✓ Downloaded ${dest} (${stats.size} bytes)`);
    } catch (err) {
      console.error(`✗ Error downloading ${dest}:`, err.message);
    }
  }
  console.log('Finished downloading assets.');
}

run();
