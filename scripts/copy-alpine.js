import fs from "fs";
import path from "path";

const src = path.resolve("node_modules/alpinejs/dist/cdn.min.js");
const destDir = path.resolve("assets/js");
const dest = path.join(destDir, "alpine.min.js");

// Ensure destination folder exists
fs.mkdirSync(destDir, { recursive: true });

// Copy file
fs.copyFileSync(src, dest);

console.log("Alpine.js copied to assets/js/alpine.min.js");
