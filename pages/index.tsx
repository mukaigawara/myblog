import { Box, Link, Stack, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { BaseLayout } from '../components/layout/BaseLayout'

import { client } from '../libs/client'
import { Article } from '../types/article'

interface HomePageProps {
  articles: Article[]
}

export default function HomePage({ articles }: HomePageProps) {
  return (
    <>
      <BaseLayout>
        <Box h={'1099px'} w={'500px'}>
          <Stack>
            {articles.map((article) => (
              <Link href={`/blog/${article.id}`}>{article.id}</Link>
            ))}
          </Stack>
        </Box>
      </BaseLayout>
    </>
  )
}

export const getStaticProps = async () => {
  const endpoint = 'blogs'
  const data = await client.get({ endpoint })

  return {
    props: {
      articles: data.contents || [],
    },
  }
}
