import { Box, Heading, HStack, Icon, Link, Stack, Text } from '@chakra-ui/react'
import { BaseLayout } from '../../components/layout/BaseLayout'
import {
  getSortedPostsData,
  getAllPostTags,
  getSortedTagPostsData,
} from '../../src/lib/blog'
import { getTagList } from '../../src/lib/tags'
import { getFileListOfCategory, getFileName } from '../../src/lib/posts'
import { MdOutlineInsertDriveFile } from 'react-icons/md'

interface HomePageProps {
  allPostsData: any[]
  allPostTags: any[]
  tag: string
  fileList: {
    series: string
    fileNames: any[]
  }[]
}

export default function ChategoryDetailPage(props: HomePageProps) {
  const { allPostsData, allPostTags, tag, fileList } = props

  return (
    <>
      <BaseLayout>
        <Box h={'1099px'} w={'500px'}></Box>
      </BaseLayout>
    </>
  )
}

export const getStaticProps = async ({ params }: any) => {
  const fileList = getFileListOfCategory(params.category)
  const tag = params.category
  return {
    props: {
      tag,
      fileList,
    },
  }
}

export const getStaticPaths = async () => {
  const paths = getFileName()

  return {
    paths,
    fallback: false,
  }
}

const TagDetailPageContent = (props: HomePageProps) => {
  const { allPostsData, allPostTags, tag, fileList } = props
  return (
    <>
      <Heading
        my={'80px'}
        fontSize={'90px'}
        color={'#2d4a6e'}
        borderRadius={'3xl'}
        bg={'#f2f2f2'}
      >
        {tag}
      </Heading>
      <Box mt={'20px'}>
        <Stack spacing={10}>
          {fileList.map((data) => (
            <>
              <HStack
                borderBottom={'1px rgba(154, 182, 204, 0.591) solid'}
                align="end"
                py={2}
              >
                <Heading fontSize={'30px'} color={'#0f3460'}>
                  {data.series}
                </Heading>
                <Text fontSize={'20px'} color={'gray.700'}>
                  {data.fileNames.length}
                </Text>
              </HStack>

              <HStack>
                <MdOutlineInsertDriveFile />
                <Text
                  fontWeight={'bold'}
                  color={'gray.700'}
                  pl={2}
                  key={data.series}
                >
                  {data.fileNames}
                </Text>
              </HStack>
            </>
          ))}
        </Stack>
      </Box>
    </>
  )
}
