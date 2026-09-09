import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChirpApp } from '@/app/ChirpApp'
import '@/styles/tokens.css'
import '@/styles/base.css'
import '@/styles/shell.css'
import '@/styles/radio.css'
import '@/styles/settings.css'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Chirp root element was not found')
}

createRoot(root).render(
  <StrictMode>
    <ChirpApp />
  </StrictMode>,
)
