import '@/styles/css/bootstrap.min.css'
import '@/styles/css/animate.min.css'
import '@/styles/css/fontawesome-all.min.css'
import '@/styles/css/swiper-bundle.min.css'
import '@/styles/globals.css'
import '@/styles/css/default-icons.css'
import '@/styles/css/fonts.css'
import '@/styles/css/nerko-core.css'
import '@/styles/css/nerko-custom.css'
import '@/styles/css/nerko-unit.css'
import '@/styles/css/spacing.css'
import '@/styles/css/unicons.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
