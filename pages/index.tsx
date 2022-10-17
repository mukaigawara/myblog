import { Box, Link, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { BaseLayout } from '../components/layout/BaseLayout'

import { client } from '../libs/client'
import { Article } from '../types/article'

interface HomePageProps {
  article: Article[]
}

export default function HomePage({ article }: HomePageProps) {
  return (
    <>
      <BaseLayout>
        <Box h={'499px'} w={'500px'}></Box>
      </BaseLayout>
    </>
  )
}

export const getStaticProps = async () => {
  const endpoint = 'blogs'
  const data = await client.get({ endpoint })

  return {
    props: {
      article: data.contents || [],
    },
  }
}
