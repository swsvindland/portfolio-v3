'use client'

import { FC, FormEvent, useState } from 'react'
import { InputWithLabel } from '@/components/Input'
import { Button } from '@/components/Button'
import { TextAreaWithLabel } from '@/components/TextArea'

interface ContactFormState {
  email: string
  phone?: string
  message: string
}

export const ContactForm: FC = () => {
  const [state, setState] = useState<ContactFormState>({
    email: '',
    phone: '',
    message: '',
  })

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state),
    })
  }

  return (
    <form className="grid grid-cols-1 gap-2">
      <InputWithLabel
        label="Email"
        value={state.email}
        onChange={(event) => setState({ ...state, email: event.target.value })}
      />
      <InputWithLabel
        label="Phone"
        value={state.phone}
        onChange={(event) => setState({ ...state, phone: event.target.value })}
      />
      <TextAreaWithLabel
        label="Message"
        value={state.message}
        onChange={(event) =>
          setState({ ...state, message: event.target.value })
        }
      />
      <Button>Submit</Button>
    </form>
  )
}
