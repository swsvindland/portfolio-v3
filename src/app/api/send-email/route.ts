import sgMail, { MailDataRequired } from '@sendgrid/mail'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

export const sendEmail = async (
  email: string,
  body: string,
  phone?: string,
) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? '')
  const msg: MailDataRequired = {
    to: process.env.SENDGRID_TO, // Change to your recipient
    from: process.env.SENDGRID_FROM ?? '', // Change to your verified sender
    subject: 'Svindland Portfolio Contact',
    text: `from ${email} \n ${body} \n phone ${phone}`,
  }
  await sgMail.send(msg)
}

export async function POST(request: NextApiRequest, response: NextApiResponse) {
  const { email, message, phone } = request.body
  await sendEmail(email, message, phone)
  return NextResponse.json({ message: 'Email sent' }, { status: 200 })
}
