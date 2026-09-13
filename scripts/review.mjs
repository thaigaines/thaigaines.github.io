import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const root = fileURLToPath(new URL('..', import.meta.url));
const html = readFileSync(resolve(root, 'index.html'), 'utf8');
const required = [
  '<main id="main">',
  'id="work"',
  'id="experience"',
  'id="connect"',
  'aria-label="Primary navigation"',
  '<meta name="description"',
];

for (const marker of required) {
  if (!html.includes(marker)) throw new Error(`Missing required page marker: ${marker}`);
}

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
if (duplicateIds.length) throw new Error(`Duplicate ids: ${[...new Set(duplicateIds)].join(', ')}`);

for (const asset of [...html.matchAll(/(?:src|href)="(\.\/[^#"]+)/g)].map((match) => match[1])) {
  if (!existsSync(resolve(root, asset))) throw new Error(`Missing local asset: ${asset}`);
}

const externalLinks = [...html.matchAll(/href="(https?:\/\/[^"#]+)/g)];
if (externalLinks.some(([, href]) => !html.includes(`href="${href}" rel="noopener noreferrer"`))) {
  throw new Error('External links must declare rel="noopener noreferrer".');
}

const localAssets = new Set(
  [...html.matchAll(/(?:src|href)="(\.\/[^#"]+)"/g)].map(([, asset]) => asset.replaceAll('\\', '/')),
);
const imageFiles = readdirSync(resolve(root, 'images'));
const orphanedImages = imageFiles.filter((file) => !localAssets.has(`./images/${file}`));
if (orphanedImages.length) {
  throw new Error(`Orphaned image assets: ${orphanedImages.join(', ')}`);
}

console.log(`Portfolio review passed: ${ids.length} ids, ${externalLinks.length} external links, local assets present.`);
