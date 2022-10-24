import { Box, Heading, Link, Stack, Text } from '@chakra-ui/react'
import { BaseLayout } from '../components/layout/BaseLayout'
import {
  getAllPostIds,
  getAllPostsData,
  getAllPostTags,
  getSortedPostsData,
} from '../src/lib/blog'
import { getTagList } from '../src/lib/tags'

interface HomePageProps {
  allPostsData: any[]
  allPostTags: any[]
}

export default function HomePage(props: HomePageProps) {
  const { allPostsData, allPostTags } = props
  const tags = getTagList(allPostTags)
  console.log(tags)

  return (
    <>
      <BaseLayout>
        <Box h={'1099px'} w={'500px'}>
          {/* <Heading>CATEGORY</Heading> */}
          <Stack>
            {tags.map((data) => (
              <Link
                key={data.name}
                href={`/chategory/${data.name}`}
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
                  <Heading fontSize={'30px'} _hover={{ color: '#39587e' }}>
                    {'・' + data.name + ` [ articles :  ${data.count} ] `}
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
  return {
    props: {
      allPostsData,
      allPostTags,
    },
  }
}
