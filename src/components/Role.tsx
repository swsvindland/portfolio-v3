import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'

export interface Role {
  company: string
  title: string
  logo: ImageProps['src']
  start: string | { label: string; dateTime: string }
  end: string | { label: string; dateTime: string }
  website?: string
}

export function Role({ role }: { role: Role }) {
  const startLabel = typeof role.start === 'string' ? role.start : role.start.label
  const startDate = typeof role.start === 'string' ? role.start : role.start.dateTime

  const endLabel = typeof role.end === 'string' ? role.end : role.end.label
  const endDate = typeof role.end === 'string' ? role.end : role.end.dateTime

  return (
    <li className="flex">
      <Link
        target={role.website ? '_blank' : undefined}
        className="flex w-full gap-4 rounded-2xl p-1 hover:bg-zinc-50 hover:dark:bg-zinc-800/50"
        href={role.website ?? ''}
      >
        <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
          <Image src={role.logo} alt="" className="h-7 w-7" unoptimized />
        </div>
        <dl className="flex flex-auto flex-wrap gap-x-2">
          <dt className="sr-only">Company</dt>
          <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {role.company}
          </dd>
          <dt className="sr-only">Role</dt>
          <dd className="text-xs text-zinc-500 dark:text-zinc-400">{role.title}</dd>
          <dt className="sr-only">Date</dt>
          <dd className="ml-auto text-xs text-zinc-400 dark:text-zinc-400" aria-label={`${startLabel} until ${endLabel}`}>
            <time dateTime={startDate}>{startLabel}</time>{' '}
            <span aria-hidden="true">—</span>{' '}
            <time dateTime={endDate}>{endLabel}</time>
          </dd>
        </dl>
      </Link>
    </li>
  )
}
