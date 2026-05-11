import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Abdoulaye Lankoandé — Youth Engagement & Public Health Specialist' },
      { name: 'description', content: 'Spécialiste en engagement des jeunes et amélioration de l\'accès aux services de santé communautaire. Portfolio professionnel d\'Abdoulaye Lankoandé.' },
      { name: 'keywords', content: 'Abdoulaye Lankoandé, santé communautaire, engagement jeunes, SBCC, SSR, Burkina Faso' },
      { property: 'og:title', content: 'Abdoulaye Lankoandé — Youth Engagement & Public Health Specialist' },
      { property: 'og:description', content: 'Spécialiste en engagement des jeunes et amélioration de l\'accès aux services de santé communautaire.' },
      { property: 'og:type', content: 'website' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
