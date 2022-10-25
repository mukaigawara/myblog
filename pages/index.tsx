import { Box, Heading, Link, Stack, Text } from '@chakra-ui/react'
import { BaseLayout } from '../components/layout/BaseLayout'
import {
  getAllPostIds,
  getAllPostsData,
  getAllPostTags,
  getSortedPostsData,
} from '../src/lib/blog'
import { getCategoryPaths, getFileList, getFileName } from '../src/lib/posts'
import { getTagList } from '../src/lib/tags'

interface HomePageProps {
  allPostsData: any[]
  allPostTags: any[]
  categories: string[]
}

export default function HomePage(props: HomePageProps) {
  const { allPostsData, allPostTags, categories } = props
  const tags = getTagList(allPostTags)

  return (
    <>
      <BaseLayout>
        <Box h={'1099px'} w={'500px'}>
          {/* <Heading>CATEGORY</Heading> */}
          <Stack>
            {categories.map((data) => (
              <Link
                key={data}
                href={`/chategory/${data}`}
                textDecoration={'none'}
                _hover={{ textDecoration: 'none' }}
              >
                {/* {data.name + `${data.count}`} */}
                <Box
                  p={3}
                  // bgColor={'gray.200'}
                  borderRadius={'xl'}
                  // boxShadow={'xl'}
                  color={'#0f3460'}
                >
                  <Heading fontSize={'50px'} _hover={{ color: '#39587e' }}>
                    {data}
                  </Heading>
                </Box>
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
  const allPostTags = getAllPostTags()
  const categories = getCategoryPaths()

  return {
    props: {
      allPostsData,
      allPostTags,
      categories,
    },
  }
}
