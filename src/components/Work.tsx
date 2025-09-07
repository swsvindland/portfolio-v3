import { Role as RoleComponent, type Role as RoleItem } from '@/components/Role'
import { ComponentPropsWithoutRef } from 'react'
import logoNulia from '@/images/logos/work/nulia.svg'
import logoOregon from '@/images/logos/work/oregon.svg'
import transceptaLogo from '@/images/logos/work/transcepta.png'
import edgdeLogo from '@/images/logos/work/edgde.png'
import tlpLogo from '@/images/logos/work/tlp.png'

function BriefcaseSvg(props: ComponentPropsWithoutRef<'svg'>) {
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
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-400"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-400"
      />
    </svg>
  )
}

export function Work() {
  const resume: Array<RoleItem> = [
    {
      company: 'TLP Software',
      title: 'Sr. Software Engineer',
      logo: tlpLogo,
      start: '2023',
      end: {
        label: 'Present',
        dateTime: new Date().getFullYear().toString(),
      },
      website: 'https://tlpsoftware.com',
    },
    {
      company: 'Transcepta',
      title: 'Sr. Frontend Engineer',
      logo: transceptaLogo,
      start: '2021',
      end: '2023',
      website: 'https://transcepta.com',
    },
    {
      company: 'Nulia',
      title: 'Frontend Developer',
      logo: logoNulia,
      start: '2019',
      end: '2021',
      website: 'https://nulia.com',
    },
    {
      company: 'Edgde',
      title: 'Software Engineer Intern',
      logo: edgdeLogo,
      start: '2019',
      end: '2019',
      website: 'https://edgde.com',
    },
    {
      company: 'University of Oregon',
      title: 'iOS App Developer',
      logo: logoOregon,
      start: '2017',
      end: '2018',
      website: 'https://uoregon.edu',
    },
  ]

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseSvg className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <RoleComponent key={roleIndex} role={role} />
        ))}
      </ol>
    </div>
  )
}
