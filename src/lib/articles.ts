import fs from 'fs'
import path from 'path'

interface Article {
  title: string
  description: string
  author: string
  date: string
}

export interface ArticleWithSlug extends Article {
  slug: string
}

async function importArticle(
  articleFilename: string,
): Promise<ArticleWithSlug> {
  let { article } = (await import(`../app/articles/${articleFilename}`)) as {
    default: React.ComponentType
    article: Article
  }

  return {
    slug: articleFilename.replace(/(\/page)?\.mdx$/, ''),
    ...article,
  }
}

export async function getAllArticles() {
  let articlesDir = path.join(process.cwd(), 'src/app/articles')
  let entries: string[] = []

  try {
    let dirs = fs.readdirSync(articlesDir, { withFileTypes: true })
    for (let dir of dirs) {
      if (dir.isDirectory()) {
        let mdxPath = path.join(articlesDir, dir.name, 'page.mdx')
        if (fs.existsSync(mdxPath)) {
          entries.push(`${dir.name}/page.mdx`)
        }
      }
    }
  } catch {
    return []
  }

  let articles = await Promise.all(entries.map(importArticle))

  return articles.sort((a, z) => +new Date(z.date) - +new Date(a.date))
}
