import * as React from 'react'
import { cn } from '@/utils/cn'
import { Label } from '@/components/Label'
import { InputProps } from '@/components/Input'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
TextArea.displayName = 'Textarea'

export { TextArea }

interface TextAreaWithLabelProps extends TextareaProps {
  label?: string
}

export function TextAreaWithLabel(props: TextAreaWithLabelProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={props.id}>{props.label}</Label>
      <TextArea id={props.id} placeholder={props.placeholder} />
    </div>
  )
}
