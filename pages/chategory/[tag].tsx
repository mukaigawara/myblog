import { Box, Heading, Link, Stack, Text } from '@chakra-ui/react'
import { BaseLayout } from '../../components/layout/BaseLayout'
import {
  getSortedPostsData,
  getAllPostTags,
  getSortedTagPostsData,
} from '../../src/lib/blog'
import { getTagList } from '../../src/lib/tags'

interface HomePageProps {
  allPostsData: any[]
  allPostTags: any[]
  tag: string
}

export default function ChategoryDetailPage(props: HomePageProps) {
  const { allPostsData, allPostTags, tag } = props

  return (
    <>
      <BaseLayout>
        <Box h={'1099px'} w={'500px'}>
          <Heading mt={'20px'} fontSize={'50px'} color={'#0f3460'}>
            {tag}
          </Heading>
          <Box mt={'20px'}>
            <Heading fontSize={'30px'} color={'#0f3460'}>
              環境構築など
            </Heading>
            <Stack>
              {allPostsData.map((data) => (
                <Text>{data.id}</Text>
              ))}
            </Stack>
          </Box>
        </Box>
      </BaseLayout>
    </>
  )
}

export const getStaticProps = async ({ params }: any) => {
  const allPostsData = getSortedTagPostsData(params.tag)
  const allPostTags = getAllPostTags()
  const tag = params.tag
  return {
    props: {
      allPostsData,
      allPostTags,
      tag,
    },
  }
}

export const getStaticPaths = async () => {
  const paths = getAllPostTags()
  console.log(paths)

  return {
    paths,
    fallback: false,
  }
}
