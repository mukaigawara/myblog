import { Stack, HStack, Heading, Box, Link } from '@chakra-ui/react'
import { IoIosArrowForward } from 'react-icons/io'
import { MdOutlineFolder } from 'react-icons/md'

interface CategoryListProps {
  categories: string[]
}

export const CategoryList = (props: CategoryListProps) => {
  const { categories } = props
  return (
    <Stack>
      {categories.map((category) => (
        <Link
          key={category}
          href={`/blogs/${category}`}
          textDecoration={'none'}
          _hover={{ textDecoration: 'none' }}
        >
          {/* {data.name + `${data.count}`} */}
          <Box
            p={3}
            // bgColor={'gray.200'}
            borderRadius={'xl'}
            // boxShadow={'xl'}
            color={'#0f3460'}
          >
            <HStack align={'end'}>
              <Box pb={2}>
                <MdOutlineFolder size={'25px'} />
              </Box>

              <Heading fontSize={'40px'} _hover={{ color: '#39587e' }}>
                {category}
              </Heading>
              <Box pb={2}>
                <IoIosArrowForward size={'25px'} />
              </Box>
            </HStack>
          </Box>
        </Link>
      ))}
    </Stack>
  )
}
