/**
 * Temporary diagnostic endpoint — shows exactly what's failing on Vercel.
 * Visit /api/debug after deploying to see the error.
 * DELETE THIS FILE after fixing the issue.
 */
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve, existsSync } from "node:path";
import { readdirSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

export default async function handler(req, res) {
  const info = {
    node: process.version,
    platform: process.platform,
    cwd: process.cwd(),
    __dirname,
    env_keys: Object.keys(process.env).filter(k =>
      k.startsWith("FIREBASE") || k.startsWith("VITE_") || k.startsWith("STRIPE") || k.startsWith("OPENAI") || k.startsWith("RESEND")
    ),
  };

  // Check if dist/server/server.js exists
  const serverPath = resolve(__dirname, "..", "dist", "server", "server.js");
  info.serverJsExists = existsSync(serverPath);
  info.serverJsPath = serverPath;

  // List dist/server contents if it exists
  const serverDir = resolve(__dirname, "..", "dist", "server");
  if (existsSync(serverDir)) {
    info.serverDirContents = readdirSync(serverDir);
  } else {
    info.serverDirContents = "MISSING";
  }

  // Try loading the handler
  try {
    const url = pathToFileURL(serverPath).href;
    const mod = await import(url);
    const h = mod.default ?? mod;
    info.handlerLoaded = true;
    info.handlerType = typeof h;
    info.hasFetch = typeof h?.fetch === "function";
  } catch (err) {
    info.handlerLoaded = false;
    info.handlerError = err.message;
    info.handlerStack = err.stack?.split("\n").slice(0, 5).join("\n");
  }

  res.setHeader("content-type", "application/json");
  res.end(JSON.stringify(info, null, 2));
}
