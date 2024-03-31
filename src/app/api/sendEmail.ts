import sgMail, { MailDataRequired } from '@sendgrid/mail'
import { NextApiRequest, NextApiResponse } from 'next'

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

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, body, phone } = req.body
  await sendEmail(email, body, phone)
  res.status(200).json({ message: 'Email sent' })
}
