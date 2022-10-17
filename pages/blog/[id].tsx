import { Box } from '@chakra-ui/react'
import { client } from '../../libs/client'
import { Article } from '../../types/article'

interface blogDetailPageProps {
  article: Article
}

export default function blogDetailPage({ article }: blogDetailPageProps) {
  return (
    <Box>
      <h1>{article.title}</h1>
      <p>{article.publishedAt}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${article.content}`,
        }}
      />
    </Box>
  )
}

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: 'blogs' })

  const paths = data.contents.map((content: Article) => `/blog/${content.id}`)
  return { paths, fallback: false }
}

export const getStaticProps = async (context: any) => {
  const id = context.params.id
  const data = await client.get({ endpoint: 'blogs', contentId: id })

  return {
    props: {
      article: data,
    },
  }
}
