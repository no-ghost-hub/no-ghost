import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "rgb(245,245,245)",
    categories: ["food", "health"],
    description: "Vegan restaurant",
    display: "standalone",
    icons: [
      { src: "/icon-192.png", type: "image/png", sizes: "192x192" },
      {
        src: "/icon-maskable.png",
        type: "image/png",
        sizes: "512x512",
        purpose: "maskable",
      },
      { src: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    name: "No Ghost",
    short_name: "No Ghost",
    start_url: "/",
    theme_color: "rgb(205,105,5)",
  };
}
