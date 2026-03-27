import { useEffect } from 'react'

export function useIframeResize() {
  useEffect(() => {
    const sendHeight = () => {
      const height = document.documentElement.scrollHeight
      window.parent.postMessage({ type: 'resize', height }, '*')
    }

    const resizeObserver = new ResizeObserver(sendHeight)
    resizeObserver.observe(document.body)
    sendHeight()

    return () => resizeObserver.disconnect()
  }, [])
}
