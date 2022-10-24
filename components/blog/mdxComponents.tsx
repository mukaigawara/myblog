import { Heading, Text } from '@chakra-ui/react'

export const mdxComponents: any = {
  h1: (props: any) => (
    <Heading
      color={'#0f3460'}
      p={2}
      fontWeight={'bold'}
      fontSize={'35px'}
      mt={'40px'}
      mb={'30px'}
      pb={'7px'}
      borderBottom={'1px rgba(154, 182, 204, 0.591) solid'}
      {...props}
    />
  ),
  h2: (props: any) => (
    <Heading
      bgColor={'#39587e'}
      color={'#F2f2f2'}
      p={2}
      borderRadius={'xl'}
      fontWeight={'bold'}
      fontSize={'30px'}
      mt={'40px'}
      mb={'30px'}
      pb={'7px'}
      {...props}
    />
  ),
  h3: (props: any) => (
    <Heading
      color={'#0f3460'}
      p={2}
      fontWeight={'bold'}
      fontSize={'25px'}
      mt={'20px'}
      mb={'30px'}
      borderBottom={'1px rgba(154, 182, 204, 0.591) solid'}
      pb={'7px'}
      {...props}
    />
  ),
  h4: (props: any) => (
    <Heading
      color={'#0f3460'}
      p={2}
      fontWeight={'bold'}
      fontSize={'25px'}
      mt={'20px'}
      mb={'20px'}
      pb={'7px'}
      {...props}
    />
  ),
  h5: (props: any) => (
    <Heading
      color={'#0f3460'}
      p={2}
      fontWeight={'bold'}
      fontSize={'20px'}
      mt={'20px'}
      mb={'20px'}
      pb={'7px'}
      {...props}
    />
  ),
  p: (props: any) => {
    return (
      <Text
        lineHeight={'tall'}
        letterSpacing={'wide'}
        color={'#gray.300'}
        {...props}
      />
    )
  },
}
