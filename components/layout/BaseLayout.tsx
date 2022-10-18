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
            <Box
              w={'25%'}
              minHeight={'90vh'}
              position={'sticky'}
              pt={'30px'}
              top={'63px'}
            >
              <Box borderRadius={'xl'}>
                <Heading color={'#0f3460'}>PAGES</Heading>
                <Box
                  h={'370px'}
                  bg={'gray.200'}
                  mt={3}
                  borderRadius={'xl'}
                  overflow={'scroll'}
                  p={3}
                >
                  <Stack>
                    <Text fontSize={'20px'} fontWeight={'bold'}>
                      環境構築など
                    </Text>
                    <Box
                      h={'2px'}
                      bg={'gray.300'}
                      borderRadius={'xl'}
                      mt={1}
                      w={'85%'}
                    ></Box>
                    <Box pb={2}>
                      <Text pl={2}>セットアップ</Text>
                      <Text pl={2}>セットアップ</Text>
                      <Text pl={2}>セットアップ</Text>
                      <Text pl={2}>セットアップ</Text>
                    </Box>

                    <Text fontSize={'20px'} fontWeight={'bold'}>
                      環境構築など
                    </Text>
                    <Box
                      h={'2px'}
                      bg={'gray.300'}
                      borderRadius={'xl'}
                      mt={1}
                    ></Box>
                    <Text pl={2}>セットアップ</Text>
                    <Text pl={2}>セットアップ</Text>
                    <Text pl={2}>セットアップ</Text>
                    <Text pl={2}>セットアップ</Text>
                    <Text fontSize={'20px'} fontWeight={'bold'}>
                      環境構築など
                    </Text>
                    <Box
                      h={'2px'}
                      bg={'gray.300'}
                      borderRadius={'xl'}
                      mt={1}
                    ></Box>
                    <Text pl={2}>セットアップ</Text>
                    <Text pl={2}>セットアップ</Text>
                    <Text pl={2}>セットアップ</Text>
                    <Text pl={2}>セットアップ</Text>
                    <Text fontSize={'20px'} fontWeight={'bold'}>
                      環境構築など
                    </Text>
                    <Text pl={2}>セットアップ</Text>
                    <Text pl={2}>セットアップ</Text>
                    <Text pl={2}>セットアップ</Text>
                    <Text pl={2}>セットアップ</Text>
                  </Stack>
                </Box>
              </Box>
              <Box h={'20px'}></Box>
              <Box>
                <Heading color={'#0f3460'}>CATEGORY</Heading>
                <Flex
                  gap={4}
                  wrap="wrap"
                  bg={'gray.200'}
                  borderRadius={'xl'}
                  py={4}
                  px={2}
                  mt={2}
                >
                  {[
                    'next.js',
                    'react',
                    'typeScript',
                    'typeScript',
                    'mtypeScriptd',
                    'typeScript',
                  ].map((size) => (
                    <Tag
                      size={'md'}
                      key={size}
                      borderRadius="full"
                      variant="solid"
                      bgColor={'#0f3460'}
                    >
                      <TagLabel>{size}</TagLabel>
                    </Tag>
                  ))}
                </Flex>
              </Box>
            </Box>
          </HStack>
        </Box>
        <Box h={'140px'}></Box>
        <Footer />
      </Box>
    </>
  )
}
