import {
  Box,
  Heading,
  HStack,
  Icon,
  Link,
  Spacer,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { BaseLayout } from '../../components/layout/BaseLayout'
import {
  getSortedPostsData,
  getAllPostTags,
  getSortedTagPostsData,
} from '../../src/lib/blog'
import { getTagList } from '../../src/lib/tags'
import {
  getCategoryPaths,
  getFileListOfCategory,
  getFileName,
} from '../../src/lib/posts'
import { MdOutlineInsertDriveFile, MdOutlineFolderOpen } from 'react-icons/md'
import { children } from 'cheerio/lib/api/traversing'
import { Footer } from '../../components/Footer'
import { Navbar } from '../../components/Navbar'
import { CategoryList } from '../../components/Category/CategoryList'

interface HomePageProps {
  allPostsData: any[]
  allPostTags: any[]
  tag: string
  fileList: {
    series: string
    fileNames: any[]
  }[]
  categories: any[]
}

export default function ChategoryDetailPage(props: HomePageProps) {
  const { tag, fileList, categories } = props

  return (
    <>
      <Box w={'100%'} bg={'#F2F2F2'}>
        <Box w={'80%'} mx={'auto'} pt={'12px'}>
          <Navbar />
          <HStack align={'start'} minHeight={'90vh'}>
            <Box mt={'100px'} bg={'gray.200'} p={3} borderRadius={'xl'}>
              <CategoryList categories={categories} />
            </Box>
            <Spacer></Spacer>
            <Box borderRadius={'xl'} p={7} w={'700px'}>
              <TagDetailPageContent tag={tag} fileList={fileList} />
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

export const getStaticProps = async ({ params }: any) => {
  const fileList = getFileListOfCategory(params.category)
  const categories = getCategoryPaths()
  const tag = params.category
  return {
    props: {
      tag,
      fileList,
      categories,
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

interface TagDetailPageProps {
  tag: string
  fileList: {
    series: string
    fileNames: string[]
  }[]
}
const TagDetailPageContent = (props: TagDetailPageProps) => {
  const { tag, fileList } = props
  // console.log(fileList)
  return (
    <>
      <Box>
        <Heading
          // my={'80px'}
          fontSize={'99px'}
          color={'#2d4a6e'}
          borderRadius={'3xl'}
          bg={'#f2f2f2'}
        >
          {tag}
        </Heading>
        <Box mt={'20px'}>
          <Stack spacing={10}>
            {fileList.map((data) => (
              <Stack>
                <HStack
                  borderBottom={'1px rgba(154, 182, 204, 0.591) solid'}
                  align="end"
                  py={2}
                >
                  <HStack>
                    <MdOutlineFolderOpen />
                    <Heading fontSize={'30px'} color={'#0f3460'}>
                      {data.series}
                    </Heading>
                  </HStack>

                  <Text fontSize={'20px'} color={'gray.700'}>
                    {data.fileNames.length}
                  </Text>
                </HStack>

                {data.fileNames.map((m: string) => {
                  return (
                    <HStack>
                      <MdOutlineInsertDriveFile />
                      <Link
                        // href={`/category/react/test.mdx`}
                        fontWeight={'bold'}
                        color={'gray.700'}
                        pl={2}
                        key={data.series}
                        _hover={{ textDecoration: 'none', color: 'gray.400' }}
                      >
                        {m}
                      </Link>
                    </HStack>
                  )
                })}
              </Stack>
            ))}
          </Stack>
        </Box>
      </Box>
    </>
  )
}
