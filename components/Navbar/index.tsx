import { Box, HStack, Text, Icon, Spacer, Heading } from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { FaTwitter } from 'react-icons/fa'

export const Navbar = () => {
  return (
    <Box
      h={'60px'}
      bg={'gray.100'}
      boxShadow={'inner'}
      borderRadius={'lg'}
      borderColor={'#413F42'}
      color={'#0F3460'}
      p={2}
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
