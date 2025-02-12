'use client'

import { LitigationCard } from './litigation-form'

interface Litigation {
  header: string
  body: string[]
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

export const LitigationList: Litigation[] = [
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
