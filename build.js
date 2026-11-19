// Builds every mod in this repo into an installable .wsmod file.
//   node build.js            → dist/<mod>.wsmod  (+ dist/<mod>/ as a ready-to-install folder)
// A mod folder has mod.json + main.js; style.css is assembled from fonts.css + themes.css when
// those exist (otherwise an existing style.css is used as is).
const fs = require('fs');
const path = require('path');
const { createZip, readZip } = require('./tools/zip');

const DIST = path.join(__dirname, 'dist');
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

const mods = fs.readdirSync(__dirname).filter(d => fs.existsSync(path.join(__dirname, d, 'mod.json')));
for (const id of mods) {
  const dir = path.join(__dirname, id);
  const manifest = JSON.parse(fs.readFileSync(path.join(dir, 'mod.json'), 'utf8'));
  const main = fs.readFileSync(path.join(dir, manifest.main || 'main.js'), 'utf8');
  new Function('ws', 'module', 'exports', main);                  // syntax check
  const parts = ['fonts.css', 'themes.css'].map(f => path.join(dir, f)).filter(f => fs.existsSync(f));
  let style = parts.length ? parts.map(f => fs.readFileSync(f, 'utf8')).join('\n')
    : (fs.existsSync(path.join(dir, 'style.css')) ? fs.readFileSync(path.join(dir, 'style.css'), 'utf8') : '');
  // url(img:name) → the picture in <mod>/img/name.png (or .jpg), embedded so the mod works offline
  style = style.replace(/url\(img:([\w-]+)\)/g, (m, name) => {
    const f = ['.png', '.jpg'].map(ext => path.join(dir, 'img', name + ext)).find(p => fs.existsSync(p));
    if (!f) throw new Error(`${id}: missing img/${name}.png or .jpg`);
    return `url(data:image/${f.endsWith('.png') ? 'png' : 'jpeg'};base64,${fs.readFileSync(f).toString('base64')})`;
  });
  const files = { 'mod.json': JSON.stringify(manifest, null, 2) + '\n', 'main.js': main };
  if (style) files['style.css'] = style;

  const out = path.join(DIST, id);
  fs.mkdirSync(out, { recursive: true });
  const entries = Object.entries(files).map(([name, text]) => {
    fs.writeFileSync(path.join(out, name), text);
    return { name: `${id}/${name}`, data: Buffer.from(text, 'utf8') };
  });
  const zip = createZip(entries);
  readZip(zip);                                                   // round-trip check
  fs.writeFileSync(path.join(DIST, `${id}.wsmod`), zip);
  console.log(`${id}.wsmod  ${(zip.length / 1024).toFixed(1)} KB  (${manifest.name} ${manifest.version})`);
}
