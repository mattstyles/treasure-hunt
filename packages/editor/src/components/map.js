
import React, { useRef } from 'react'

export const Map = () => {
  const canvas = useRef(null)

  return (
    <canvas ref={canvas} />
  )
}
