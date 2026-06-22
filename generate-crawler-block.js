import fs from "node:fs";
import path from "node:path";

const productionBranch = "main";

const disallowCrawling = process.env.VITE_DISALLOW_CRAWLING === "true";

if (disallowCrawling) {
  const outDir =
    process.env.VITE_IS_CENTRAL === "true" ? "dist-wg" : "dist-cup-pogo";

  const robotsTxt = `User-agent: *
Disallow: /
`;

  const headers = `/*
  X-Robots-Tag: noindex, nofollow, noarchive, nosnippet
`;

  fs.mkdirSync(outDir, { recursive: true });

  fs.writeFileSync(path.join(outDir, "robots.txt"), robotsTxt);
  fs.writeFileSync(path.join(outDir, "_headers"), headers);

  console.log(
    `Generated non-production robots.txt and _headers that blocks crawlers in: ${outDir}`,
  );
} else {
  console.log("Skipped robots.txt and _headers generation.");
}
