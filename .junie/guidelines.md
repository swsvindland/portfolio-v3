# Project Development Guidelines (portfolio-v3)

These notes capture project-specific details to streamline development, debugging, and testing for this Next.js + Tailwind + MDX codebase.

Audience: experienced developers. Focus is on repo-specific information, not generic docs.


## Build and Configuration

- Toolchain
  - Next.js 15.x (ESM) with React 19 and TypeScript (strict mode).
  - Package manager: pnpm 10.13.1 (repository is configured with "packageManager": "pnpm@10.13.1"). Avoid mixing npm/yarn with pnpm.
  - Recommended Node.js: 20.x LTS (or >= 18.18). Next 15 requires at least Node 18.18.

- Install & Scripts
  - pnpm install
  - pnpm dev (development server at http://localhost:3000)
  - pnpm build (production build)
  - pnpm start (serve the built app)
  - pnpm lint (Next lint rules via eslint-config-next)
  - pnpm format (Prettier with prettier-plugin-tailwindcss)

- Environment variables
  - Define a .env.local in the repo root.
  - Public site URL used in README:
    - NEXT_PUBLIC_SITE_URL=https://example.com
  - SendGrid-backed contact API (src/app/api/send-email/route.ts) requires:
    - SENDGRID_API_KEY
    - SENDGRID_TO
    - SENDGRID_FROM
  - Without these set, calling POST /api/send-email will throw at runtime. During local dev, either provide dummy credentials in a sandbox account or avoid hitting that route.

- Next.js configuration (next.config.mjs)
  - MDX enabled via @next/mdx with remark-gfm and rehype-prism for code highlighting.
  - pageExtensions includes mdx in addition to js/ts/tsx.
  - The app directory is used (src/app/*).

- TypeScript configuration (tsconfig.json)
  - strict: true, moduleResolution: "bundler", noEmit: true, isolatedModules: true.
  - Path alias: @/* -> ./src/*.
  - When importing internal modules prefer absolute alias (e.g., import X from '@/lib/X').

- Tailwind CSS v4
  - PostCSS plugin: @tailwindcss/postcss is configured in postcss.config.js.
  - Entry CSS (src/styles/tailwind.css):
    - Uses @import 'tailwindcss';
    - Imports src/styles/prism.css for code highlighting (rehype-prism);
    - Registers @tailwindcss/typography plugin via @plugin and ties to typography.ts via @config;
    - Defines a dark variant and CSS custom properties for font sizes.
  - Tailwind config (tailwind.config.ts): darkMode: 'selector'; typography plugin; custom theme scales are provided via typography.ts.

- Theming
  - next-themes is configured in src/app/providers.tsx with attribute="class"; a watcher syncs system dark mode. Dark CSS variant is defined in CSS via @custom-variant dark (&:where(.dark, .dark *)).

- MDX
  - mdx-components.tsx maps Image to next/image. MDX files benefit from GitHub-flavored markdown (remark-gfm) and code highlighting (rehype-prism). Ensure styles/prism.css is kept in sync with the desired theme.


## Testing

There is no permanent test framework in dependencies. To keep the repo lean, use Vitest on-demand via pnpm dlx for ad-hoc/unit tests. This approach was verified locally.

- Ad-hoc unit test (verified)
  1) Create a tiny utility and test under src/ (example):

     src/tmpAdd.ts
     export function add(a: number, b: number) {
       return a + b
     }
     export function sum(numbers: number[]) {
       return numbers.reduce((acc, n) => acc + n, 0)
     }

     src/tmpAdd.test.ts
     import { describe, it, expect } from 'vitest'
     import { add, sum } from './tmpAdd'
     describe('tmpAdd helpers', () => {
       it('add adds positive integers', () => {
         expect(add(2, 3)).toBe(5)
       })
       it('sum sums an array of numbers', () => {
         expect(sum([1, 2, 3, 4])).toBe(10)
       })
     })

  2) Run tests without adding devDependencies:
     - pnpm dlx vitest run

  3) Expected shape of output (sample):
     - Test Files 1 passed (1)
     - Tests 2 passed (2)

  This exact flow has been executed and confirmed to pass in this repository. The temporary files were removed after verification to keep the repo clean.

- Where to place tests
  - Co-locate unit tests next to the source (e.g., src/**/*.test.ts or .test.tsx).
  - For Next API routes (server-only code), default Vitest environment is fine (node). For React components, use jsdom.

- Component tests (optional, if you want a persistent setup)
  - Add devDependencies: vitest, @testing-library/react, @testing-library/user-event, @testing-library/jest-dom, jsdom.
  - Minimal vitest.config.ts (example):
    import { defineConfig } from 'vitest/config'
    export default defineConfig({
      test: {
        environment: 'jsdom',
        globals: true,
        include: ['src/**/*.{test,spec}.{ts,tsx}'],
      },
    })
  - Add a test: src/components/Button.test.tsx and run pnpm vitest.

- Notes
  - The project uses ESM and TypeScript with moduleResolution: bundler. Prefer ESM-aware tooling (Vitest supports it out of the box).
  - If you need to import path aliases (@/*) in tests, Vitest resolves them via tsconfig; for custom mapping in a dedicated config, add resolve.alias to vitest config.


## Additional Development Information

- Linting and formatting
  - Lint: pnpm lint (Next/ESLint 9 rules). Fixes are not auto-applied by default; run eslint with --fix if needed.
  - Prettier: pnpm format formats src/**/*.{ts,tsx} using prettier-plugin-tailwindcss, which also sorts utility classes.
  - Style choices: single quotes, no semicolons.

- Debugging and DX tips
  - API route /api/send-email requires valid SendGrid env vars. In development, avoid hitting it without credentials to prevent errors; consider guarding calls in the UI or feature-flagging locally.
  - MDX with rehype-prism requires the CSS import in src/styles/tailwind.css; if code highlighting looks off, check src/styles/prism.css.
  - When moving/renaming modules, keep the @/* alias up to date. Avoid deep relative paths.
  - If using experimental React/Next features, ensure Node is >= 18.18 (prefer 20.x) to avoid tooling/ESM issues.

- Project conventions
  - App Router (src/app) with layout.tsx and providers.tsx; global CSS imported from src/styles/tailwind.css.
  - Page/route types are typed via next Metadata and app dir conventions.
  - Analytics uses @vercel/analytics/react already wired in layout.

- Adding content via MDX
  - Place .mdx files where routed by the app directory and ensure pageExtensions supports mdx (already configured).
  - Use fenced code blocks for syntax highlighting; supported by rehype-prism.


## Reproducing the Verified Test Locally

- Steps that were executed successfully:
  - pnpm dlx vitest run
  - Output indicated 1 test file and 2 tests passed.
- To replicate yourself:
  - Recreate the example files shown above under src/, run pnpm dlx vitest run, then remove the files when done.


## Cleanliness

- This repo intentionally does not ship with a permanent test runner configuration. Use pnpm dlx for ad-hoc tests or add devDependencies if you want a dedicated setup.
- After verification, remove temporary test files to keep the repo tidy.
