import { Box, Heading, HStack, Stack, Tag, Text } from '@chakra-ui/react'
import { BaseLayout } from '../../components/layout/BaseLayout'
import { Article } from '../../types/article'
import 'highlight.js/styles/night-owl.css'
import styles from '../../styles/blogDetail.module.css'
import { getAllPostIds, getPostData } from '../../src/lib/blog/getMarkdownBlog'
import { MDXRemote } from 'next-mdx-remote'
import Head from 'next/head'

interface blogDetailPageProps {
  article: Article
  content: string
  source: any
  id: string
  // meta: any
}

export default function blogDetailPage(props: blogDetailPageProps) {
  const { content, source, id } = props
  console.log(source)
  return (
    <>
      {/* <Head>
        <title>{`${meta.title} | 可茂IT塾`}</title>
        <meta name="description" content={meta.description} key="description" />
        <meta property="og:url" content={url} key="og:url" />
        <meta property="og:title" content={meta.title} key="og:title" />
        <meta
          property="og:description"
          content={meta.description}
          key="og:description"
        />
      </Head> */}
      <BaseLayout>
        <Box>
          <Box as={'main'} mt={'40px'} w={'85%'} bg={''}>
            <Stack>
              <Box>
                <Box mt={'30px'}>
                  <Heading
                    color={'#0f3460'}
                    fontSize={'45px'}
                    className={styles.articleTitle}
                  >
                    'article.title'
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
                  // components={{
                  //   ...MDX_COMPONENTS,
                  // }}
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

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }: any) => {
  const { data, mdxSource } = await getPostData(params.id)

  return {
    props: {
      id: params.id,
      source: mdxSource,
      // meta: data,
    },
  }
}
