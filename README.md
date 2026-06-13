Turbo Toy Arena is a neon toy-car race and battle game for Hank and Perry.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Modes

- Race: two selected cars sprint with sparks and nitro trails.
- Battle: two selected vehicles smash in the arena with health bars and explosions.
- Grave Digger always wins Battle mode when selected.

## Deploy

This app is configured for static export and GitHub Pages. Pushing `main` to GitHub runs `.github/workflows/deploy.yml` and publishes the `out` build artifact.

## Scripts

- `npm run dev`
- `npm run build`
- `npm run lint`

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
