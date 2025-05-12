import styles from "./NewsCard.module.css";

interface NewsCardProps {
  title: string;
  source: string;
  publishedAt: string;
  url: string;
}

export function NewsCard({ title, source, publishedAt, url }: NewsCardProps) {
  return (
    <div className={styles.newsCard}>
      <h3>{title}</h3>
      <p>{new Date(publishedAt).toLocaleString()}</p>
      <p>
        <strong>Fonte:</strong> {source}
      </p>
      <a href={url} target="_blank">
        Ir para a notícia
      </a>
    </div>
  );
}
