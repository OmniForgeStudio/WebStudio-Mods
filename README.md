# WebStudio Mods

Free mods for [WebStudio](https://omniforgestudio.com/webstudio), the desktop web IDE by OmniForge Studio.

## Install a mod

1. Download the mod's `.wsmod` file from the [Releases](../../releases/latest) page.
2. In WebStudio open the **Mods** panel (puzzle icon) → **Import a .wsmod pack** → pick the file.

Mods run inside WebStudio with the same access as the app, so only install mods you trust.
Everything here is open source: read the code before you install it.

## Mods

### Theme Pack (`themes/`)

Nine themes, picked in **Settings → Appearance → Themes** (needs WebStudio 1.2.1 or newer):

| Theme | Colours | What changes |
| --- | --- | --- |
| **Pixelated** | follows your Dark / Light setting | pixel font in the app and the editor, pixel-art icons, square corners, 8-bit buttons, drifting pixel clouds |
| **Ocean** | deep sea blue + teal | rounded font, sea icons, waves and rising bubbles in the side bar |
| **Hell** | black-red + fire orange | tall Oswald font, skull / dragon / fire icons, lava line, glowing buttons |
| **Ultra Dark** | true black (great on OLED) | outline icons, hairline borders, nothing else in the way |
| **Enlighten** | warm and bright | Lexend font, sun / feather / dove icons, golden buttons |
| **Jungle** | deep green + lime | Poppins font, tree / frog / leaf icons, leafy buttons |
| **Candy World** | pastel pink | bubbly Fredoka font, ice cream / candy icons, candy-stripe top bar, rainbow status bar, pill buttons |
| **Hacker** | green phosphor on black | monospace everything, terminal icons, `[ BUTTONS ]`, a root prompt in the status bar |
| **Synthwave** | neon purple + pink | Orbitron titles, retro icons, neon buttons and glow |

Every colour theme also recolours the code editor: background and syntax colours.
Turning the mod off restores WebStudio's own look. Command: **Theme Pack: Next theme** (Ctrl+Shift+P).

Fonts Pixelify Sans, VT323, Oswald, Fredoka and Orbitron are embedded under the SIL Open Font License 1.1.

## Make your own mod

A mod is a folder with `mod.json` and `main.js` (optional `style.css`). `main.js` gets a `ws` object:
`ws.addStyle`, `ws.addCommand`, `ws.addPanel`, `ws.addSettings`, `ws.on('fileOpen' | 'save' | 'themeChange' …)`,
`ws.storage`, `ws.editor` and more. The full list is in WebStudio: **Mods panel → API**.

Build the `.wsmod` files from this repo:

```bash
node build.js
```
