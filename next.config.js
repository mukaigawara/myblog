/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  extension: /\.mdx?$/,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

module.exports = nextConfig

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // `MDXProvider`を使う場合はコメントを外すこと
    // providerImportSource: "@mdx-js/react",
  },
})
module.exports = withMDX(nextConfig)
