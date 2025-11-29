# VanLife

VanLife is a React + TypeScript single page application for browsing, filtering, and managing camper van listings. It showcases a public catalog, host dashboard, and Supabase-backed data fetching that replaces the earlier Mirage mock server.

## Features

- Public van catalog with filtering, detail views, and Unsplash photo credits
- Host-only dashboard with income, reviews, and individual van management
- Fake login flow that persists auth state in `localStorage`
- Supabase integration for fetching vans via `@supabase/supabase-js`
- Netlify-ready build with SPA redirect rules (`netlify.toml`)

## Tech Stack

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite 7](https://vite.dev/)
- [React Router 7](https://reactrouter.com/)
- [Supabase JS](https://supabase.com/)
- [Netlify](https://www.netlify.com/) for hosting (optional)

## Getting Started

### Prerequisites

- Node.js 18+ (recommended 20+)
- npm (comes with Node)
- Supabase project with a `vans` table containing `thanks` attribution text and Unsplash image URLs

### Installation

```bash
git clone <your-fork-url> vanlife
cd vanlife
npm install
```

Create an `.env` file in the project root:

```
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

> Never commit real keys. `.env` is ignored via `.gitignore`.

### Supabase Schema

The `vans` table should include columns that match the `Van` type in `src/types/van.ts`:

| column      | type    | notes                                   |
|-------------|---------|-----------------------------------------|
| id          | uuid    | primary key                             |
| name        | text    |                                         |
| price       | numeric | daily price                             |
| description | text    |                                         |
| image_url   | text    | direct `images.unsplash.com` URL        |
| type        | text    | e.g., `simple`, `luxury`, `rugged`      |
| host_id     | text    | used to filter host vans (ex: `"123"`)  |
| thanks      | text    | Unsplash attribution HTML string        |

Ensure [Row Level Security policies](https://supabase.com/docs/guides/auth/row-level-security) allow the `anon` key to `SELECT` from `vans`.

### Scripts

```bash
npm run dev       # start Vite dev server
npm run build     # type-check + production build
npm run preview   # preview the production build
npm run lint      # eslint
```

## Deployment

1. Configure environment variables in your host (e.g., Netlify → Site Settings → Environment) for `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
2. Run `npm run build` locally or let the platform do it.
3. Deploy the `dist` output (`publish = "dist"` is already set in `netlify.toml`).

Netlify automatically handles SPA routing via the `/* → /index.html` redirect rule.

## Image Credits

Each van includes an Unsplash credit snippet stored in Supabase (`thanks` column). The UI renders this snippet directly below every photo to satisfy Unsplash attribution requirements.

## Contributing

1. Fork and clone the repo.
2. Create a feature branch (`git checkout -b feature/my-feature`).
3. Commit your changes and open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
