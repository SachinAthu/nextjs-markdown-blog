import Head from 'next/head'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import Post from '../components/Post'
import { sortByDate } from '../utils'

export default function Home({ posts }) {
  // console.log(posts)

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Blog using NextJs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="posts">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  // get files from posts dir
  const files = fs.readdirSync(path.join('posts'))
  // console.log(files)

  // get slud and frontmatter from posts
  const posts = files.map(filename => {
    // create slug
    const slug = filename.replace('.md', '')

    // get frontmatter
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
    // console.log(slug, markdownWithMeta)
    const { data: frontmatter } = matter(markdownWithMeta)

    return {
      slug,
      frontmatter
    }
  })

  // console.log(posts)

  return {
    props: {
      posts: posts.sort(sortByDate)
    }
  }
}
