// src/lib/blog/getMarkdownPosts.ts
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import externalLinks from 'rehype-external-links'
import lazyLoadPlugin from 'rehype-plugin-image-native-lazy-loading'

// <root>/posts/docs/配下の.mdxファイルを指定。
const blogsDirectory = path.join(process.cwd(), 'posts/blog')
const baseDirectory = path.join(process.cwd(), 'posts')
const postsDirectory = path.join(baseDirectory, 'blog')
// const seriesDirectory = path.join(baseDirectory, 'series')

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
  const filenames = fs.readdirSync(blogsDirectory)

  const posts = filenames.map((filename) => {
    const filePath = path.join(blogsDirectory, filename)
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
  const fileNames = fs.readdirSync(blogsDirectory)
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.mdx$/, ''),
      },
    }
  })
}


export function getSortedPostsData() {
  // /posts　配下のファイル名を取得する
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    // id を取得するためにファイル名から ".md" を削除する
    const id = fileName.replace(/\.mdx$/, '')

    // マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // 投稿のメタデータ部分を解析するために gray-matter を使う
    const matterResult = matter(fileContents)

    // データを id と合わせる
    return {
      id,
      ...matterResult.data,
    }
  })
  // 投稿を日付でソートする
  const sortedAllPostsData = allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })

  return sortedAllPostsData.filter((p) => p.private == null)
}

export function getAllPostTags() {
  const posts = getAllPostsData()
  const ret = []

  const filteredPosts = posts.filter((p) => p.meta.private == null)

  filteredPosts.forEach((post) => {
    post.meta.tags.forEach((e) => {
      ret.push({ params: { tag: e } })
    })
  })

  return ret
}

export function getSortedTagPostsData(tag) {
  const posts = getAllPostsData()
  const tagPosts = posts.filter((post) => post.meta.tags.includes(tag))

  const tagPostsData = tagPosts.map((tagPost) => {
    const id = tagPost.filename.replace(/\.mdx$/, '')
    const matterResult = tagPost.meta
    return {
      id,
      ...matterResult,
    }
  })

  return tagPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}
