import { Tag } from '../../types/article'

export const getTagList = (allPostTags) => {
  // if (!allPostTags) return null

  const tags = allPostTags.map((v) => v.params.tag)
  const uniqTags = [...new Set(tags)]
  const tmpTagList = uniqTags.map((v) => ({
    name: v,
    count: tags.filter((x) => x === v).length,
  }))
  return tmpTagList.sort((a, b) => {
    if (a.count < b.count) {
      return 1
    } else {
      return -1
    }
  })
}
