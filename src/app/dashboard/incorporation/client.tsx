'use client'
import Image from 'next/image'
import logoIm from '../../../../public/assets/CAC-Logo.png'
import IncorporationForm from './incorporation-form'
interface ServiceCardProps {
  title: string
  items: string[]
}

function ServiceCard({ title, items }: ServiceCardProps) {
  return (
    <div
      className='hover:border-primary border-2 hover:scale-95 bg-dark-navy rounded-xl shadow-lg 
                w-full lg:w-[49%] p-4 sm:p-6 lg:p-10 transition-all duration-200'>
      <h2 className='text-xl sm:text-2xl lg:text-3xl text-primary font-semibold mb-4 sm:mb-6 lg:mb-8'>
        {title}
      </h2>
      <ul
        className='space-y-2 sm:space-y-3 lg:space-y-4 list-disc list-inside 
                   text-base sm:text-lg lg:text-xl'>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

const preIncorporationItems = [
  'Alteration of memorandum or amendment of memorandum',
  'Payment of Annual returns',
  'Change of company Secretary',
  'Removal or Addition of Director',
  'Change or Re-allotment of shares',
  "Change of company's name",
  "Change of company's address",
  'Status Report',
  'Conversion or Re-registration of company',
]

const postIncorporationItems = [
  'Filing of Business Names',
  'Filing of Companies (Limited)',
  'Filing of Companies Limited by Guarantee (LTD/GTE)',
  "Filing of NGO's such as Church, Mosque, Foundation, Club, etc",
]

export default function Incorporation() {
  return (
    <div className='w-full min-h-screen bg-navy text-white p-4 sm:p-6 lg:p-8'>
      <div className='max-w-7xl mx-auto space-y-8 sm:space-y-10 lg:space-y-12'>
        <div className='text-center space-y-4 sm:space-y-6'>
          <div className='relative w-40 h-40 sm:w-52 sm:h-52 lg:w-64 lg:h-64 mx-auto'>
            <Image
              src={logoIm}
              alt='Corporate Affairs Commission Logo'
              fill
              className='object-contain'
              priority
            />
          </div>
          <p className='text-lg sm:text-xl lg:text-2xl font-semibold max-w-3xl mx-auto'>
            We provide all services covered by the Corporate Affairs Commission, from business
            registration through status report. Here you will discover information on how to proceed
            with A.N ZEPH & ASSOCIATES and how we can help you.
          </p>
        </div>

        <div className='flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 justify-between'>
          <ServiceCard title='PRE-INCORPORATION' items={preIncorporationItems} />
          <ServiceCard title='POST-INCORPORATION' items={postIncorporationItems} />
        </div>
        <IncorporationForm />
      </div>
    </div>
  )
}
