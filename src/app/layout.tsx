import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: {
    template: '%s - Sam Svindland',
    default: 'Sam Svindland - Software engineer, based in Arlington, VA.',
  },
  description:
    'I’m Sam, a software engineer based in Arlington, VA. I’m passionate about building software that improves automates daily repetitive tasks.',
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
