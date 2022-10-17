import { Box, Center, Stack } from '@chakra-ui/react'
import React from 'react'
import { Footer } from '../Footer'
import { Navbar } from '../Navbar'

interface BaseLayoutProps {
  children: React.ReactNode
}

export const BaseLayout = (props: BaseLayoutProps) => {
  const { children } = props
  return (
    <>
      <Box w={'100%'} bg={'green'}>
        <Box w={'80%'} mx={'auto'}>
          <Navbar />
          <Box bg={'yellow'}>{children}</Box>
          <Footer />
        </Box>
      </Box>
    </>
  )
}
