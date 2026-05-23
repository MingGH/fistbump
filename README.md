# #fistbump 👊👊

forked from benbarbersmith/fistbump

A knuckle tattoo generator — type your own text or randomize, pick a font, adjust letter positions, then save or share your creation.

## Live Demo

https://fistbump.996.ninja

## Source Code

https://github.com/MingGH/fistbump

![](https://img.996.ninja/ninjutsu/083d740489e0ed551a96b98cf2e36174.png)

## Features

- **Custom Text Input** — Type up to 8 letters/numbers to see them on the fists in real time
- **Randomize with Animation** — Fist bump collision + letter flip animation on each random generation
- **Font Picker** — 6 tattoo-style fonts (Typewriter, Old School, Marker, Handwritten, Comic, Gothic)
- **Drag to Adjust** — Drag individual letters on the fists to fine-tune their position
- **Social Card Export** — Generate a 1200×630 card image (standard social media size) with your tattoo text
- **Share** — One-click link sharing (native share on mobile, clipboard copy on desktop)
- **URL Hash Sync** — Bookmark or share any combination via URL (e.g. `#LOVEHATE`)

## Getting Started

No build tools needed. Serve the files with any static HTTP server:

```bash
# Python
python3 -m http.server 8080

# Node.js (npx)
npx serve .
```

Then open http://localhost:8080.

## How It Works

1. Two fist images with 4 letter slots each (8 total)
2. Words are picked from a curated list of 4-letter English words
3. Letters are positioned and rotated to match knuckle angles
4. All rendering happens client-side — no server required

## File Structure

```
index.html   — Page structure and layout
app.css      — Styles, animations, and responsive design
app.js       — Core logic: drawing, animation, font switching, drag, card generation
words.js     — Curated list of 4-letter words for randomization
left.png     — Left fist image
right.png    — Right fist image
```

## License

See [LICENSE](LICENSE) for details.
