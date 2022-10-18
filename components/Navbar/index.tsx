import { Box, HStack, Text, Icon, Spacer, Heading } from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { FaTwitter } from 'react-icons/fa'

export const Navbar = () => {
  return (
    <Box
      h={'60px'}
      //   bg={'white'}
      //   mx={'auto'}
      //   boxShadow={'md'}
      //   borderRadius={'lg'}
      //   position={'sticky'}
      //   top={'20px'}
      borderBottom={'1px'}
      borderColor={'#413F42'}
      color={'#0F3460'}
    >
      <HStack px={4}>
        <Heading>Blog</Heading>
        <Spacer></Spacer>
        <HStack spacing={'20px'}>
          <Text fontWeight={'bold'}>ABOUT_ME</Text>
          <FaTwitter />
        </HStack>
      </HStack>
    </Box>
  )
}
