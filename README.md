# BLACKSITE RUN

**A first-person sci-fi combat and high-speed escape game by Blair Page.**

An original, standalone browser game set in a fictional Nevada blacksite. Explore three procedurally generated sectors, recover data cores, fight procedurally rendered alien organisms, use sprint and vehicle-style boost, and reach each extraction gate. Inspired by the atmosphere of classic secret-base sci-fi arcade games, without using copyrighted franchise artwork or characters.

## Play

Open `index.html` in a browser, or publish this repository using GitHub Pages. No build step, CDN, external dependencies, accounts, or paid hosting are required.

### Controls

| Control | Action |
| --- | --- |
| W / A / S / D | Move and strafe |
| Mouse | Aim / turn (click game to lock pointer) |
| Click / Space | Fire |
| Shift | Sprint |
| F | High-speed boost (consumes energy) |
| R | Reload |
| E | Use extraction gate |
| P / Esc | Pause |
| M | Tactical minimap |
| Touch controls | Mobile movement, fire, boost, reload and use |

Collect every cyan data core in a sector and approach the amber extraction gate. Press E to advance. Supplies restore integrity, ammo, or energy. Survive all three sectors to complete the run. Your best score is saved locally when supported.

## Publish free on GitHub Pages

1. Create a public repository named `Blairs-Blacksite-Run`.
2. Upload `index.html`, `style.css`, `game.js`, and other files into the repository root.
3. In **Settings → Pages**, choose **Deploy from a branch**, `main`, and `/ (root)`.
4. Open `https://blairyfairy.github.io/Blairs-Blacksite-Run/` after deployment.

## Files

- `index.html`: game shell, HUD, menus, touch controls.
- `style.css`: responsive presentation and overlays.
- `game.js`: raycasting renderer, procedural map generation, alien sprites, combat AI, mission system, pickups, and audio.
- `LICENSE`: MIT license.

## Design and provenance

This is an original fictional game. It is **not** affiliated with Area 51, any military facility, or a third-party game franchise. Locations and alien lifeforms are fictional. It uses no copyrighted third-party art or audio assets. The game is authored for Blair Page with AI-assisted code generation; review and customize the repository before publishing under your own account.

## Technical notes

The raycaster renders at 480×270 then scales to the display for a pixelated arcade look. Procedural level generation and synthesized audio work offline. Best results are on desktop with keyboard and mouse. Mobile controls are included but have not been exhaustively tested on physical devices.
