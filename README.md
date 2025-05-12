# Projeto de Notícias com React e Vite

Este é um projeto web desenvolvido com React e Vite que consome a [News API](https://newsapi.org/) para exibir notícias do Brasil do dia anterior. A aplicação permite filtrar notícias por fonte e visualizar detalhes de cada artigo.

## Funcionalidades

- Lista de notícias do Brasil referentes ao dia anterior.
- Filtro por fonte de notícias.
- Detalhes completos de uma notícia selecionada.
- Visitar o site original da notícia.
- Paginação para navegar entre os resultados.

## Tecnologias Utilizadas

- **React**: Biblioteca para construção de interfaces.
- **Vite**: Ferramenta de build rápida para desenvolvimento.
- **Axios**: Para requisições HTTP à News API.
- **React Router**: Para navegação entre páginas.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 14 ou superior).
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/).

## Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/andriwfonseca/news-app.git
   cd news-app
   ```

2. **Instale as dependências:**
   - Com npm:
     ```bash
     npm install
     ```
   - Com Yarn:
     ```bash
     yarn install
     ```

## Configuração das Variáveis de Ambiente

Para usar a News API, você precisa de uma chave de API. Siga os passos abaixo:

1. **Crie uma conta na News API:**

   - Acesse [https://newsapi.org/](https://newsapi.org/).
   - Registre-se e obtenha sua chave de API (token).

2. **Configure o arquivo `.env`:**

   - Na raiz do projeto, crie um arquivo chamado `.env`.
   - Use o arquivo `.env.example` como base.
   - Adicione sua chave da API no seguinte formato:
     ```
     VITE_API_KEY=sua-chave-da-api-aqui
     VITE_BASE_URL=https://newsapi.org/v2/everything
     VITE_SOURCES_URL=https://newsapi.org/v2/top-headlines/sources
     ```

## Executando o Projeto

1. **Inicie o servidor de desenvolvimento:**

   - Com npm:
     ```bash
     npm run dev
     ```
   - Com Yarn:
     ```bash
     yarn dev
     ```

2. **Acesse a aplicação:**
   - Abra o navegador em `http://localhost:3000` (ou a porta exibida no terminal).

## Como Usar

- **Página Inicial:**

  - Veja a lista de notícias do dia anterior.
  - Use o filtro para selecionar uma fonte específica.
  - Clique em "Ver detalhes" para mais informações sobre uma notícia.
  - Clique em "Ir para a notícia" para visitar o site original da notícia.

- **Página de Detalhes:**
  - Mostra o conteúdo completo da notícia.
  - Inclui botões para voltar à página inicial ou visitar o site original da notícia.

## Estrutura do Projeto

- **`src/`**

  - `components/`: Componentes reutilizáveis (ex.: `NewsCard`).
  - `pages/`: Páginas principais (ex.: `Home`, `NewsDetails`).
  - `services/`: Lógica de comunicação com a API.

- **`.env.example`**: Modelo para o arquivo de ambiente.
