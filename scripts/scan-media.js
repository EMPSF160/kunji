import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const PHOTO_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.avif']);
const VIDEO_EXTENSIONS = new Set(['.mp4', '.webm', '.mov', '.mkv']);
const MUSIC_EXTENSIONS = new Set(['.mp3', '.m4a', '.m4r', '.wav', '.ogg', '.aac', '.mpeg', '.flac']);

const KNOWN_TRACK_NAMES = {
  'nanum rowdy than song': 'Naanum Rowdy Dhaan (Our Anthem)',
  'theriyamaley tholaigran': 'Theriyamaley Tholaigiren',
  'dhanush': 'Dhanush Nostalgia Melody',
  'dhanush 2': 'Dhanush Melodic Reprise',
  'prtiviraj': 'Prithviraj Gentle Theme',
  'kov': 'Kovai Twilight Melody',
  'sp': 'SP Special Theme',
  'su': 'Sweet Serenade',
  'surya': 'Surya Breeze Melody',
  'vignesh': 'Vignesh Memories Theme',
  'ppppp': 'Echoes of Laughter',
  'pod': 'A Promise of Dawn',
  'ss': 'Soft Whispers',
  'e': 'Eternal Echoes',
  'o': 'Only You'
};

function formatMediaTitle(filename, type, index) {
  const baseName = filename.replace(/\.[^/.]+$/, '').replace(/\.[^/.]+$/, ''); // handles double ext
  const lowerBase = baseName.toLowerCase().trim();

  if (type === 'music') {
    if (KNOWN_TRACK_NAMES[lowerBase]) {
      return KNOWN_TRACK_NAMES[lowerBase];
    }
  }

  const PHOTO_TITLES = [
    "The Chai & Rain Magic",
    "Caught In 4K Being Cute",
    "The Stolen Hoodie Incident",
    "Unapologetic Car Karaoke",
    "The 2 AM Food Debate",
    "The Eye Contact Telepathy",
    "The Cute Angry Pout",
    "Our Long Quiet Walks",
    "Failed Aesthetic Photos",
    "When Your Eyes Light Up",
    "The 'Did You Eat?' Care",
    "Dancing With No Music",
    "Drenched In The Rain",
    "Sleepy Morning Voice",
    "Promises Under Stars",
    "Effortlessly, Beautifully You"
  ];

  if (type === 'photos') {
    return PHOTO_TITLES[index % PHOTO_TITLES.length] || `Cherished Memory #${index + 1}`;
  }

  // If WhatsApp pattern
  if (/^whatsapp\s*(image|video)/i.test(filename)) {
    if (type === 'videos') return `Moment in Motion #${index + 1}`;
  }

  // Clean raw file title
  let clean = baseName
    .replace(/[_\-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!clean || clean.length < 2) {
    if (type === 'videos') return `Moment #${index + 1}`;
    if (type === 'music') return `Melody #${index + 1}`;
  }

  return clean
    .split(' ')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function scanFolder(relativeFolder, allowedExtensions, type) {
  const fullPath = path.join(rootDir, 'public', relativeFolder);
  if (!fs.existsSync(fullPath)) {
    try {
      fs.mkdirSync(fullPath, { recursive: true });
    } catch {
      // ignore
    }
    return [];
  }

  try {
    const files = fs.readdirSync(fullPath);
    return files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return allowedExtensions.has(ext) || allowedExtensions.has(path.extname(file.replace(/\.mpeg$/i, '')).toLowerCase());
      })
      .map((file, index) => {
        const ext = path.extname(file).toLowerCase();
        let mime = undefined;
        if (ext === '.m4r') mime = 'audio/mp4';
        else if (ext === '.mp3' || file.endsWith('.mp3.mpeg')) mime = 'audio/mpeg';
        else if (ext === '.ogg') mime = 'audio/ogg';
        else if (ext === '.wav') mime = 'audio/wav';
        else if (ext === '.mp4') mime = type === 'videos' ? 'video/mp4' : 'audio/mp4';

        return {
          id: `${relativeFolder}-${index + 1}`,
          filename: file,
          src: `/${relativeFolder}/${file}`,
          title: formatMediaTitle(file, type, index),
          extension: ext,
          mime
        };
      });
  } catch (err) {
    console.warn(`Could not read ${relativeFolder}:`, err.message);
    return [];
  }
}

export function generateMediaJson() {
  const photos = scanFolder('photos', PHOTO_EXTENSIONS, 'photos');
  const videos = scanFolder('videos', VIDEO_EXTENSIONS, 'videos');
  const music = scanFolder('music', MUSIC_EXTENSIONS, 'music');

  const mediaData = {
    updatedAt: new Date().toISOString(),
    photos,
    videos,
    music
  };

  const outputPath = path.join(rootDir, 'src', 'media.json');
  fs.writeFileSync(outputPath, JSON.stringify(mediaData, null, 2), 'utf-8');
  console.log(`[scan-media] Discovered ${photos.length} photos, ${videos.length} videos, ${music.length} songs -> saved to src/media.json`);
  return mediaData;
}

if (process.argv[1] && process.argv[1].endsWith('scan-media.js')) {
  generateMediaJson();
}
