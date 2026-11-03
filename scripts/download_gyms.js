const https = require('https');
const fs = require('fs');

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    });
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve, reject);
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
      file.on('error', reject);
    });
  });
}

async function run() {
  const gyms = [
    { wiki: 'https://archives.bulbagarden.net/wiki/File:Pewter_Gym_FRLG.png', dest: 'public/assets/rpg/gym_pewter.png' },
    { wiki: 'https://archives.bulbagarden.net/wiki/File:Celadon_Gym_FRLG.png', dest: 'public/assets/rpg/gym_celadon.png' },
    { wiki: 'https://archives.bulbagarden.net/wiki/File:Vermilion_Gym_FRLG.png', dest: 'public/assets/rpg/gym_vermilion.png' }
  ];

  for (const g of gyms) {
    try {
      const html = await fetchPage(g.wiki);
      const m = html.match(/https:\/\/archives\.bulbagarden\.net\/media\/upload\/[^"']+/);
      if (m) {
        console.log('Downloading:', g.dest, 'from', m[0]);
        await downloadFile(m[0], g.dest);
        console.log('Saved:', g.dest);
      } else {
        console.log('Not found for', g.wiki);
      }
    } catch (err) {
      console.error('Error downloading', g.wiki, err);
    }
  }
}

run();
