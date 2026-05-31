# Ask Room

Aplicação colaborativa de perguntas e respostas com IA generativa, salas públicas/privadas, transcrição de áudio, busca semântica e respostas automáticas com Gemini.

[![Next.js](https://img.shields.io/badge/Next.js-16.0.10-000000?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.1-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.2-2D3748?logo=prisma)](https://www.prisma.io/)
[![Better Auth](https://img.shields.io/badge/Better_Auth-1.4-111827)](https://better-auth.com/)
[![Google Gemini](https://img.shields.io/badge/Gemini-AI-4285F4?logo=google)](https://ai.google.dev/)

## Demo

Projeto ao vivo: [ask-room.vercel.app](https://ask-room.vercel.app)

## Sobre

O Ask Room é uma plataforma para criar salas de Q&A onde participantes podem enviar perguntas e receber respostas geradas por IA com base no conteúdo da própria sala.

O projeto combina autenticação, controle de visibilidade, convites, transcrição de áudio, embeddings e busca vetorial para criar uma experiência de perguntas e respostas orientada por contexto.

## Funcionalidades

- Criação de salas públicas, privadas ou acessíveis por link.
- Autenticação com Better Auth.
- Dashboard com salas do usuário.
- Convites por e-mail para salas privadas.
- Envio, listagem e pinagem de perguntas.
- Gravação e transcrição de áudio usando Gemini.
- Geração de embeddings para busca semântica.
- Respostas automáticas com contexto recuperado da sala.
- Tema claro/escuro e componentes responsivos.

## Stack

- **Next.js 16** com App Router.
- **React 19** e **TypeScript**.
- **Hono** para rotas de API.
- **Prisma 7** com PostgreSQL.
- **Neon** como banco serverless.
- **pgvector** para busca semântica.
- **Google Gemini** para transcrição e geração de respostas.
- **Better Auth** para autenticação.
- **TanStack Query** e **TanStack Form**.
- **Radix UI**, **Tailwind CSS** e **shadcn/ui**.

## Arquitetura

```txt
.
├── app/                  # Rotas Next.js e API handler
├── components/           # Layout, formulário, tema e UI
├── features/
│   ├── chunks/           # Transcrição e embeddings
│   ├── question/         # Perguntas e respostas
│   └── room/             # Salas, convites e visibilidade
├── lib/                  # Auth, Prisma, RPC e providers
├── prisma/               # Schema, migrations e seed
└── services/             # Integração com Gemini
```

## Como executar

### Pré-requisitos

- Node.js 20 ou superior.
- npm.
- PostgreSQL com suporte a pgvector.
- Chave da API Gemini.

### Instalação

```bash
git clone https://github.com/marquesmaycon/ask-room.git
cd ask-room
npm install
```

Crie o arquivo `.env` com base em `.env.example`:

```env
DATABASE_URL=
GEMINI_API_KEY=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
```

Execute o projeto:

```bash
npm run dev
```

## Scripts disponíveis

```bash
npm run dev    # Inicia o ambiente local
npm run build  # Gera build de produção
npm run start  # Inicia o build gerado
npm run lint   # Executa ESLint
```

## Destaques técnicos

- Fluxo de RAG usando transcrições, embeddings e busca vetorial.
- Domínios separados por feature.
- Sessões e autenticação com Better Auth.
- Validação com Zod nas camadas de entrada.
- UI responsiva com componentes reutilizáveis.
- Banco relacional com modelos para salas, perguntas, chunks e convites.

---

<div align="center">
  <img src="https://github.com/marquesmaycon.png" width="100px" style="border-radius: 50%"/>
  <br/>
  <strong>Maycon Marques</strong>
  <br/>
  <br/>

  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mayconhenrique/)
  [![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat-square&logo=github&logoColor=white)](https://github.com/marquesmaycon)
  [![Email](https://img.shields.io/badge/Email-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:mayconmarquesh@gmail.com)
</div>
