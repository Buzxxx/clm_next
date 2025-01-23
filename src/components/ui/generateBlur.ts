// Function to generate a shimmer SVG
export const shimmer = (w: number, h: number) => `
  <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="${w}" height="${h}" fill="#333" />
    <rect x="${-w}" width="${w}" height="${h}" fill="url(#g)" />
    <linearGradient id="g" x1="0" y1="0" x2="100%" y2="0">
      <stop stop-color="#333" offset="0.2" />
      <stop stop-color="#222" offset="0.5" />
      <stop stop-color="#333" offset="0.8" />
    </linearGradient>
    <animate attributeName="x" from="${-w}" to="${w}" dur="0.5s" repeatCount="indefinite" />
  </svg>`

// Function to convert the SVG string to base64
export const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str)
