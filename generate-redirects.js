/**
 * Script that generates the _redirects file for Cloudflare Pages.
 */
import fs from "node:fs";
import path from "node:path";

const IS_CENTRAL = process.env.VITE_IS_CENTRAL === "true";

const outDir = IS_CENTRAL ? "dist-wg" : "dist-cup-pogo";

const baseRedirectsPath = path.resolve("src", "_redirects-base");

const baseRedirects = fs.existsSync(baseRedirectsPath)
  ? fs.readFileSync(baseRedirectsPath, "utf8").trimEnd()
  : "";

const urlCampfire = IS_CENTRAL
  ? "https://campfire.onelink.me/eBr8?af_dp=campfire://&af_force_deeplink=true&deep_link_sub1=cj1jbHVicyZjPWE4M2FmMzljLTRiNTgtNGM2NC1iZjViLTYwMTM4Yzc2MzNjNyZpPXRydWU="
  : "https://campfire.onelink.me/eBr8?af_dp=campfire://&af_force_deeplink=true&deep_link_sub1=cj1jbHVicyZjPTk4MjZkY2U4LTZhM2ItNDQxNC05N2M1LTg1NzYzNDYzY2VmNSZpPXRydWU=";

const dynamicRedirects = [`/campfire ${urlCampfire} 301`];

if (!IS_CENTRAL) {
  dynamicRedirects.push(
    "/guide https://docs.google.com/document/d/1NCGM5HAbRauIoQV4E7ZWGc2-Kx3woO3BxWpeZeXX6eM/edit?usp=sharing 301",
  );
}

const redirects = [baseRedirects, dynamicRedirects.join("\n")]
  .filter(Boolean)
  .join("\n\n");

fs.writeFileSync(path.join(outDir, "_redirects"), redirects);

console.log(`Generated ${path.join(outDir, "_redirects")}`);
