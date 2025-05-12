import axios, { type AxiosResponse } from "axios";
import type { Article } from "../interfaces";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const SOURCES_URL = import.meta.env.VITE_SOURCES_URL;

if (!API_KEY || !BASE_URL || !SOURCES_URL) {
  throw new Error(
    "As variáveis de ambiente VITE_API_KEY, VITE_BASE_URL ou VITE_SOURCES_URL não estão definidas."
  );
}

const MILLISECONDS_IN_A_DAY = 86400000;

interface FetchNewsParams {
  q: string;
  from: string;
  to: string;
  sortBy: string;
  apiKey: string;
  pageSize: number;
  page: number;
  sources?: string;
}

interface NewsApiResponse {
  articles: Array<Article>;
  totalResults: number;
}

const buildNewsParams = (source: string, page: number = 1): FetchNewsParams => {
  const yesterday = new Date(Date.now() - MILLISECONDS_IN_A_DAY)
    .toISOString()
    .split("T")[0];

  const params: FetchNewsParams = {
    q: "Brazil",
    from: yesterday,
    to: yesterday,
    sortBy: "publishedAt",
    apiKey: API_KEY,
    pageSize: 9,
    page,
  };

  if (source) params.sources = source;

  return params;
};

export const fetchNews = async (
  source: string,
  page: number = 1
): Promise<NewsApiResponse> => {
  const params = buildNewsParams(source, page);

  try {
    const response: AxiosResponse<NewsApiResponse> = await axios.get(BASE_URL, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar as notícias:", error);
    throw new Error("Erro ao buscar as notícias.");
  }
};

export const fetchSources = async (): Promise<
  Array<{ id: string; name: string }>
> => {
  const params = { apiKey: API_KEY };

  try {
    const response = await axios.get(SOURCES_URL, { params });
    return response.data.sources;
  } catch (error) {
    console.error("Erro ao buscar fontes", error);
    throw new Error("Erro ao buscar fontes.");
  }
};

export const fetchArticleByUrl = async (
  url: string
): Promise<Article | null> => {
  try {
    const firstResponse = await fetchNews("", 1);
    let fetchedArticle = firstResponse.articles.find((a) => a.url === url);

    if (fetchedArticle) return fetchedArticle;

    const totalResults = firstResponse.totalResults;
    const totalPages = Math.ceil(totalResults / 100);

    for (let page = 2; page <= totalPages; page++) {
      const response = await fetchNews("", page);
      fetchedArticle = response.articles.find((a) => a.url === url);
      if (fetchedArticle) return fetchedArticle;
    }

    return null;
  } catch (error) {
    console.error("Erro ao buscar o artigo", error);
    return null;
  }
};
