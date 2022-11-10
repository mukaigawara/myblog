import { Box, HStack, Text, Icon, Spacer, Heading } from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { FaTwitter } from 'react-icons/fa'
import { useRouter } from 'next/router'

export const Navbar = () => {
  const router = useRouter()
  return (
    <Box
      h={'60px'}
      bg={'gray.100'}
      // boxShadow={
      //   'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px'
      // }
      borderRadius={'lg'}
      borderColor={'#413F42'}
      color={'#0F3460'}
      p={2}
    >
      <HStack px={4}>
        <Heading
          color={'gray.500'}
          onClick={() => {
            router.push('/')
          }}
        >
          MUKAI Blog
        </Heading>
        <Spacer></Spacer>
        <HStack spacing={'20px'}>
          <Text fontWeight={'bold'}>ABOUT_ME</Text>
          <FaTwitter />
        </HStack>
      </HStack>
    </Box>
  )
}
