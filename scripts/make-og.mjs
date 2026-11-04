import sharp from "sharp";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="18%" cy="20%" r="70%">
      <stop offset="0%" stop-color="#ffb86b" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#ffb86b" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="88%" cy="90%" r="60%">
      <stop offset="0%" stop-color="#8ef0c8" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#8ef0c8" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#070708"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>
  <g stroke="#ffffff" stroke-opacity="0.05">
    ${Array.from({ length: 15 }, (_, i) => `<line x1="${i * 86}" y1="0" x2="${i * 86}" y2="630"/>`).join("")}
    ${Array.from({ length: 8 }, (_, i) => `<line x1="0" y1="${i * 90}" x2="1200" y2="${i * 90}"/>`).join("")}
  </g>
  <rect x="64" y="66" width="44" height="44" rx="10" fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-opacity="0.16"/>
  <text x="86" y="96" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="15" fill="#ffb86b">MB</text>
  <text x="64" y="300" font-family="Helvetica, Arial, sans-serif" font-size="76" fill="#f2efe7" letter-spacing="-3">Monerul Islam Bishal</text>
  <text x="64" y="368" font-family="Helvetica, Arial, sans-serif" font-size="34" fill="#ffb86b" letter-spacing="-0.5">Full-stack developer</text>
  <text x="64" y="470" font-family="Helvetica, Arial, sans-serif" font-size="22" fill="#9c988f">React · Next.js · Node · PostgreSQL · TypeScript</text>
  <text x="64" y="540" font-family="Helvetica, Arial, sans-serif" font-size="18" fill="#6f6b63">Dhaka, Bangladesh · GMT+6 · Open to work</text>
  <circle cx="1100" cy="120" r="6" fill="#8ef0c8"/>
  <text x="1118" y="126" font-family="Helvetica, Arial, sans-serif" font-size="16" fill="#8ef0c8">available</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile("public/og.png");
console.log("wrote public/og.png");
