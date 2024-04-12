'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { Toggle } from '@/components/ui/toggle'

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  function toggleTheme() {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  return (
    <Toggle asChild>
      <Button
        onClick={toggleTheme}
        variant="ghost"
        className="flex size-12 rounded-full border-2"
        style={{ width: 48, height: 48 }}
      >
        {/* The button displays an icon of a sun or a moon depending on the current theme */}
        <Sun className="size-10 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute size-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        {/* The text inside the span is "Toggle theme", which provides a description of the button's functionality for users who use a screen reader. */}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </Toggle>
  )
}
