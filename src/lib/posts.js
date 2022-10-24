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
