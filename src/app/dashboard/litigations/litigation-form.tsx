import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import * as z from 'zod'

import { FormBase, FormField } from '@/components/customs/custom-form'
import { CustomInput } from '@/components/customs/custom-input'
import { Button } from '@/components/ui/button'
import CustomModal from '@/components/customs/custom-modal'
import agreementsService from '@/services/agreements.service'

interface Litigation {
  header: string
  body: string[]
}

interface LitigationCardProps {
  litigation: Litigation
  marketingPage?: boolean
}

export function LitigationCard({ litigation, marketingPage }: LitigationCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  const messageSchema = z.object({
    message: z.string(),
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
  })

  type MessageFormData = z.infer<typeof messageSchema>

  const form = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: '',
      email: '',
      fullName: '',
    },
  })

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: (data: MessageFormData) =>
      agreementsService.sendLitigationMessage({
        litigation: litigation.header,
        message: data.message,
        email: data.email,
        fullName: data.fullName,
      }),
    onSuccess: () => {
      toast.success('Message sent successfully')
      setIsOpen(false)
      form.reset()
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to send message')
    },
  })

  const handleSubmit = (data: MessageFormData) => {
    sendMessage(data)
  }

  return (
    <CustomModal
      trigger={
        <div
          className='bg-dark-navy text-white p-4 sm:p-6 lg:p-10 hover:scale-101 transition ease-in duration-200  hover:shadow-[0_8px_30px_rgb(255,255,255,0.1)] dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.07)]
                     hover:border hover:border-primary flex flex-col 
                     w-full md:w-[46%] xl:w-[48%] max-w-[600px] rounded-lg shadow-md cursor-pointer'>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl text-primary font-heading font-semibold text-center mb-4 sm:mb-6'>
            {litigation.header}
          </h2>

          {litigation.body.map((item, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <div key={index} className='mb-3 sm:mb-4 last:mb-0'>
              <p className='text-base sm:text-lg text-white text-left'>{item}</p>
              {index !== litigation.body.length - 1 && (
                <hr className='border-border/10 mt-3 sm:mt-4' />
              )}
            </div>
          ))}
        </div>
      }
      title={`Contact Us About ${litigation.header}`}
      description='Tell us how we can assist you with your legal matter'
      open={isOpen}
      onOpenChange={setIsOpen}
      size='lg'>
      <FormBase form={form} onSubmit={handleSubmit} className='space-y-6'>
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
          label='Your Message'
          description='Please provide details about your case'
          showMessage>
          <CustomInput
            variant='textarea'
            placeholder='Tell us what you want us to do for you'
            className='min-h-[150px]'
            disabled={isPending}
          />
        </FormField>

        <div className='flex justify-end gap-4'>
          <Button type='button' variant='outline' onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button type='submit' disabled={isPending}>
            {isPending ? 'Sending...' : 'Send Message'}
          </Button>
        </div>
      </FormBase>
    </CustomModal>
  )
}
