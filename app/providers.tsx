'use client'

import { createContext, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { ThemeProvider } from 'next-themes'

function usePrevious<T>(value: T) {

    const ref = useRef<T | undefined>(undefined); // Set the initial value to `undefined`
    useEffect(() => {
      ref.current = value
    }, [value])

    return ref.current
}


export const AppContext = createContext<{ previousPathname?: string }>({})

export function Providers({ children }: { children: React.ReactNode }) {
  
    const pathname = usePathname()
    const previousPathname = usePrevious(pathname)

    return (
      <AppContext.Provider value={{ previousPathname }}>
        <ThemeProvider attribute="class" disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </AppContext.Provider>
    )
}
