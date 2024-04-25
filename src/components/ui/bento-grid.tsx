import { BentoGridItemProps } from '@/constants/bento-item-map'

import { cn } from '@/lib/utils'

export const BentoGrid = ({
  className,
  children
}: {
  className?: string
  children?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        'grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-3 ',
        className
      )}
    >
      {children}
    </div>
  )
}

export const BentoGridItem = ({
  title,
  description,
  component,
  className
}: BentoGridItemProps) => {
  return (
    <div
      className={cn(
        'group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-transparent bg-white p-4 shadow-input transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none',
        className
      )}
    >
      {component}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        <div className="my-2 font-sans text-lg font-bold text-neutral-600 dark:text-neutral-200">
          {title}
        </div>
        <div className="font-sans text-base font-normal text-neutral-600 dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  )
}
