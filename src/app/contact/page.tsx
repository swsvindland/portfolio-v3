import { ContactForm } from '@/components/ContactForm'

export default async function Contact() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-96 rounded bg-zinc-100 p-6 dark:bg-zinc-800">
        <ContactForm />
      </div>
    </div>
  )
}
