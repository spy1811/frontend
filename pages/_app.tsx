import React from 'react'
import { AppProps } from 'next/app'
import { ProvideAuth } from "../services/useAuth.js";
import 'tailwindcss/dist/base.css'

const App = ({ Component, pageProps }: AppProps) => (
  <ProvideAuth>
    <Component {...pageProps} />
  </ProvideAuth>
)

export default App
