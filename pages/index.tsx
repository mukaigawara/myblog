import { Box, Link, Stack, Text } from '@chakra-ui/react'
import { BaseLayout } from '../components/layout/BaseLayout'
import {
  getAllPostIds,
  getAllPostsData,
  getSortedPostsData,
} from '../src/lib/blog'

interface HomePageProps {
  allPostsData: any[]
}

export default function HomePage(props: HomePageProps) {
  const { allPostsData } = props

  return (
    <>
      <BaseLayout>
        <Box h={'1099px'} w={'500px'}>
          <Stack>
            {allPostsData.map((data) => (
              <Link key={data.id} href={`/blog/${data.id}`}>
                {data.title}
              </Link>
            ))}
          </Stack>
        </Box>
      </BaseLayout>
    </>
  )
}

export const getStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  console.log(allPostsData)
  return {
    props: {
      allPostsData,
    },
  }
}
