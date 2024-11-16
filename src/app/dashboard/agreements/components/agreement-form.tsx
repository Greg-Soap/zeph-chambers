'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { FormBase, FormField } from '@/components/customs/custom-form'
import { CustomInput } from '@/components/customs/custom-input'
import { toast } from 'sonner'

const agreementSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  parties: z.string().min(2, 'Parties must be at least 2 characters'),
  date: z.string(),
})

type AgreementFormData = z.infer<typeof agreementSchema>

interface AgreementFormProps {
  type: string
  onSuccess: () => void
}

export function AgreementForm({ type, onSuccess }: AgreementFormProps) {
  const form = useForm<AgreementFormData>({
    resolver: zodResolver(agreementSchema),
    defaultValues: {
      title: '',
      description: '',
      parties: '',
      date: new Date().toISOString().split('T')[0],
    },
  })

  function handleSubmit(data: AgreementFormData) {
    // Add your form submission logic here
    console.log(data)
    toast.success('Agreement created successfully')
    onSuccess()
  }

  return (
    <FormBase
      form={form}
      onSubmit={handleSubmit}
      className='space-y-4 w-full max-w-[600px] mx-auto px-4 sm:px-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='md:col-span-2'>
          <FormField form={form} name='title' label='Agreement Title' showMessage>
            <CustomInput variant='input' placeholder='Enter agreement title' />
          </FormField>
        </div>

        <div className='md:col-span-2'>
          <FormField form={form} name='description' label='Description' showMessage>
            <CustomInput
              variant='textarea'
              placeholder='Enter agreement description'
              className='min-h-[100px]'
            />
          </FormField>
        </div>

        <FormField form={form} name='parties' label='Parties Involved' showMessage>
          <CustomInput variant='input' placeholder='Enter parties involved' />
        </FormField>

        <FormField form={form} name='date' label='Agreement Date' showMessage>
          <CustomInput variant='input' type='date' />
        </FormField>
      </div>

      <div className='flex flex-col sm:flex-row justify-end gap-3 pt-4'>
        <Button type='submit' className='w-full sm:w-auto'>
          Create Agreement
        </Button>
      </div>
    </FormBase>
  )
}
