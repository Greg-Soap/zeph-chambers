'use client'

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

const messageSchema = z.object({
  message: z.string(),
})

type MessageFormData = z.infer<typeof messageSchema>

interface Litigation {
  header: string
  body: string[]
}

interface LitigationCardProps {
  litigation: Litigation
}

function LitigationCard({ litigation }: LitigationCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: '',
    },
  })

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: (data: MessageFormData) =>
      agreementsService.sendLitigationMessage({
        litigation: litigation.header,
        message: data.message,
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
          className='bg-dark-navy text-white p-4 sm:p-6 lg:p-10 hover:scale-105 transition ease-in-out duration-200 
                     hover:border hover:border-primary flex flex-col 
                     w-full md:w-[46%] xl:w-[48%] max-w-[600px] rounded-lg shadow-md cursor-pointer'>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl text-primary font-heading font-semibold text-center mb-4 sm:mb-6'>
            {litigation.header}
          </h2>

          {litigation.body.map((item, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <div key={index} className='mb-3 sm:mb-4 last:mb-0'>
              <p className='text-base sm:text-lg text-white text-left'>{item}</p>
              <hr className='border-border/10 mt-3 sm:mt-4' />
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

export default function Litigation() {
  return (
    <div className='w-full min-h-screen bg-navy text-white p-4 sm:p-6'>
      <div className='max-w-7xl mx-auto space-y-8 sm:space-y-12 lg:space-y-16'>
        <div className='text-center space-y-4 sm:space-y-6'>
          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary font-heading font-bold'>
            LITIGATIONS
          </h1>

          <p className='text-lg sm:text-xl lg:text-2xl text-white font-medium max-w-3xl mx-auto'>
            Navigating the complex landscape of legal disputes requires strategic expertise and a
            deep understanding of the law.
          </p>

          <p className='text-base sm:text-lg text-accent max-w-3xl mx-auto'>
            Our Litigation Center is your trusted resource for comprehensive insights and guidance
            on various litigation matters. Whether you are a legal professional or an individual
            seeking information, our dashboard provides a streamlined and informative experience.
          </p>
        </div>

        <div className='flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8'>
          {LitigationList.map((litigation, index) => (
            <LitigationCard
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
              litigation={litigation}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const LitigationList: Litigation[] = [
  {
    header: 'Commercial Litigation',
    body: [
      'Business Disputes: Cases involving disputes among businesses, partners, shareholders, or competitors.',
      'Intellectual Property: Litigation related to patents, trademarks, copyrights, and trade secrets.',
      'Antitrust and Competition Law: Cases involving allegations of anti-competitive behavior or monopolistic practices.',
    ],
  },
  {
    header: 'Criminal Litigation',
    body: [
      'Prosecution: Cases where government entities, such as the state, bring charges against individuals or entities accused of committing crimes.',
      'Criminal Defense: Cases where individuals are accused of committing crimes and require defense representation in court.',
    ],
  },

  {
    header: 'Administrative Litigation',
    body: [
      'Regulatory Disputes: Cases challenging decisions made by government agencies or regulatory bodies.',
      'Professional License Issues: Litigation related to the suspension or revocation of professional licenses.',
    ],
  },
  {
    header: 'Environmental Litigation:',
    body: [
      'Environmental Disputes: Cases related to environmental regulations, pollution, land use, and natural resource management.',
    ],
  },
  {
    header: 'Class Action Litigation',
    body: [
      'Mass Torts: Cases involving a large number of plaintiffs with similar claims against a common defendant.',
      "Consumer Protection: Litigation aimed at protecting consumers' rights against unfair business practices.",
    ],
  },
  {
    header: 'Real Estate Litigation',
    body: [
      'Landlord-Tenant Disputes: Cases involving disputes between landlords and tenants over lease agreements, rent, or property conditions.',
      'Foreclosure: Litigation related to property foreclosure proceedings.',
    ],
  },
  {
    header: 'International Litigation',
    body: [
      'Cross-Border Disputes: Cases involving parties from different countries, often dealing with jurisdictional and international law issues.',
    ],
  },
  {
    header: 'Appellate Litigation',
    body: [
      'Appeals: Cases brought before appellate courts to challenge decisions made in lower courts.',
    ],
  },

  {
    header: 'Civil Litigation',
    body: [
      'Personal Injury: Cases involving injuries or harm caused by negligence, accidents, or intentional actions.',
      "Contract Disputes: Disputes arising from the breach of a contract's terms or conditions.",
      'Property Disputes: Cases involving real estate or property ownership disputes.',
      'Employment Law: Cases related to workplace disputes, such as wrongful termination, discrimination, or harassment claims.',
      'Family Law: Litigation involving divorce, child custody, alimony,and other family-related matters.',
    ],
  },
]
