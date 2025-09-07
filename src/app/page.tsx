import Link from 'next/link'

import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons'
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'
import { ComponentPropsWithoutRef, ComponentType } from 'react'
import { GITHUB_LINK, LINKEDIN_LINK } from '@/lib/contants'
import { Work } from '@/components/Work'
import { Education } from '@/components/Education'

function Article({ article }: { article: ArticleWithSlug }) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

function SocialLink({
  icon: Icon,
  ...props
}: ComponentPropsWithoutRef<typeof Link> & {
  icon: ComponentType<{ className?: string }>
}) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

export default async function Home() {
  let articles = (await getAllArticles()).slice(0, 4)

  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Software Engineer
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            {
              'I am Sam, based in Arlington VA. I am a software engineer with a passion for building fast and accessible applications. I am currently building applications that can optimize daily actions in my day to improve my health and fitness.'
            }
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href={GITHUB_LINK}
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href={LINKEDIN_LINK}
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
          </div>
        </div>
      </Container>
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Work />
            <Education />
          </div>
        </div>
      </Container>
    </>
  )
}
