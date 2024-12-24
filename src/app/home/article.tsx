import { Card } from "@/components/Card";
import { ArticleWithSlug } from "@/lib/articles";
import { formatDate } from "@/lib/formatDate";


export default function Article({ article }: { article: ArticleWithSlug }) {
    return (
      <Card as="article" className="min-w-[300px] max-w-[300px] flex-shrink-0 p-4 mt-2 bg-slate-100 dark:bg-black rounded-2xl">
        <Card.Title href={`/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow as="time" dateTime={article.date} decorate>
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
    )
  }
  