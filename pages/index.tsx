import { Box, Link, Stack, Text } from '@chakra-ui/react'
import { BaseLayout } from '../components/layout/BaseLayout'
import { getAllPostsData } from '../src/lib/blog/getMarkdownBlog'

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
              <Link href={`/blog/${data.filename}`}>{data.filename}</Link>
            ))}
          </Stack>
        </Box>
      </BaseLayout>
    </>
  )
}

export const getStaticProps = async () => {
  const allPostsData = getAllPostsData()

  return {
    props: {
      allPostsData,
    },
  }
}
