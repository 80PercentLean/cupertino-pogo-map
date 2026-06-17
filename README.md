# Cupertino PoGO Map

**Cupertino PoGO Map** is an interactive map of the [Pokémon GO Community Campsites](https://pokemongo.com/find-your-community#community-campsites) for the [Cupertino PoGO](https://tinyurl.com/CupertinoPogo) and [Wild Goose](https://campfire.onelink.me/eBr8?af_dp=campfire://&af_force_deeplink=true&deep_link_sub1=cj1jbHVicyZjPWE4M2FmMzljLTRiNTgtNGM2NC1iZjViLTYwMTM4Yzc2MzNjNyZpPXRydWU=) groups.

Some notable features are:

- View and search locations for Gyms, PokéStops, Power Spots, parking spots, restrooms, and more.
- Support for use on both desktop and mobile devices.
- Get navigation instructions through Google Maps and shareable links for specific locations.
- Place your own markers and share their locations to send people specific coordinates and directions.
- Visualize [Google S2 cells](https://s2geometry.io) which can provide valuable insights for [Niantic Wayfinders](https://wayfarer.nianticlabs.com).
- Completely open source!

## Quick Start

This project is a React frontend that requires [Node.js](https://nodejs.org/en) (20.19+, 22.12+) to run.

After cloning the repository or downloading and extracting the ZIP file, install dependencies with:

```shell
npm install
```

Start the development server with:

```shell
npm run dev
```

Finally, load the web app at:

[`http://localhost:5173/cupertino-pogo-map`](http://localhost:5173/cupertino-pogo-map)

## Loading Wild Goose's Campsite

By default, the app will load Cupertino PoGO's Campsite. To load Wild Goose's Campsite, you need to set an environment variable.

Rename `.env.example` to `.env` and set `VITE_IS_CENTRAL=true`.

## Discord Event API Integration

The meetups view of this app communicates with the REST API ran by the [Goose Discord Bot](https://github.com/80PercentLean/goose-discord-bot) which acts as a proxy to the Discord API.

## Other Resources

Here is more documentation that may be helpful for you:

- [Use With Niantic Wayfarer: Tips For Wayfinders](./docs/wayfarer-tips.md)
- [Contributing](./docs/contributing.md)
- [Memorial Park/De Anza College POI History](./docs/history-mpda.md)
- [Central Park POI History](./docs/history-central.md)
- [Working With Tests](./docs/testing.md)
- [Working With GeoJSON](./docs/geojson.md)
- [Motivation](./docs/motivation.md)

## Technology Overview

This open source project is built with the following:

- [TypeScript](https://www.typescriptlang.org): Main language used for its type safety
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript): Language used for some scripts & configuration files
- [React](https://react.dev): Library for user interfaces
- [Leaflet](https://leafletjs.com): Libraries for interactive maps
- [React Leaflet](https://react-leaflet.js.org): Library for bindings between React & Leaflet
- [GeoJSON](https://geojson.org): Standardized format for encoding geographic data structures
- [Zustand](https://zustand.docs.pmnd.rs): State management solution
- [React Router](https://reactrouter.com): Routing library for React
- [React Hook Form](https://react-hook-form.com): Form library for React
- [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API): Adds support for usage of device latitude/longitude coordinates. Used for live location feature that allows the user to see their own real-time location on the map when they gives permission.
- [Local Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage): Allows for saving of user settings that persist across browser sessions.
- [TanStack Query](https://tanstack.com/query): Data-fetching library
- [shadcn/ui](https://ui.shadcn.com): Set of accessible React components
- [Tailwind CSS](https://tailwindcss.com): Utility-first CSS framework
- [Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries) / [window.matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia): Used to implement responsive design and conditionally execute code based off screen size and device
- [Node.js](https://nodejs.org): JavaScript runtime environment used for the development environment & GeoJSON generation script
- [Vite](https://vite.dev): Frontend build tool
- [Vitest](https://vitest.dev): Framework for unit testing
- [Mock Service Worker](https://mswjs.io): API mocking library
- [Playwright](https://playwright.dev): Framework for end-to-end testing
- [Cloudflare Pages](https://pages.cloudflare.com): JAMstack platform that hosts the production & staging builds

## License

Cupertino PoGO Map is open source software licensed as [MIT](./LICENSE).
