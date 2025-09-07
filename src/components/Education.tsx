import { Role as RoleComponent, type Role as RoleItem } from '@/components/Role'
import { ComponentPropsWithoutRef } from 'react'
import logoOregon from '@/images/logos/work/oregon.svg'

function GraduationCapSvg(props: ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M22 10 12 4 2 10l10 6 10-6z"
        className="stroke-zinc-400 dark:stroke-zinc-400"
      />
      <path
        d="M6 12v5c0 .9 4 3 6 3s6-2.1 6-3v-5"
        className="stroke-zinc-400 dark:stroke-zinc-400"
      />
      <path d="M12 22v-6" className="stroke-zinc-400 dark:stroke-zinc-400" />
    </svg>
  )
}

export function Education() {
  const education: Array<RoleItem> = [
    {
      company: 'University of Oregon',
      title: 'BS in Mathematics and Computer Science',
      logo: logoOregon,
      start: '2015',
      end: '2019',
      website: 'https://uoregon.edu',
    },
  ]

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <GraduationCapSvg className="h-6 w-6 flex-none" />
        <span className="ml-3">Education</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {education.map((role, i) => (
          <RoleComponent key={i} role={role} />
        ))}
      </ol>
    </div>
  )
}
