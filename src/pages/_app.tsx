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
import { useEffect } from 'react'
import { getNewLoginKey } from '@/helpers'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const loginKey = window.localStorage.getItem("LOGIN_KEY")
    console.log('loginKey: ', loginKey)

    if (!loginKey) {
        const newLoginKey = getNewLoginKey();
        window.localStorage.setItem("LOGIN_KEY", newLoginKey);
        console.log('newLoginKey: ', newLoginKey)
    }
  }, [])

  return <Component {...pageProps} />
}
