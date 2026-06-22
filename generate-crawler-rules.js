import fs from "node:fs";
import path from "node:path";

const productionBranch = "main";

const isProduction = process.env.CF_PAGES_BRANCH === productionBranch;

if (!isProduction) {
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
    `Generated non-production robots.txt and _headers with crawler blocking in: ${outDir}`,
  );
} else {
  console.log(
    "Skipped robots.txt and _headers generation since this is for production.",
  );
}
