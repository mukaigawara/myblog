import { GetStaticPathsContext, GetStaticProps } from 'next'
import {
  getAllCategories,
  getAllIdOfCategories,
  getAllIdOfCategory,
} from '../../../src/lib/posts'

type PageProps = {
  id: string
  category: string
}

export default function ExamplePage(props: PageProps) {
  const { id, category } = props
  return (
    <div>
      <p>{id}</p>
      <p>{category}</p>
    </div>
  )
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const paths: { params: { category: string; id: string } }[] = []
  const categories = getAllCategories()
  const ids = getAllIdOfCategories(categories)
  // const paths = [
  //   { params: { category: 'react', id: 'test' } },
  //   { params: { category: 'firebase', id: 'test' } },
  //   { params: { category: 'typeScript', id: 'test' } },
  // ]

  for (const category of categories) {
    for (const id of ids) {
      paths.push({ params: { category: category, id: id } })
    }
  }

  console.log(paths)

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const { id, category } = context.params as PageProps

  const props: PageProps = {
    id: id,
    category: category,
  }
  return { props }
}
