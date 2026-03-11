'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import { useThemeColor } from '@/shared/hooks/use-theme-color'
import { useCognitiveSpacing } from '@/components/ui/cognitive-styles'

export default function Pomodoro() {

  const DEFAULT_TIME = 25 * 60

  const foreground = useThemeColor({}, 'foreground')
  const muted = useThemeColor({}, 'muted')

  const { gap } = useCognitiveSpacing()

  const [seconds, setSeconds] = useState(DEFAULT_TIME)
  const [running, setRunning] = useState(false)

  useEffect(() => {

    if (!running) return

    const interval = setInterval(() => {

      setSeconds(prev => {

        if (prev <= 1) {
          setRunning(false)
          return DEFAULT_TIME
        }

        return prev - 1
      })

    }, 1000)

    return () => clearInterval(interval)

  }, [running])

  function formatTime() {

    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60

    return `${minutes.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`
  }

  function start() {
    setRunning(true)
  }

  function pause() {
    setRunning(false)
  }

  function reset() {
    setRunning(false)
    setSeconds(DEFAULT_TIME)
  }

  return (

    <Card
      style={{
        width: 220,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: gap,
        padding: 16
      }}
    >

      <h3
        style={{
          color: foreground,
          fontSize: 14,
          fontWeight: 600
        }}
      >
        Pomodoro
      </h3>

      <div
        style={{
          color: foreground,
          fontSize: 32,
          fontWeight: 700
        }}
      >
        {formatTime()}
      </div>

      <div style={{ display: 'flex', gap: 8 }}>

        {!running && (
          <Button
            title="Start"
            style={{ height: '32px' }}
            onClick={start}
          />
        )}

        {running && (
          <Button
            title="Pause"
            style={{ height: '32px' }}
            variant="secondary"
            onClick={pause}
          />
        )}

        <Button
          title="Reset"
          variant="ghost"
          style={{ height: '32px' }}
          onClick={reset}
        />

      </div>

      <div
        style={{
          fontSize: 12,
          color: muted,
          textAlign: 'center'
        }}
      >
        Sessão de foco de 25 minutos
      </div>

    </Card>

  )
}