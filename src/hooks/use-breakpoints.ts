import useMediaQuery from './use-media-query'

const BREAKPOINTS = {
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)',
}

export function useIsMobile(): boolean {
  return useMediaQuery(BREAKPOINTS.mobile)
}

export function useIsMobileToTablet(): boolean {
  return useMediaQuery('(max-width: 1023px)')
}

export function useIsTablet(): boolean {
  return useMediaQuery(BREAKPOINTS.tablet)
}

export function useIsDesktop(): boolean {
  return useMediaQuery(BREAKPOINTS.desktop)
}
