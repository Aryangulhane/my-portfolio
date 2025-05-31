import { useEffect, useCallback } from 'react'

const TRUSTED_ORIGINS = [
  'https://www.sanity.io',
  'https://aryanportfolio.sanity.studio',
  'http://localhost:3333'
]

export function usePostMessage() {
  const sendMessage = useCallback((message: any, targetOrigin: string = '*') => {
    // Validate target origin
    if (targetOrigin !== '*' && !TRUSTED_ORIGINS.includes(targetOrigin)) {
      console.warn(`Attempting to send message to untrusted origin: ${targetOrigin}`)
      return
    }

    // Send the message
    window.postMessage(message, targetOrigin)
  }, [])

  const receiveMessage = useCallback((callback: (event: MessageEvent) => void) => {
    const handleMessage = (event: MessageEvent) => {
      // Validate origin
      if (!TRUSTED_ORIGINS.includes(event.origin)) {
        console.warn(`Received message from untrusted origin: ${event.origin}`)
        return
      }

      // Process the message
      callback(event)
    }

    // Add event listener
    window.addEventListener('message', handleMessage)

    // Return cleanup function
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  return {
    sendMessage,
    receiveMessage
  }
} 