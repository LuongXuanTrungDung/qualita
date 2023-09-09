import { useState, useEffect, useCallback } from 'react'

// Source: https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
export default function useWindowSize() {
  const getBreakpoints: (w: number | null) => string = (w: number | null) => {
    if (w) {
      if (w >= 1536) return 'xl'
      if (1200 <= w && w < 1536) return 'lg'
      if (900 <= w && w < 1200) return 'md'
      if (600 <= w && w < 900) return 'sm'
    }
    return 'xs'
  }

  const hasWindow = typeof window !== 'undefined'

  const getDimensions = useCallback(() => {
    const width = hasWindow ? window.innerWidth : null
    const height = hasWindow ? window.innerHeight : null
    return { width, height, breakpoint: getBreakpoints(width) }
  }, [hasWindow])

  const [dimensions, setDimensions] = useState(getDimensions())

  useEffect(() => {
    if (hasWindow) {
      window.addEventListener('resize', () => setDimensions(getDimensions()))
      return () =>
        window.removeEventListener('resize', () =>
          setDimensions(getDimensions()),
        )
    }
  }, [getDimensions, hasWindow])

  return dimensions
}
