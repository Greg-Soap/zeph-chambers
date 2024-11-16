'use client'

import { InstagramLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons'
import { Facebook } from 'iconsax-react'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='bg-dark-navy'>
      <div className='container mx-auto px-4'>
        <div className='grid sm:grid-cols-4 gap-8 py-10 sm:py-20 items-start'>
          <div>
            <img
              className='bg-primary rounded-lg p-5 w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] object-contain'
              src='/assets/logo.svg'
              alt='Company logo'
            />
          </div>

          <FooterSection title='Office hours'>
            <p className='sm:text-lg text-sm  mt-2'>Monday - Friday</p>
            <p className='sm:text-lg text-sm '>8am - 4pm</p>
          </FooterSection>

          <FooterSection title='Contact Us'>
            <p className='sm:text-lg text-sm  mt-2'>Phone Number: 123-456-7890</p>
            <p className='sm:text-lg text-sm '>Email: anzeph@gmail.com</p>
          </FooterSection>

          <FooterSection title='Social'>
            <div className='flex gap-4 mt-2'>
              {socials.map((social) => (
                <SocialIcon key={social.href} {...social} />
              ))}
            </div>
          </FooterSection>
        </div>
        <div className='border-t mx-auto' />
        <p className='sm:text-lg text-sm  text-center py-8'>
          © {currentYear} | All Rights Reserved
        </p>
      </div>
    </footer>
  )
}

interface FooterSectionProps {
  title: string
  children: React.ReactNode
}

function FooterSection({ title, children }: FooterSectionProps) {
  return (
    <div>
      <h2 className='text-primary text-2xl font-bold'>{title}</h2>
      {children}
    </div>
  )
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <Link
      href={href}
      rel='noopener noreferrer'
      target='_blank'
      className='p-2 rounded-[8px] bg-primary text-primary-foreground w-10 h-10 flex items-center justify-center'>
      {icon}
    </Link>
  )
}

const socials = [
  { icon: <TwitterLogoIcon className='w-5 h-5' />, href: 'https://twitter.com' },
  { icon: <InstagramLogoIcon className='w-5 h-5' />, href: 'https://instagram.com' },
  { icon: <Facebook className='w-5 h-5' color='black' />, href: 'https://facebook.com' },
]
