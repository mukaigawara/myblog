import { Box, Heading, HStack, IconButton, Stack, Text } from '@chakra-ui/react'
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
        <Box as={'main'} mt={'40px'} w={'76%'} bg={''}>
          <HStack align={'start'} bg={'#'} py={3} borderRadius={'xl'}>
            {/* <IconButton icon={<ChevronLeftIcon />} aria-label={''}></IconButton> */}
            <Stack>
              <Heading fontSize={'45px'} className={styles.articleTitle}>
                {article.title}
              </Heading>
              <Text color={'#413F42'}>{article.publishedAt}</Text>
            </Stack>
          </HStack>
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
