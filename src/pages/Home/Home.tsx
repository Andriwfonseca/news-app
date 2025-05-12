import { useEffect, useState } from "react";
import { fetchNews, fetchSources } from "../../services/newsApi";
import { NewsCard } from "../../components/NewsCard/NewsCard";
import { FilterDropdown } from "../../components/FilterDropdown/FilterDropdown";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import styles from "./Home.module.css";
import { Loader } from "../../components/Loader/Loader";
import { Pagination } from "../../components/Pagination/Pagination";
import type { ApiErrorResponse, Article } from "../../interfaces";

interface Source {
  id: string;
  name: string;
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [selectedSource, setSelectedSource] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSources = async () => {
      try {
        const data = await fetchSources();
        setSources(data);
      } catch (err) {
        const apiError = err as ApiErrorResponse;
        const apiMessage = apiError?.message || "Erro ao buscar as fontes.";
        toast.error(apiMessage);
        console.error("Erro ao buscar fontes", err);
      }
    };

    loadSources();
  }, []);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchNews(selectedSource, currentPage);
        setArticles(data.articles);
        setTotalResults(data.totalResults);
      } catch (err) {
        const apiError = err as ApiErrorResponse;
        const apiMessage = apiError?.message || "Erro ao buscar notícias.";

        toast.error(apiMessage);
        toast.error(apiMessage);
        setError(apiMessage);
        setArticles([]);
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [selectedSource, currentPage]);

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <main className={styles.container}>
      <header>
        <h1 className={styles.title}>Notícias do Brasil - Dia Anterior</h1>
      </header>

      <section className={styles.filterContainer}>
        <label className={styles.filterLabel}>Selecione uma fonte:</label>
        <FilterDropdown
          sources={sources}
          onSelect={(value) => {
            setSelectedSource(value);
            setCurrentPage(1);
          }}
        />
      </section>

      <section className={styles.newsSection}>
        {loading ? (
          <Loader />
        ) : error ? (
          <p className={styles.error}>{error}</p>
        ) : articles.length === 0 ? (
          <p className={styles.message}>Nenhuma notícia encontrada.</p>
        ) : (
          <div className={styles.newsContainer}>
            {articles.map((article, index) => (
              <article key={index} className={styles.newsCardWrapper}>
                <NewsCard
                  title={article.title}
                  source={article.source.name}
                  publishedAt={article.publishedAt}
                  url={article.url}
                />
                <div className={styles.readMoreFooter}>
                  <Link
                    to={`/noticia/${encodeURIComponent(article.url)}`}
                    className={styles.readMoreLink}
                  >
                    Ver detalhes
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {totalPages > 1 && !loading && (
        <nav
          className={styles.paginationWrapper}
          aria-label="Navegação de páginas"
        >
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={setCurrentPage}
          />
        </nav>
      )}
    </main>
  );
}
