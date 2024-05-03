'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { bentoGridItems } from '@/constants/bento-item-map'
import { carouselItems } from '@/constants/carousel-item-map'
import { globeConfig, sampleArcs } from '@/constants/globe-settings'
import Autoplay from 'embla-carousel-autoplay'

import { cn } from '@/lib/utils'
import { CardContainer3d, CardItem3d } from '@/components/ui/3d-card'
import { AuroraBackground } from '@/components/ui/aurora-background'
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
  CarouselItem
} from '@/components/ui/carousel'
import { Spotlight } from '@/components/ui/spotlight'
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
    <div className="relative flex flex-col bg-gray-300/70 bg-grid-black/[0.1] dark:bg-gray-900 dark:bg-grid-white/[0.1]">
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-stretch justify-center bg-gray-300/70 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)] dark:bg-gray-900"></div>

      {/* sticky header */}
      <header className="bg-inherit/50 fixed top-0 z-50 w-full rounded-xl backdrop-blur">
        <div className="container flex h-14 max-w-screen-lg items-center justify-between py-2 ">
          <div className="mr-auto flex items-center">
            <Image
              src="/project-icon.svg"
              alt="project-icon"
              height={40}
              width={40}
              className="mr-1 hidden md:flex"
            />
            <h1 className="font-mono text-base font-bold md:text-lg">
              Chatdemo
            </h1>
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

      {/* main content */}
      <main className="">
        {/* globe hero section  */}
        <section className="">
          <AuroraBackground className="">
            <div className="container relative flex h-full max-w-screen-lg flex-col items-center justify-center">
              <h1 className=" absolute z-10 text-center ">
                {/* AceternityUI */}
                <CardContainer3d
                  containerClassName="size-full"
                  className="size-full flex-col"
                >
                  <CardItem3d
                    as={'span'}
                    rotateZ={-10}
                    translateY={10}
                    translateZ={200}
                  >
                    <span className="text-2xl italic text-white md:text-4xl">
                      text, talk, upload
                    </span>
                  </CardItem3d>
                  <br />
                  <CardItem3d
                    as={'span'}
                    rotateZ={-10}
                    translateY={-20}
                    translateZ={240}
                  >
                    <span className="bg-gradient-to-r from-indigo-500 to-teal-500 bg-clip-text text-center text-4xl font-bold text-transparent md:text-6xl">
                      in Real-time
                    </span>
                  </CardItem3d>
                </CardContainer3d>
              </h1>
              <div className="h-96 w-full md:h-[44rem]">
                <World data={sampleArcs} globeConfig={globeConfig} />
              </div>
            </div>
          </AuroraBackground>
        </section>

        {/* bento-grid features section */}
        <section className="pt-60">
          <div className="container relative max-w-screen-lg">
            <Spotlight className="-top-60 hidden dark:inline" fill="white" />
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
          </div>
        </section>

        {/* carousel how-to-start section */}
        <section className="pt-60">
          <div className="container max-w-screen-lg ">
            <h2 className="mb-4 text-center text-2xl font-bold md:text-4xl">
              How to Start
            </h2>
            <Carousel
              opts={{
                align: 'start'
              }}
              plugins={[
                Autoplay({
                  delay: 5000
                })
              ]}
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
            </Carousel>
          </div>
        </section>
      </main>
      <footer>
        <div className="container flex max-w-screen-lg flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{' '}
            <Link
              href="https://twitter.com/maakintosh"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              maakintosh
            </Link>
            . The source code is available on{' '}
            <Link
              href="https://github.com/maakintosh/discord-clone"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </Link>
            .
          </p>
        </div>
      </footer>
    </div>
  )
}
