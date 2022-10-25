import path from 'path'
import fs from 'fs'
const baseDirectory = path.join(process.cwd(), 'posts')
const docsDirectory = path.join(baseDirectory, 'docs')

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

export function getFileName() {
  const result = []
  const fileNames = fs.readdirSync(docsDirectory)
  fileNames.forEach((fileName) => {
    result.push({ params: { category: fileName } })
  })
  // { params: { id: '1' } }
  console.log(result)
  return result
}
export function getCategoryPaths() {
  return fs.readdirSync(docsDirectory)
}

export function getSeriesData(_category) {
  const seriesDirectory = path.join(docsDirectory, _category)
  return fs.readdirSync(seriesDirectory)
}

export function getFileList() {
  const results = []

  const categoryNames = fs.readdirSync(docsDirectory)
  categoryNames.forEach((category) => {
    const obj = {}
    obj.category = category

    const filePath = path.join(docsDirectory, category)
    const categories = fs.readdirSync(filePath)
    const seriesAry = []
    categories.forEach((series) => {
      let dataObj = {}
      const fileNames = getfileNameOfSeries(series, category)
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

export function getfileNameOfSeries(_series, _category) {
  const filePath = path.join(docsDirectory, `${_category}/${_series}`)
  const files = fs.readdirSync(filePath)
  return files
}

export function getFileListOfCategory(category) {
  let resultAry = []
  const allFileList = getFileList()
  allFileList.forEach((e) => {
    if (e.category === category) {
      console.log(e.data)
      resultAry = e.data
    }
  })
  console.log('resultAry', resultAry)
  return resultAry
}

export function replaceMdxPath(array) {
  // listのmdxを取り除いて返す
  array.forEach((m) => {
    m.replace(/\.mdx$/, '')
  })
  return array
}
