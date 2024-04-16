'use client'

import Image from 'next/image'
import Link from 'next/link'
import { bentoGridItems } from '@/constants/bento-item-map'

import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'

export default function RootLandingPage() {
  return (
    <>
      <div className="flex ">
        <h1>Chatdemo</h1>
        <Image
          src="/project-icon.svg"
          alt="project-icon"
          height={100}
          width={100}
        />
      </div>
      <Link href={'/servers'}>Get Started!</Link>

      <section>
        <h1>
          Have a <span className="text-primary">Real-time</span> talk with your
          friends
        </h1>
        {/* <Globe /> */}
      </section>
      <section>
        <h2 className="">Features</h2>
        <BentoGrid className="mx-auto max-w-4xl md:auto-rows-[20rem]">
          {bentoGridItems.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              icon={item.icon}
              header={item.header}
              className={item.className}
            />
          ))}
        </BentoGrid>
      </section>
      <section>
        <h2>Get Started!</h2>
        {/* <Carousel /> */}
      </section>
      <Link href={'/servers'}>Get Started!</Link>
    </>
  )
}
