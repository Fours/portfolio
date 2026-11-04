import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import App from './App'
import './index.css'

const posthogKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY

if (posthogKey) {
  posthog.init(posthogKey, {
    api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com',
    defaults: '2025-05-24',
    capture_pageview: true,
  })
}

const app = <App />

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {posthogKey ? <PostHogProvider client={posthog}>{app}</PostHogProvider> : app}
  </StrictMode>,
)
