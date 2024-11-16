'use client'

import Layout from '@/layout/layout'
import { Button } from '@/components/ui/button'
import { FadeText } from '@/components/animations/fade'
import { Box2, House2 } from 'iconsax-react'
import { CircleUserRound, Handshake } from 'lucide-react'

export default function Home() {
  return (
    <Layout>
      <div className='bg-background flex flex-col items-center justify-start'>
        <section className='container flex flex-col sm:flex-row items-center justify-evenly my-20'>
          <div className='sm:w-2/5 flex flex-col justify-center py-10'>
            <FadeText>
              <h2 className='text-2xl sm:text-3xl lg:text-4xl text-left w-full text-primary font-heading font-bold'>
                Building up Strong Cases, and Protecting Your Rights
              </h2>
            </FadeText>
            <p className='mt-4 text-xl sm:text-2xl text-muted-foreground font-secondary'>
              -Advocates for Justice
            </p>
            <p className='mt-6 text-lg sm:text-xl text-muted-foreground text-justify font-secondary leading-6 tracking-tight'>
              A.N. Zeph & Associates is a recognized and committed law firm that is committed to you
              outstanding legal services that are specifically designed to fit your unique needs. We
              work to provide our customers with individualized and successful solutions using our
              team of skilled lawyers and their in-depth knowledge of many different legal
              disciplines.
            </p>
          </div>

          <div className='sm:w-2/5 flex flex-col justify-center py-10'>
            <img
              src='/assets/justice.png.jpg'
              alt='Main'
              className='object-cover rounded-lg overflow-hidden bg-clip-content hover:border-primary border-4 transition-all duration-300'
            />
          </div>
        </section>

        <section className='bg-dark-navy w-full rounded-lg'>
          <div className='container flex flex-col sm:flex-row justify-evenly py-20 sm:py-40'>
            <div className='sm:w-2/5 flex flex-col justify-center p-10'>
              <img
                src='/assets/books.jpg'
                alt='Law Books'
                className='object-cover rounded-lg overflow-hidden bg-clip-content hover:border-secondary border-4 transition-all duration-300'
              />
            </div>

            <div className='sm:w-2/5 flex flex-col justify-center p-10'>
              <FadeText>
                <h2 className='text-2xl sm:text-3xl lg:text-4xl text-primary font-heading font-bold'>
                  Where true Expertise Meets Compassion
                </h2>
              </FadeText>
              <p className='mt-4 text-xl sm:text-2xl font-secondary text-muted-foreground'>
                -Your Trusted Legal Guide
              </p>
              <p className='mt-6 text-lg sm:text-xl  font-secondary leading-6 text-muted-foreground tracking-tight'>
                We are committed to providing our clients with high-quality legal representation and
                personalized attention throughout every stage of the legal process.
              </p>

              <Button
                className='mt-10 w-fit py-6 text-lg hover:scale-105 transition ease-in '
                size='lg'>
                Send a message
              </Button>
            </div>
          </div>
        </section>

        <section className='flex flex-col items-center w-full py-20 sm:py-40'>
          <FadeText>
            <h2 className='sm:text-5xl text-3xl mb-10 font-bold text-primary font-heading text-center'>
              We are committed to excellence in strategy
            </h2>
          </FadeText>

          <div className=' grid sm:grid-cols-2 gap-8 grid-rows-2 pt-5 sm:pt-10 relative '>
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className='bg-dark-navy rounded-lg flex flex-col gap-5 hover:scale-101 transition ease-in p-5 sm:p-10 hover:shadow-[0_8px_30px_rgb(255,255,255,0.1)] dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.07)]'>
      <div className='flex items-center justify-start'>{icon}</div>
      <h3 className='text-xl md:text-3xl font-heading font-bold'>{title}</h3>
      <p className=' text-base md:text-lg text-left font-normal'>{description}</p>
    </div>
  )
}

const services = [
  {
    icon: <Box2 size={56} color='white' />,
    title: 'Litigations',
    description:
      'Our skilled litigators are well-versed in handling a broad spectrum of civil and commercial litigation cases. Whether you require representation in a dispute resolution or need assistance with a lawsuit, we will vigorously advocate for your rights and protect your interests.',
  },
  {
    icon: <Handshake size={56} color='white' />,
    title: 'Agreements',
    description:
      'We offer comprehensive assistance in drafting, reviewing, and negotiating various agreements, including contracts, leases, partnership agreements, and more. Our goal is to ensure that your agreements are legally sound, protecting your rights and minimizing potential risks.',
  },
  {
    icon: <CircleUserRound size={56} />,
    title: 'Incorporation',
    description:
      'Starting a new business can be complex, but our firm is here to simplify the process. We provide expert guidance in incorporating new business entities, handling all necessary legal documentation, compliance requirements, and other legal aspects, allowing you to focus on building your business.',
  },
  {
    icon: <House2 size={56} color='white' />,
    title: 'Property Management',
    description:
      'Our team understands the intricacies of property-related legal matters. Whether you are a property owner, landlord, or tenant, we can assist you with lease agreements, property transfers, compliance issues, and other legal aspects of property management.',
  },
]
