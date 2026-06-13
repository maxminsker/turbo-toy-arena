# Decisions

- Built the app as a static-export Next.js app so it can run on GitHub Pages for free.
- Used original CSS/SVG-style toy vehicles instead of Hot Wheels or Monster Jam art assets. That keeps the app deployable without depending on copyrighted images.
- Kept the app as one focused screen with Race and Battle modes. For 4 and 5 year olds, navigation depth is dead weight.
- Grave Digger is hard-coded to win Battle mode whenever selected, per request. Race mode stays stat-weighted and partly random.
- Deployed from `turbo-toy-arena` as its own GitHub repo because the parent workspace has no commits, no remote, and many unrelated untracked files.
- `npm audit --omit=dev` reports a moderate PostCSS advisory through Next 16.2.9. The offered automatic fix downgrades Next to 9.3.3, so I left the current supported stack intact.
