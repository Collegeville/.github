#!/usr/bin/env node
// Checks that the profile README lists every live and in-progress game in the website catalog.
//   node scripts/check-profile.js [path or URL of games.yml]
// By default it reads the live catalog from the collegeville.github.io repo on GitHub, so the
// profile and the Games page cannot drift apart unnoticed. Needs Node 20 or later, no installs.
'use strict';
const { readFileSync } = require('node:fs');
const { join } = require('node:path');

const DEFAULT = 'https://raw.githubusercontent.com/Collegeville/collegeville.github.io/main/_data/games.yml';
const SITE = 'https://collegeville.github.io';

// Just enough YAML for the catalog: a list of entries whose fields are `key: value` lines.
function parseCatalog(text) {
  const games = [];
  for (const line of text.split('\n')) {
    const m = /^(-\s+|\s+)([a-z_]+):\s*(.*)$/.exec(line);
    if (!m) continue;
    if (m[1].startsWith('-')) games.push({});
    if (games.length) games[games.length - 1][m[2]] = m[3].replace(/^"(.*)"$/, '$1').trim();
  }
  return games;
}

function missingFrom(readme, games) {
  return games
    .filter((g) => g.status === 'live' || g.status === 'in-progress')
    .filter((g) => !readme.includes(`[${g.name}](${g.url.startsWith('/') ? SITE + g.url : g.url})`));
}

async function main() {
  const source = process.argv[2] ?? DEFAULT;
  const text = /^https?:/.test(source) ? await (await fetch(source)).text() : readFileSync(source, 'utf8');
  const games = parseCatalog(text);
  if (!games.length) throw new Error(`No games found in ${source}`);
  const readme = readFileSync(join(__dirname, '..', 'profile', 'README.md'), 'utf8');
  const missing = missingFrom(readme, games);
  if (missing.length) {
    console.error(`The profile README is missing: ${missing.map((g) => g.name).join(', ')}. Add a row for each to the table in profile/README.md, linking to ${SITE}<url>.`);
    process.exit(1);
  }
  console.log(`Profile README lists all ${games.filter((g) => g.status !== 'planned').length} live and in-progress games.`);
}

module.exports = { parseCatalog, missingFrom };
if (require.main === module) main().catch((e) => { console.error(e.message); process.exit(1); });
