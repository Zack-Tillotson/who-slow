import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Who Slow by Zack Tillotson",
    short_name: "Who Slow",
    description: 'Track your board game campaign and session statistics - especially finding who the slowest players are!',
    icons: [
      {
        src: "icon.png",
        type: "image/png",
        sizes: "400x400"
      }
    ],
    start_url: "/",
    display: "standalone",
    theme_color: "#1D549B",
    background_color: "#61C5A7",
    screenshots : [
      {
        "src": "wide_1280x720.png",
        "sizes": "1280x720",
        "type": "image/png",
        "form_factor": "wide",
        "label": "Homescreen of Awesome App"
      },
      {
        "src": "narrow_370x500.png",
        "sizes": "370x500",
        "type": "image/png",
        "form_factor": "narrow",
        "label": "List of Awesome Resources available in Awesome App"
      }
    ]
  }
}