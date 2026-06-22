# Environment Variables

These are the available environment variables that can be set in the `.env` file. None of these variables are required to get the app running in a development server, but if none are defined, some app features may not work.

- `PORT`: Port the Vite server should use
- `VITE_API`: URL for Goose Discord Bot API
- `VITE_DISALLOW_CRAWLING`: Disallow crawling of the entire site
- `VITE_E2E`: Set app into end-to-end testing mode
- `VITE_IS_CENTRAL`: Set to true to set app to Central Park, otherwise it will default to Memorial Park/De Anza College
- `VITE_ROOT_PATH`: The root path for the app
- `VITE_SITEMAP_URL`: Set to a URL to generate a sitemap.xml file
