import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, Heading } from '@chakra-ui/react'
import { MDXProvider } from '@mdx-js/react'
import { mdxComponents } from '../components/blog/mdxComponents'

const components = { mdxComponents }

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <MDXProvider components={components}>
        <Component {...pageProps} />
      </MDXProvider>
    </ChakraProvider>
  )
}

export default MyApp
