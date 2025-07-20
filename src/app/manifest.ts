import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sam Svindland - Portfolio',
    short_name: 'Sam Svindland',
    description:
      'Personal portfolio and blog of Sam Svindland - Software Developer, sharing projects, articles, and insights about web and mobile development.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
