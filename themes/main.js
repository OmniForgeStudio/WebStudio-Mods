// Theme Pack: a WebStudio mod (WebStudio 1.2.1+ for the Settings row; older versions get a command).
// Colours, fonts, artwork and animations live in style.css under html[data-wsm-theme="..."].
// This file adds Settings → Appearance → Themes, draws the pixel-art icons, swaps icons,
// recolours the code editor (background AND syntax) and restores everything when turned off.

const THEMES = {
  default:   { label: 'Default (WebStudio)' },
  pixelated: { label: 'Pixelated', editorFont: "'WSM VT323', monospace", editorSize: 18, keepColors: true },
  ocean: { label: 'Ocean', editorFont: "'Fira Code', monospace", base: 'vs-dark',
    icons: { actExplorerBtn: 'fa-solid fa-anchor', actAssetsBtn: 'fa-solid fa-fish', actPaletteBtn: 'fa-solid fa-droplet', actPlaygroundBtn: 'fa-solid fa-water', actGitBtn: 'fa-solid fa-ship', actHistoryBtn: 'fa-solid fa-compass', actModsBtn: 'fa-solid fa-life-ring' },
    editor: { bg: '#071a2c', fg: '#d6f1ff', line: '#0c2740', sel: '#0f4c75', cursor: '#2dd4bf', gutter: '#3b6e8f', widget: '#0a2238' },
    tokens: { comment: '4f7f9c', keyword: '38bdf8', string: '5eead4', number: 'fbbf24', tag: '22d3ee', attr: '93c5fd', attrValue: '6ee7b7', type: 'a5b4fc', delimiter: '7dd3fc' } },
  hell: { label: 'Hell', editorFont: "'Source Code Pro', monospace", base: 'vs-dark',
    icons: { actExplorerBtn: 'fa-solid fa-skull', actAssetsBtn: 'fa-solid fa-dragon', actPaletteBtn: 'fa-solid fa-fire-flame-curved', actPlaygroundBtn: 'fa-solid fa-fire', actGitBtn: 'fa-solid fa-khanda', actHistoryBtn: 'fa-solid fa-hourglass-half', actModsBtn: 'fa-solid fa-dungeon' },
    editor: { bg: '#120607', fg: '#ffd9cc', line: '#1f0b0c', sel: '#5c1414', cursor: '#ff4d1a', gutter: '#7a3a2e', widget: '#1a0809' },
    tokens: { comment: '7a4a40', keyword: 'ff4d1a', string: 'fbbf24', number: 'fb923c', tag: 'ef4444', attr: 'fdba74', attrValue: 'fde047', type: 'f97316', delimiter: 'b45309' } },
  ultradark: { label: 'Ultra Dark', editorFont: "'JetBrains Mono', monospace", base: 'vs-dark',
    icons: { actExplorerBtn: 'fa-regular fa-folder', actAssetsBtn: 'fa-regular fa-image', actPaletteBtn: 'fa-solid fa-circle-half-stroke', actPlaygroundBtn: 'fa-regular fa-moon', actHistoryBtn: 'fa-regular fa-clock', actModsBtn: 'fa-regular fa-star' },
    editor: { bg: '#000000', fg: '#c8c8c8', line: '#0a0a0a', sel: '#262626', cursor: '#a78bfa', gutter: '#3a3a3a', widget: '#070707' },
    tokens: { comment: '4a4a4a', keyword: 'a78bfa', string: 'a3a3a3', number: 'c4b5fd', tag: '8b5cf6', attr: '9ca3af', attrValue: 'd4d4d4', type: 'c4b5fd', delimiter: '525252' } },
  enlighten: { label: 'Enlighten', editorFont: "'Source Code Pro', monospace", base: 'vs',
    icons: { actExplorerBtn: 'fa-solid fa-book-open', actAssetsBtn: 'fa-solid fa-feather', actPaletteBtn: 'fa-solid fa-sun', actPlaygroundBtn: 'fa-solid fa-dove', actGitBtn: 'fa-solid fa-scroll', actHistoryBtn: 'fa-solid fa-hourglass-start', actModsBtn: 'fa-solid fa-star' },
    editor: { bg: '#fffdf6', fg: '#3b3221', line: '#f8f1df', sel: '#f3dfa8', cursor: '#c99512', gutter: '#b9a77d', widget: '#fffaf0' },
    tokens: { comment: 'a8977a', keyword: 'b45309', string: '4d7c0f', number: 'c2410c', tag: '9a3412', attr: 'a16207', attrValue: '15803d', type: '7c2d12', delimiter: '92805c' } },
  jungle: { label: 'Jungle', editorFont: "'Fira Code', monospace", base: 'vs-dark',
    icons: { actExplorerBtn: 'fa-solid fa-tree', actAssetsBtn: 'fa-solid fa-frog', actPaletteBtn: 'fa-solid fa-leaf', actPlaygroundBtn: 'fa-solid fa-seedling', actGitBtn: 'fa-solid fa-paw', actHistoryBtn: 'fa-solid fa-sun', actModsBtn: 'fa-solid fa-mountain-sun' },
    editor: { bg: '#0b1a0f', fg: '#dcf5d2', line: '#11261a', sel: '#1f4a2c', cursor: '#a3e635', gutter: '#4f7a52', widget: '#0f2216' },
    tokens: { comment: '557a55', keyword: 'a3e635', string: 'fde68a', number: 'fb923c', tag: '4ade80', attr: 'bef264', attrValue: 'fcd34d', type: '86efac', delimiter: '65a30d' } },
  candy: { label: 'Candy World', editorFont: "'Fira Code', monospace", base: 'vs',
    icons: { actExplorerBtn: 'fa-solid fa-ice-cream', actAssetsBtn: 'fa-solid fa-candy-cane', actPaletteBtn: 'fa-solid fa-palette', actPlaygroundBtn: 'fa-solid fa-cake-candles', actGitBtn: 'fa-solid fa-heart', actHistoryBtn: 'fa-solid fa-cookie-bite', actModsBtn: 'fa-solid fa-gift' },
    editor: { bg: '#fff5fb', fg: '#5b2a4c', line: '#ffe8f5', sel: '#fbcfe8', cursor: '#ec4899', gutter: '#e3a3c8', widget: '#fff0f8' },
    tokens: { comment: 'd4a5c4', keyword: 'db2777', string: '0d9488', number: '8b5cf6', tag: 'c026d3', attr: 'f97316', attrValue: '0891b2', type: '7c3aed', delimiter: 'e879b9' } },
  hacker: { label: 'Hacker', editorFont: "'WSM VT323', 'JetBrains Mono', monospace", editorSize: 17, base: 'vs-dark',
    icons: { actExplorerBtn: 'fa-solid fa-terminal', actAssetsBtn: 'fa-solid fa-microchip', actPaletteBtn: 'fa-solid fa-user-secret', actPlaygroundBtn: 'fa-solid fa-bug', actGitBtn: 'fa-solid fa-network-wired', actHistoryBtn: 'fa-solid fa-hard-drive', actModsBtn: 'fa-solid fa-skull-crossbones' },
    editor: { bg: '#020a03', fg: '#39ff6a', line: '#06170a', sel: '#0f3d19', cursor: '#39ff6a', gutter: '#1d6b2f', widget: '#031006' },
    tokens: { comment: '1f7a35', keyword: '7dff9b', string: 'b6ffc6', number: 'd4ff3a', tag: '39ff6a', attr: '8affaa', attrValue: 'c8ffd4', type: '5cff85', delimiter: '2fbf52' } },
  synthwave: { label: 'Synthwave', editorFont: "'Fira Code', monospace", base: 'vs-dark',
    icons: { actExplorerBtn: 'fa-solid fa-compact-disc', actAssetsBtn: 'fa-solid fa-camera-retro', actPaletteBtn: 'fa-solid fa-sun', actPlaygroundBtn: 'fa-solid fa-gamepad', actGitBtn: 'fa-solid fa-car', actHistoryBtn: 'fa-solid fa-radio', actModsBtn: 'fa-solid fa-headphones' },
    editor: { bg: '#1a0b2e', fg: '#f6e7ff', line: '#241040', sel: '#4c1d6e', cursor: '#ff3ec8', gutter: '#7d5ba6', widget: '#1f0d37' },
    tokens: { comment: '7d5ba6', keyword: 'ff3ec8', string: 'fdf06f', number: 'ff8b3d', tag: '36f9f6', attr: 'fe4450', attrValue: '72f1b8', type: 'b893ff', delimiter: 'c792ea' } }
};

// ── pixel-art icons for Pixelated (8×8, '#' = filled). Drawn as masks in the icon's own colour,
// so they follow Dark/Light. Unlisted icons keep their normal (sharp) look.
const PIXEL_ICONS = {
  'fa-copy':        ['..#####.', '..#...#.', '#####.#.', '#...#.#.', '#...#.#.', '#...###.', '#...#...', '#####...'],
  'fa-magnifying-glass': ['.####...', '#....#..', '#....#..', '#....#..', '.####...', '....##..', '.....##.', '......##'],
  'fa-images':      ['########', '#......#', '#.##...#', '#.##...#', '#....#.#', '#...####', '#..#####', '########'],
  'fa-palette':     ['.######.', '#......#', '#.#..#.#', '#......#', '#.#....#', '#...####', '#..#....', '.##.....'],
  'fa-wand-magic-sparkles': ['.#......', '###...#.', '.#...##.', '....##..', '...##...', '..##..#.', '.##..###', '##....#.'],
  'fa-code-branch': ['.#...#..', '###.###.', '.#...#..', '.#..#...', '.#.#....', '.##.....', '###.....', '.#......'],
  'fa-clock-rotate-left': ['..####..', '.#....#.', '#..#...#', '#..#...#', '#..###.#', '#......#', '.#....#.', '..####..'],
  'fa-puzzle-piece': ['..##....', '######..', '#....##.', '#....##.', '#....#..', '#.##.#..', '######..', '........'],
  'fa-gear':        ['...##...', '.#.##.#.', '..####..', '###..###', '###..###', '..####..', '.#.##.#.', '...##...'],
  'fa-folder':      ['........', '###.....', '#..#####', '#......#', '#......#', '#......#', '########', '........'],
  'fa-folder-open': ['........', '###.....', '#..####.', '#.######', '#.#....#', '##....#.', '#######.', '........'],
  'fa-file':        ['.####...', '.#..##..', '.#...##.', '.#....#.', '.#....#.', '.#....#.', '.######.', '........'],
  'fa-xmark':       ['##....##', '.##..##.', '..####..', '...##...', '..####..', '.##..##.', '##....##', '........'],
  'fa-plus':        ['...##...', '...##...', '...##...', '########', '########', '...##...', '...##...', '...##...'],
  'fa-play':        ['.#......', '.##.....', '.###....', '.####...', '.###....', '.##.....', '.#......', '........'],
  'fa-rotate-right': ['..####.#', '.#....##', '#....###', '#.......', '#.......', '#......#', '.#....#.', '..####..'],
  'fa-floppy-disk': ['#######.', '#.###.##', '#.###..#', '#......#', '#.####.#', '#.#..#.#', '#.####.#', '########'],
  'fa-terminal':    ['........', '#.......', '.#......', '..#.....', '.#......', '#...####', '........', '........'],
  'fa-moon':        ['...###..', '..##....', '.##.....', '.##.....', '.##.....', '.##....#', '..##..##', '...####.'],
  'fa-sun':         ['#..#..#.', '.#.#.#..', '..###...', '#######.', '..###...', '.#.#.#..', '#..#..#.', '........'],
  'fa-circle-question': ['..####..', '.#....#.', '#..##..#', '#....#.#', '#...#..#', '#......#', '.#..#.#.', '..####..'],
  'fa-eye':         ['........', '..####..', '.#....#.', '#..##..#', '#..##..#', '.#....#.', '..####..', '........'],
  'fa-trash-can':   ['..####..', '########', '.#....#.', '.#.#.##.', '.#.#.##.', '.#.#.##.', '.#....#.', '.######.']
};
const pixelSvg = rows => {
  let rects = '';
  rows.forEach((r, y) => [...r].forEach((c, x) => { if (c === '#') rects += `<rect x="${x}" y="${y}" width="1" height="1"/>`; }));
  return `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" shape-rendering="crispEdges">${rects}</svg>`)}")`;
};
const P = 'html[data-wsm-theme="pixelated"]';
ws.addStyle(Object.entries(PIXEL_ICONS).map(([cls, rows]) =>
  `${P} i.${cls}::before { content: "" !important; display: inline-block; width: 1em; height: 1em; vertical-align: -0.125em; background: currentColor; -webkit-mask: ${pixelSvg(rows)} center / 100% 100% no-repeat; mask: ${pixelSvg(rows)} center / 100% 100% no-repeat; }`
).join('\n') + `\n${P} .activity-bar i::before { width: 16px !important; height: 16px !important; }`);

const root = document.documentElement;
const originalIcons = new Map();
let current = 'default';

// the user's own editor font and size (Settings → Editor), never a themed one
const userFont = () => { try { const p = state.editorPrefs; return { fontFamily: p.fontFamily, fontSize: p.fontSize }; } catch (e) { return {}; } };
const editors = () => { try { return ws.monaco ? ws.monaco.editor.getEditors() : (ws.editor ? [ws.editor] : []); } catch (e) { return ws.editor ? [ws.editor] : []; } };

function restoreIcons() { for (const [el, cls] of originalIcons) el.className = cls; originalIcons.clear(); }
function swapIcons(map) {
  restoreIcons();
  for (const [id, cls] of Object.entries(map || {})) {
    const i = document.querySelector(`#${id} > i`);
    if (!i) continue;
    originalIcons.set(i, i.className);
    i.className = cls;
  }
}

function applyEditor(t) {
  const own = userFont();
  for (const ed of editors()) {
    if (t.editorFont) ed.updateOptions({ fontFamily: t.editorFont, fontSize: t.editorSize || own.fontSize });
    else ed.updateOptions(own);
  }
  if (!ws.monaco || !t.editor) return;
  const e = t.editor, k = t.tokens || {}, id = 'wsm-' + current;
  const rule = (token, c, style) => c ? [{ token, foreground: c, ...(style ? { fontStyle: style } : {}) }] : [];
  ws.monaco.editor.defineTheme(id, { base: t.base, inherit: true,
    rules: [
      ...rule('comment', k.comment, 'italic'), ...rule('keyword', k.keyword), ...rule('string', k.string), ...rule('number', k.number),
      ...rule('tag', k.tag), ...rule('metatag', k.tag), ...rule('attribute.name', k.attr), ...rule('attribute.value', k.attrValue),
      ...rule('type', k.type), ...rule('delimiter', k.delimiter), ...rule('delimiter.html', k.delimiter),
      ...rule('string.html', k.attrValue), ...rule('attribute.value.css', k.attrValue), ...rule('variable', e.fg.slice(1))
    ],
    colors: {
      'editor.background': e.bg, 'editor.foreground': e.fg, 'editor.lineHighlightBackground': e.line,
      'editor.selectionBackground': e.sel, 'editorCursor.foreground': e.cursor, 'editorLineNumber.foreground': e.gutter,
      'editorLineNumber.activeForeground': e.cursor, 'editorGutter.background': e.bg, 'minimap.background': e.bg,
      'editorWidget.background': e.widget, 'editorSuggestWidget.background': e.widget, 'editorHoverWidget.background': e.widget,
      'editorIndentGuide.background1': e.line, 'editorBracketMatch.border': e.cursor, 'scrollbarSlider.background': e.gutter + '55'
    } });
  ws.monaco.editor.setTheme(id);
}

function apply(name, quiet) {
  const t = THEMES[name] ? name : 'default';
  current = t;
  const th = THEMES[t];
  if (t === 'default') root.removeAttribute('data-wsm-theme'); else root.setAttribute('data-wsm-theme', t);
  swapIcons(th.icons);
  if (t === 'default' || th.keepColors) ws.setTheme(ws.getTheme());   // the app paints its own dark/light editor colours back
  applyEditor(th);
  ws.storage.set('theme', t);
  if (!quiet) ws.toast(t === 'default' ? 'Default theme' : `${th.label} theme`, 'success');
}

if (typeof ws.addSettings !== 'function') ws.toast('Theme Pack needs WebStudio 1.2.1 or newer for its Settings row. Until then use the command "Theme Pack: Next theme".', 'info');
else ws.addSettings({
  section: 'appearance',
  items: [{
    label: 'Themes',
    desc: 'Theme Pack mod: fonts, icons, artwork, animations and editor colours. Pixelated keeps your Dark/Light colours; the others bring their own.',
    type: 'select',
    options: Object.entries(THEMES).map(([v, t]) => [v, t.label]),
    get: () => current,
    set: v => apply(v)
  }]
});
ws.addCommand('Theme Pack: Next theme', () => {
  const names = Object.keys(THEMES);
  apply(names[(names.indexOf(current) + 1) % names.length]);
});

// the app re-applies its own editor theme on Dark/Light changes; colour themes stay in charge
ws.on('themeChange', () => { if (current !== 'default') setTimeout(() => applyEditor(THEMES[current]), 0); });
ws.on('fileOpen', () => { if (current !== 'default') applyEditor(THEMES[current]); });

apply(ws.storage.get('theme') || 'default', true);

module.exports = {
  deactivate() {
    current = 'default';               // so the last themeChange doesn't re-apply a theme
    root.removeAttribute('data-wsm-theme');
    restoreIcons();
    for (const ed of editors()) ed.updateOptions(userFont());
    ws.setTheme(ws.getTheme());
  }
};
