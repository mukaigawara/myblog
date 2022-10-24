import { Box, Heading, HStack, Stack, Tag, Text } from '@chakra-ui/react'
import { BaseLayout } from '../../components/layout/BaseLayout'
import { Article } from '../../types/article'
import 'highlight.js/styles/night-owl.css'
import styles from '../../styles/blogDetail.module.css'
import { getAllPostIds, getPostData } from '../../src/lib/blog'
import { MDXRemote } from 'next-mdx-remote'
import Head from 'next/head'
import { ReactNode } from 'react'

interface blogDetailPageProps {
  article: Article
  content: string
  mdxSource: any
  id: string
  meta: any
}

export default function blogDetailPage(props: blogDetailPageProps) {
  const { content, mdxSource, id, meta } = props
  return (
    <div>
      <MDXRemote
        {...mdxSource}
        components={{
          ...{},
        }}
        // scope={meta}
        lazy
      />
    </div>
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
      mdxSource: mdxSource,
      meta: data,
    },
  }
}
