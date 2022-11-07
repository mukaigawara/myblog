import { Box, Heading, HStack, Link, Stack, Text } from '@chakra-ui/react'
import { BaseLayout } from '../components/layout/BaseLayout'
import {
  getAllPostIds,
  getAllPostsData,
  getAllPostTags,
  getSortedPostsData,
} from '../src/lib/blog'
import { getCategoryPaths, getFileList, getFileName } from '../src/lib/posts'
import { getTagList } from '../src/lib/tags'
import { IoIosArrowForward } from 'react-icons/io'
import { CategoryList } from '../components/Category/CategoryList'

interface HomePageProps {
  categories: string[]
}

export default function HomePage(props: HomePageProps) {
  const { categories } = props

  return (
    <>
      <BaseLayout>
        <Box h={'1099px'} w={'500px'}>
          <CategoryList categories={categories} />
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
