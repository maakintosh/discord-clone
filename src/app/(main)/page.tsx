'use client'

import Image from 'next/image'
import Link from 'next/link'
import { bentoGridItems } from '@/constants/bento-item-map'
import { carouselItems } from '@/constants/carousel-item-map'

import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'

export default function RootLandingPage() {
  return (
    <div className="container max-w-screen-lg">
      <div className="mb-24 flex">
        <h1>Chatdemo</h1>
        <Image
          src="/project-icon.svg"
          alt="project-icon"
          height={100}
          width={100}
        />
        <Link href={'/servers'}>Get Started!</Link>
      </div>

      {/* globe hero section  */}
      <section className="mb-24">
        <h1>
          Have a <span className="font-bold text-indigo-500">Real-time</span>{' '}
          communication
        </h1>
        {/* <Globe /> */}
      </section>

      {/* bento-grid features section */}
      <section className="mb-24">
        <h2 className="">Features</h2>
        <BentoGrid className="md:auto-rows-[20rem]">
          {bentoGridItems.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              component={item.component}
              className={item.className}
            />
          ))}
        </BentoGrid>
      </section>

      {/* carousel ready-to-start section */}
      <section className="mb-24">
        <h2 className="mb-4 text-center text-2xl font-bold">How to Start</h2>
        <Carousel
          opts={{
            align: 'start'
          }}
          className="w-full"
        >
          <CarouselContent>
            {carouselItems.map((item, i) => (
              <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full">
                  <CardHeader className="mb-8 h-1/4">
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="relative mx-auto aspect-square size-64 overflow-hidden rounded-lg border-2 border-zinc-700">
                    {item.component}
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
      <Link href={'/servers'}>Get Started!</Link>
    </div>
  )
}
