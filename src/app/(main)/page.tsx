'use client'

import Image from 'next/image'
import Link from 'next/link'
import { bentoGridItems } from '@/constants/bento-item-map'
import { carouselItems } from '@/constants/carousel-item-map'

import { cn } from '@/lib/utils'
import { CardContainer3d, CardItem3d } from '@/components/ui/3d-card'
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
        <h2 className="mb-4 text-center text-2xl font-bold">Features</h2>
        <div className="grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {bentoGridItems.map((item, i) => (
            // AceternityUI
            <CardContainer3d
              key={i}
              containerClassName={cn('row-span-1', item.className)}
              className="size-full"
            >
              {/* shadcnUI */}
              <Card
                className={cn(
                  'row-span-1 flex size-full flex-col justify-between border border-zinc-300 [transform-style:preserve-3d] hover:shadow-2xl dark:border-zinc-700 [&>*]:[transform-style:preserve-3d]',
                  item.className
                )}
              >
                <CardHeader>
                  {/* AceternityUI */}
                  <CardItem3d rotateZ={-5} translateY={-20} translateZ={120}>
                    <CardTitle>{item.title}</CardTitle>
                  </CardItem3d>
                  <CardItem3d rotateZ={-5} translateY={-20} translateZ={120}>
                    <CardDescription>{item.description}</CardDescription>
                  </CardItem3d>
                </CardHeader>
                <div>
                  {/* AceternityUI */}
                  <CardItem3d as={'div'} rotateZ={5} translateZ={160}>
                    {/* shadcnUI */}
                    <CardContent className="w-full">
                      {item.component}
                    </CardContent>
                  </CardItem3d>
                </div>
              </Card>
            </CardContainer3d>
          ))}
        </div>
      </section>

      {/* carousel how-to-start section */}
      <section className="mb-24">
        <h2 className="mb-4 text-center text-2xl font-bold">How to Start</h2>
        <Carousel
          opts={{
            align: 'start',
            loop: false
          }}
        >
          <CarouselContent>
            {carouselItems.map((item, i) => (
              <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                {/* AceternityUI */}
                <CardContainer3d
                  containerClassName="size-full"
                  className="size-full"
                >
                  {/* shadcnUI */}
                  <Card
                    className={cn(
                      'flex size-full flex-col justify-between border border-zinc-300 [transform-style:preserve-3d] hover:shadow-2xl dark:border-zinc-700 [&>*]:[transform-style:preserve-3d]',
                      item.className
                    )}
                  >
                    <CardHeader>
                      {/* AceternityUI */}
                      <CardItem3d translateZ={120}>
                        <CardTitle>{item.title}</CardTitle>
                      </CardItem3d>
                      <CardItem3d translateZ={120}>
                        <CardDescription>{item.description}</CardDescription>
                      </CardItem3d>
                    </CardHeader>
                    <div>
                      {/* AceternityUI */}
                      <CardItem3d as={'div'} translateZ={160}>
                        {/* shadcnUI */}
                        <CardContent className="w-full">
                          {item.component}
                        </CardContent>
                      </CardItem3d>
                    </div>
                  </Card>
                </CardContainer3d>
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
