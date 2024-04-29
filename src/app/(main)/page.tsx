'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { bentoGridItems } from '@/constants/bento-item-map'
import { carouselItems } from '@/constants/carousel-item-map'
import { globeConfig, sampleArcs } from '@/constants/globe-settings'

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
import { ModeToggle } from '@/components/mode-toggle'
import { GithubButton } from '@/components/navigations/github-button'

export default function RootLandingPage() {
  const World = dynamic(
    () => import('@/components/ui/globe').then((m) => m.World),
    {
      ssr: false
    }
  )

  return (
    <div className="bg-gray-300/70 dark:bg-gray-900">
      <div className="container min-h-screen max-w-screen-lg">
        {/* sticky header */}
        <header className="bg-inherit/50 sticky top-0 z-30 w-full rounded-xl  backdrop-blur">
          <div className="flex h-16 items-center justify-between p-2 ">
            <div className="mr-auto flex items-center gap-x-1">
              <Image
                src="/project-icon.svg"
                alt="project-icon"
                height={48}
                width={48}
              />
              <h1 className="h-full font-mono text-lg font-bold">Chatdemo</h1>
            </div>
            <div className="flex flex-row-reverse items-center justify-between gap-x-1 md:gap-x-3">
              <Link href={'/servers'} className="h-10 w-16">
                <div className="text-md flex size-full items-center justify-center rounded-lg bg-indigo-600 text-white hover:bg-indigo-500">
                  Start!
                </div>
              </Link>
              <ModeToggle />
              <GithubButton />
            </div>
          </div>
        </header>
        <main className="relative py-8 bg-grid-black/[0.1] dark:bg-grid-white/[0.1]">
          {/* Radial gradient for the container to give a faded look */}
          <div className="pointer-events-none absolute inset-0 flex items-stretch justify-center bg-gray-300/70 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)] dark:bg-gray-900"></div>

          {/* globe hero section  */}
          <section className="mt-48 h-full md:h-[40rem]">
            <h1 className="absolute inset-x-0 z-20 text-center">
              {/* AceternityUI */}
              <CardContainer3d
                containerClassName="size-full"
                className="size-full flex-col"
              >
                <CardItem3d as={'span'} translateY={10} translateZ={160}>
                  <span className="text-2xl italic md:text-4xl">
                    text, talk, upload
                  </span>
                </CardItem3d>
                <br />
                <CardItem3d as={'span'} translateY={-20} translateZ={200}>
                  <span className="bg-gradient-to-r from-indigo-500 to-teal-500 bg-clip-text text-center text-4xl font-bold text-transparent md:text-6xl">
                    in Real-time
                  </span>
                </CardItem3d>
              </CardContainer3d>
            </h1>
            <div className="h-96 w-full md:h-full">
              <World data={sampleArcs} globeConfig={globeConfig} />
            </div>
          </section>

          {/* bento-grid features section */}
          <section className="mt-60">
            <h2 className="mb-4 text-center text-2xl font-bold md:text-4xl">
              Features
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
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
                      <CardItem3d
                        rotateZ={-5}
                        translateY={-20}
                        translateZ={120}
                      >
                        <CardTitle>{item.title}</CardTitle>
                      </CardItem3d>
                      <CardItem3d
                        rotateZ={-5}
                        translateY={-20}
                        translateZ={120}
                      >
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
          <section className="mt-60">
            <h2 className="mb-4 text-center text-2xl font-bold md:text-4xl">
              How to Start
            </h2>
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
                            <CardDescription>
                              {item.description}
                            </CardDescription>
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
        </main>
        <footer></footer>
      </div>
    </div>
  )
}
