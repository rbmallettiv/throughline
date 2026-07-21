import { config } from "../lib/config";

export default function manifest() {
  return {
    name: config.brand,
    short_name: config.brand,
    description: config.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#f4f2ec",
    theme_color: "#1e5b54",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
