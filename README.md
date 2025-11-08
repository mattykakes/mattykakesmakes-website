The Matty Kakes Makes static website repo using [Hugo](https://gohugo.io/) static website generator and [forked](https://github.com/mattrussmill/tailbliss) [tailbliss](https://github.com/nusserstudios/tailbliss) theme. However, the forked theme does not include all of the changes used in this website; only the contributions made to the original theme repository.


## Prerequisite Software
* [Go v1.24](https://go.dev/doc/install)
* [NodeJS v22.14.0](https://nodejs.org/en/download)
    * Recommend using a version manager like NVM, fnm, or Volta
* [Hugo](https://gohugo.io/about/introduction/) [v0.148](https://gohugo.io/installation/)


## Development

### Available Commands

##### Setup & Installation
```bash
# Install dependencies (automatically runs content setup)
npm install

# Manual content setup (if needed)
npm run install
```

##### Development
```bash
# Start development server with auto CSS rebuilding (RECOMMENDED)
npm run dev:watch

# Alternative: Traditional approach
npm run dev

# Manual CSS rebuild (when not using dev:watch)
npm run rebuild
```

##### Production Build
```bash
# Full production build
npm run build
```

### Development Workflow Explained

TailBliss offers two development approaches - select the one that best fits your workflow:

#### Recommended: Auto-Watch Mode
```bash
npm run dev:watch
```
This command:
1. Starts CSS watcher (automatically rebuilds when Tailwind classes change)
2. Starts Hugo server with caching disabled  
3. Opens your site at `http://localhost:1313`
4. **No manual rebuilding needed** - changes appear instantly!

#### Traditional: Manual Mode
```bash
npm run dev
```
This command:
1. Builds CSS once in development mode
2. Starts Hugo server with caching disabled
3. Opens your site at `http://localhost:1313`
4. Requires manual rebuild when changing Tailwind classes

### Making Changes

#### When changing HTML/Tailwind classes:
- Edit your `.html` files in `layouts/`
- Hugo automatically detects changes and reloads
- **No rebuild needed!**

#### When changing colors/CSS variables:
- Edit `assets/css/main.css`
- Run: `npm run rebuild`
- Hugo automatically detects the new CSS and reloads

#### What Each Command Does

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `npm run dev:watch` | **Auto-watch development** (RECOMMENDED) | Best for active development - auto-rebuilds CSS |
| `npm run dev` | Traditional development server | When you prefer manual control |
| `npm run rebuild` | Rebuild CSS only | After changing colors/CSS variables (manual mode) |
| `npm run build` | Production build | Deploying to production |


## Legal
This repository contains two distinct parts:

### Source Code  
Licensed under the [Apache License 2.0](./LICENSE). You are free to use and modify the Hugo templates, configuration, and supporting code under that license.

### Content and Media  
All written content, photos, and branding in `content/`, `assets/` and `static/` are © Matthew Miller 2025. They are not covered by the Apache license and may not be copied or reused without permission.

### Trademarks  
"Matty Kakes Makes" and its associated logos are trademarks of Matthew Miller.