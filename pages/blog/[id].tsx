import {
  Box,
  Heading,
  HStack,
  IconButton,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react'
import { BaseLayout } from '../../components/layout/BaseLayout'
import { client } from '../../libs/client'
import { Article } from '../../types/article'
import * as cheerio from 'cheerio'
import hljs from 'highlight.js'
import 'highlight.js/styles/night-owl.css'
import styles from '../../styles/blogDetail.module.css'

interface blogDetailPageProps {
  article: Article
  content: string
}

export default function blogDetailPage(props: blogDetailPageProps) {
  const { article, content } = props
  console.log(content)
  return (
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
                  {article.title}
                </Heading>
                {/* <Box h={'5px'} bg={'gray.200'} borderRadius={'xl'} mt={4}></Box> */}
              </Box>

              {/* <Text color={'#0f3460'}>{article.publishedAt}</Text> */}
            </Box>

            <Box h={'20px'}></Box>
            <Box
              borderRadius={'md'}
              w={'100%'}
              // h={'80px'}
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
                <Text>{article.createdAt}</Text>
              </HStack>
              <HStack mt={2}>
                <Text fontWeight={'bold'}>revisedAt : </Text>
                <Text>{article.revisedAt}</Text>
              </HStack>
            </Box>
          </Stack>

          <Box mt={'52px'}>
            <div
              dangerouslySetInnerHTML={{
                __html: `${content}`,
              }}
            />
          </Box>
        </Box>
      </Box>
    </BaseLayout>
  )
}

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: 'blogs' })

  const paths = data.contents.map((content: Article) => `/blog/${content.id}`)
  return { paths, fallback: false }
}

export const getStaticProps = async (context: any) => {
  const id = context.params.id
  const article = await client.get({ endpoint: 'blogs', contentId: id })
  const { content } = article
  const $ = cheerio.load(content)
  $('pre code').each((_, element) => {
    const result = hljs.highlightAuto($(element).text())
    $(element).html(result.value)
    $(element).addClass('hljs')
  })
  $('img').each((_, element) => {
    $(element).html()
    $(element).addClass(`styles.blogContentImg`)
  })
  $('a').each((_, element) => {
    $(element).html()
    $(element).addClass(`styles.blogContentLink`)
  })
  $('h1').each((_, element) => {
    $(element).html()
    $(element).addClass(styles.heading1)
  })
  $('h2').each((_, element) => {
    $(element).html()
    $(element).addClass(styles.heading2)
  })
  $('h3').each((_, element) => {
    $(element).html()
    $(element).addClass(styles.heading3)
  })
  $('h4').each((_, element) => {
    $(element).html()
    $(element).addClass(styles.heading4)
  })
  $('p').each((_, element) => {
    $(element).html()
    $(element).addClass(styles.paragraph)
  })
  $('strong').each((_, element) => {
    $(element).html()
    $(element).addClass(styles.strongtext)
  })

  return {
    props: {
      article,
      content: $.html(),
    },
  }
}
