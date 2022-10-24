import {
  Box,
  Center,
  Flex,
  Grid,
  Heading,
  HStack,
  SimpleGrid,
  Spacer,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { start } from 'repl'
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
          <HStack align={'start'}>
            <Box w={'75%'} minHeight={'90vh'}>
              {children}
            </Box>
            <Spacer></Spacer>
          </HStack>
        </Box>
        <Box h={'140px'}></Box>
        <Footer />
      </Box>
    </>
  )
}
