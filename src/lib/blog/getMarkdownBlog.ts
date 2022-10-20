// src/lib/blog/getMarkdownPosts.ts
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import externalLinks from 'rehype-external-links'
import lazyLoadPlugin from 'rehype-plugin-image-native-lazy-loading'

// <root>/posts/docs/配下の.mdxファイルを指定。
const docsDirectory = path.join(process.cwd(), 'posts/docs')

// // 全ての.mdxのファイル名の配列を返す
// export const getMarkdownPostsPaths = async () => {
//   const postList = fs.readdirSync(postDir).map((path) => path.split(/\.mdx/)[0])
//   return postList
// }

// // 全ての.mdxのメタデータとコンテンツを返す
// export const getMarkDownPosts = async () => {
//   const pathList = fs.readdirSync(postDir)
//   const contentsPromise = pathList.map(async (p) => {
//     const fullPath = path.join(postDir, p)
//     const filePath = fs.readFileSync(fullPath, 'utf8')
//     const { data, content } = matter(filePath)
//     const slug = p.split(/\.mdx/)[0]

//     return {
//       data,
//       slug,
//       content,
//     }
//   })

//   const contents = await Promise.all(contentsPromise)

//   return contents
// }

export function getAllPostsData() {
  const filenames = fs.readdirSync(docsDirectory)

  const posts = filenames.map((filename) => {
    const filePath = path.join(docsDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const matterResult = matter(fileContents).data

    return {
      filename,
      meta: matterResult,
      content: fileContents,
    }
  })
  return posts
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(docsDirectory)
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.mdx$/, ''),
      },
    }
  })
}
export async function getPostData(id: string) {
  const fullPath = path.join(docsDirectory, `${id}.mdx`)
  console.log(fullPath)

  const { data, content } = matter(fs.readFileSync(fullPath, 'utf8'))
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [[externalLinks, { target: '_blank' }]],
    },
  })

  // データを id および contentHtml と組み合わせる
  return {
    data,
    mdxSource,
  }
}
