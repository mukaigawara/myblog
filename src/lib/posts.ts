import path from 'path'
import fs from 'fs'
import { getAllPostsData } from './blog'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'

const baseDirectory = path.join(process.cwd(), 'posts')
const docsDirectory = path.join(baseDirectory, 'docs')

export function getSortedPostsData() {
  // /posts　配下のファイル名を取得する
  const fileNames = fs.readdirSync(docsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    // id を取得するためにファイル名から ".md" を削除する
    const id = fileName.replace(/\.mdx$/, '')

    // マークダウンファイルを文字列として読み取る
    const fullPath = path.join(docsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // 投稿のメタデータ部分を解析するために gray-matter を使う
    const matterResult = matter(fileContents)

    // データを id と合わせる
    return {
      id,
      ...matterResult.data,
    }
  })
}
export function getAllPostTags() {
  const posts = getAllPostsData()
  const ret: any = []

  const filteredPosts = posts.filter((p: any) => p.meta.private == null)

  filteredPosts.forEach((post: any) => {
    post.meta.tags.forEach((e: any) => {
      ret.push({ params: { tag: e } })
    })
  })

  return ret
}

export function getFileName() {
  const result: { params: { category: string } }[] = []
  const fileNames = fs.readdirSync(docsDirectory)
  fileNames.forEach((fileName) => {
    result.push({ params: { category: fileName.toString() } })
  })
  return result
}
export function getAllCategories() {
  return fs.readdirSync(docsDirectory)
}

export function getSeriesData(_category: string) {
  const seriesDirectory = path.join(docsDirectory, _category)
  return fs.readdirSync(seriesDirectory)
}

export function getFileList() {
  const results: any = []

  const categoryNames = fs.readdirSync(docsDirectory)
  categoryNames.forEach((category) => {
    const obj: any = {}
    obj.category = category

    const filePath = path.join(docsDirectory, category)
    const categories = fs.readdirSync(filePath)
    const seriesAry: any = []
    categories.forEach((series) => {
      let dataObj: any = {}
      const fileNames = getIdOfSeries(category, series)
      const replaceFileNames = replaceMdxPath(fileNames)
      dataObj.series = series
      dataObj.fileNames = replaceFileNames
      seriesAry.push(dataObj)
    })
    obj.data = seriesAry
    results.push(obj)
  })

  // console.log('%o', results)
  return results
}

export function getIdOfSeries(category: string, series: string) {
  const filePath = path.join(docsDirectory, `${category}/${series}`)
  const files = fs.readdirSync(filePath)
  return files
}

export function getAllIdOfCategory(_category: string) {
  const series = getSeriesNameOfCategory(_category)
  let results: string[] = []

  series.forEach((_series) => {
    const filePath = path.join(docsDirectory, `${_category}/${_series}`)
    const files = fs.readdirSync(filePath)
    results = results.concat(files)
  })
  return results
}

export function getAllIdOfCategories(_categories: string[]) {
  let results: string[] = []
  _categories.forEach((category) => {
    results = results.concat(getAllIdOfCategory(category))
  })
  return results
}

// categoryからseriesNameを返す
export function getSeriesNameOfCategory(_category: string) {
  const filePath = path.join(docsDirectory, `${_category}`)
  const files = fs.readdirSync(filePath)

  return files
}

export function getFileListOfCategory(category: string) {
  let resultAry: any[] = []
  const allFileList = getFileList()
  allFileList.forEach((e: any) => {
    if (e.category === category) {
      resultAry = e.data
    }
  })
  // console.log('resultAry', resultAry)
  return resultAry
}

export function replaceMdxPath(array: any[]) {
  // listのmdxを取り除いて返す
  array.forEach((m) => {
    m.replace(/\.mdx$/, '')
  })
  return array
}

export async function getPostData(
  category: string,
  series: string,
  id: string
) {
  const fullPath = path.join(docsDirectory, `/${category}/${series}/${id}`)
  console.log(fullPath)

  const { data, content } = matter(fs.readFileSync(fullPath, 'utf8'))
  const mdxSource = await serialize(content, {
    // mdxOptions: {
    //   remarkPlugins: [[externalLinks, { target: '_blank' }]],
    // },
  })

  // データを id および contentHtml と組み合わせる
  return {
    data,
    mdxSource,
  }
}
