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
      <Box w={'100%'} bg={'#F2F2F2'}>
        <Box w={'80%'} mx={'auto'} pt={'12px'}>
          <Navbar />
          <Box minHeight={'90vh'} mt={'85px'}>
            {children}
          </Box>
          <Footer />
        </Box>
      </Box>
    </>
  )
}
