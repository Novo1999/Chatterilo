import { useEffect, useRef } from 'react'

const useDebounce = (cb: Function, wait: number) => {
  const timeoutIdRef: any = useRef(null)

  const debouncedCallback = (...args: Function[]) => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current)
    }
    timeoutIdRef.current = setTimeout(() => {
      cb(...args)
    }, wait)
  }

  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current)
      }
    }
  }, [])
  return debouncedCallback
}
export default useDebounce
