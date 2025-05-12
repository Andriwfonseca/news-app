import { useNavigate, useParams } from "react-router-dom";
import styles from "./NewsDetails.module.css";
import type { ApiErrorResponse, Article } from "../../interfaces";
import { useEffect, useState } from "react";
import { fetchArticleByUrl } from "../../services/newsApi";
import { Loader } from "../../components/Loader/Loader";
import { toast } from "react-toastify";

export default function NewsDetails() {
  const { url } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const fetchedArticle = await fetchArticleByUrl(url || "");
        setArticle(fetchedArticle);
      } catch (err) {
        const apiError = err as ApiErrorResponse;
        const apiMessage = apiError?.message || "Erro ao buscar artigo.";
        toast.error(apiMessage);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchArticle();
    }
  }, [url]);

  if (loading) {
    return (
      <main className={styles.container}>
        <Loader />
      </main>
    );
  }

  if (!article) {
    return (
      <main className={styles.container}>
        <section className={styles.errorCard}>
          <p className={styles.errorText}>Notícia não encontrada</p>
        </section>
        <nav className={styles.buttonContainer}>
          <button onClick={() => navigate("/")} className={styles.backButton}>
            Voltar
          </button>
        </nav>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <article>
        <header>
          <h1 className={styles.title}>{article.title}</h1>
          <div className={styles.meta}>
            <span className={styles.source}>{article.source.name}</span> ·{" "}
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleString()}
            </time>
          </div>
        </header>

        {article.urlToImage && (
          <figure>
            <img
              src={article.urlToImage}
              alt={article.title}
              className={styles.image}
            />
          </figure>
        )}

        <section className={styles.descriptionSection}>
          <p className={styles.description}>{article.description}</p>
        </section>

        <div className={styles.buttonContainer}>
          <button onClick={() => navigate("/")} className={styles.backButton}>
            Voltar
          </button>
          <a
            href={article.url}
            target="_blank"
            className={styles.fullNewsButton}
          >
            Ir para a notícia completa
          </a>
        </div>
      </article>
    </main>
  );
}
