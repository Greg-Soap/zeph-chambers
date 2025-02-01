import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { FormField } from '@/components/customs/custom-form'
import agreementsService from '@/services/agreements.service'
import { FormBase } from '@/components/customs/custom-form'
import { CustomInput } from '@/components/customs/custom-input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export default function IncorporationForm({ marketingPage }: { marketingPage?: boolean }) {
  const incorporationSchema = z.object({
    email: z
      .string()
      .email()
      .optional()
      .refine((val) => {
        if (marketingPage) return val != null && val !== ''
        return true
      }, 'Email is required'),
    fullName: z
      .string()
      .optional()
      .refine((val) => {
        if (marketingPage) return val != null && val !== ''
        return true
      }, 'Full name is required'),
    message: z.string().min(1, { message: 'Message is required' }),
  })

  type IncorporationFormData = z.infer<typeof incorporationSchema>

  const form = useForm<IncorporationFormData>({
    resolver: zodResolver(incorporationSchema),
    defaultValues: {
      email: '',
      fullName: '',
      message: '',
    },
  })

  const { mutate: submitInquiry, isPending } = useMutation({
    mutationFn: agreementsService.sendIncorporationMessage,
    onSuccess: () => {
      toast.success('Your inquiry has been submitted successfully')
      form.reset()
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to submit inquiry')
    },
  })

  function handleSubmit(data: IncorporationFormData) {
    submitInquiry(data)
  }

  return (
    <FormBase
      form={form}
      onSubmit={handleSubmit}
      className='max-w-2xl mx-auto space-y-4 sm:space-y-6'>
      {marketingPage && (
        <>
          <FormField form={form} name='fullName' label='Full Name' showMessage>
            <CustomInput placeholder='Enter your full name' disabled={isPending} />
          </FormField>
          <FormField form={form} name='email' label='Email' showMessage>
            <CustomInput type='email' placeholder='Enter your email' disabled={isPending} />
          </FormField>
        </>
      )}
      <FormField
        form={form}
        name='message'
        label='Your Inquiry'
        description='Tell us how we may be of help to you'
        showMessage>
        <CustomInput
          variant='textarea'
          placeholder='Tell us how we may be of help to you'
          className='min-h-[150px] sm:min-h-[180px] lg:min-h-[200px] resize-none'
          disabled={isPending}
        />
      </FormField>

      <Button
        type='submit'
        className='w-full text-base sm:text-lg py-2 sm:py-3'
        disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </Button>
    </FormBase>
  )
}
