# Cloudflare deployment notes

The AI Studio export included a `package-lock.json` that is not complete for Linux CI. Cloudflare Workers Builds uses `npm ci` when that lockfile is present, which fails because several platform-specific optional dependencies (including `@img/sharp-*`) are missing from the lockfile.

For the first Cloudflare deployment, the repository intentionally does not include that stale lockfile so Workers Builds can resolve dependencies with a clean `npm install` from `package.json`.

After production is confirmed, regenerate `package-lock.json` from a clean checkout with the project Node/npm version and commit the regenerated lockfile.
