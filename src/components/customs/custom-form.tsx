import React, { type ReactElement, type ReactNode } from 'react'
import {
  FormControl,
  FormDescription,
  FormField as ShadcnFormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from '@/components/ui/form'
import type { ControllerRenderProps, UseFormReturn } from 'react-hook-form'
import { cn } from '@/lib/utils'

interface FormBaseProps {
  form: UseFormReturn<any>
  onSubmit: (data: any) => void
  children: ReactNode
  className?: string
}

export function FormBase({
  form,
  onSubmit,
  children,
  className,
}: FormBaseProps) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('space-y-8', className)}
      >
        {children}
      </form>
    </Form>
  )
}

interface FormFieldProps {
  name: string
  label?: string
  description?: string
  showMessage?: boolean
  children: ReactElement | ((field: ControllerRenderProps) => ReactElement)
  form: UseFormReturn<any>
}

export function FormField({
  name,
  label,
  description,
  showMessage,
  children,
  form,
}: FormFieldProps) {
  return (
    <ShadcnFormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            {typeof children === 'function'
              ? children(field)
              : React.isValidElement(children)
                ? React.cloneElement(children, { ...field })
                : null}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          {showMessage && <FormMessage />}
        </FormItem>
      )}
    />
  )
}

interface FormFooterProps {
  children: ReactNode
  className?: string
}

export function FormFooter({ children, className }: FormFooterProps) {
  return (
    <div className={cn('flex justify-end space-x-2', className)}>
      {children}
    </div>
  )
}
