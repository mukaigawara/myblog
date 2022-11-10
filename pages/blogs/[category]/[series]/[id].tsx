import { Stack, Heading, HStack, Tag, Box, Text } from '@chakra-ui/react'
import { GetStaticPathsContext, GetStaticProps } from 'next'
import { MDXRemote } from 'next-mdx-remote'
import { mdxComponents } from '../../../../components/blog/mdxComponents'
import { BaseLayout } from '../../../../components/layout/BaseLayout'
import {
  getAllCategories,
  getAllIdOfCategories,
  getAllIdOfCategory,
  getIdOfSeries,
  getPostData,
  getSeriesNameOfCategory,
} from '../../../../src/lib/posts'

type PageProps = {
  id: string
  category: string
  series: string
  source: any
  meta: any
}

export default function ExamplePage(props: PageProps) {
  const { id, category, meta, source } = props
  return (
    <>
      <BaseLayout>
        <Box>
          <Box as={'main'} mt={'40px'} w={'85%'} bg={''}>
            <Stack>
              <Box>
                <Box mt={'30px'}>
                  <Heading
                    color={'#0f3460'}
                    fontSize={'45px'}
                    // className={styles.articleTitle}
                  >
                    {meta.title}
                  </Heading>
                </Box>
              </Box>

              <Box h={'20px'}></Box>
              <Box
                borderRadius={'md'}
                w={'100%'}
                bg={'gray.200'}
                mt={'40px'}
                p={3}
              >
                <HStack spacing={2}>
                  <Text fontWeight={'bold'}>Tag : </Text>
                  <Tag>Sample Tag</Tag>
                  <Tag>Sample Tag</Tag>
                  <Tag>Sample Tag</Tag>
                </HStack>
                <HStack mt={2}>
                  <Text fontWeight={'bold'}>createdAt : </Text>
                  {/* <Text>{article.createdAt}</Text> */}
                </HStack>
                <HStack mt={2}>
                  <Text fontWeight={'bold'}>revisedAt : </Text>
                  {/* <Text>{article.revisedAt}</Text> */}
                </HStack>
              </Box>
            </Stack>

            <Box mt={'52px'}>
              <div className="mdx">
                <MDXRemote
                  {...source}
                  components={mdxComponents}
                  // scope={meta}
                  lazy
                />
              </div>
            </Box>
          </Box>
        </Box>
      </BaseLayout>
    </>
  )
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const paths: { params: { category: string; series: string; id: string } }[] =
    []
  const categories = getAllCategories()
  // const ids = getAllIdOfCategories(categories)

  for (const category of categories) {
    const series = getSeriesNameOfCategory(category)
    series.forEach((_series) => {
      const ids = getIdOfSeries(category, _series)
      for (const id of ids) {
        paths.push({ params: { category: category, series: _series, id: id } })
      }
    })
  }

  console.log(paths)

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const { id, series, category } = context.params as PageProps
  const { data, mdxSource } = await getPostData(category, series, id)

  const props: PageProps = {
    id: id,
    source: mdxSource,
    series: series,
    meta: data,
    category: category,
  }
  return { props }
}
