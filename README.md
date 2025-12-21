# 🎤 Ask Room - Q&A Colaborativo com IA

> 🚀 **Aplicação Next.js moderna** para criar e gerenciar salas de perguntas e respostas colaborativas com **IA generativa**, **transcrição de áudio**, **busca semântica** e **respostas automatizadas**.

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-7.x-2D3748?logo=prisma)](https://www.prisma.io/)
[![Better Auth](https://img.shields.io/badge/Better_Auth-1.4-8B5CF6)](https://better-auth.com/)
[![Hono](https://img.shields.io/badge/Hono-4.x-E36002)](https://hono.dev/)
[![Google AI](https://img.shields.io/badge/Google_AI-Gemini-4285F4?logo=google)](https://ai.google.dev/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.x-FF4154?logo=react-query)](https://tanstack.com/query)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?logo=postgresql)](https://neon.tech/)

## 📖 Sobre o Projeto

Sistema completo de **Q&A com IA** que permite criar salas de perguntas e respostas com **transcrição automática de áudio**, **busca semântica por embeddings** e **respostas geradas por IA**. Integra **Google Gemini** para processamento de linguagem natural, **Better Auth** para autenticação segura, e **PostgreSQL** com **extensão pgvector** para busca vetorial.

⚠️ **Importante**: Sistema em produção com IA generativa, autenticação segura e banco de dados PostgreSQL hospedado na Neon.

## ✨ Principais Funcionalidades

### 🔐 **Autenticação Segura**
- ✅ Registro e login de usuários com Better Auth
- ✅ Persistência de sessão com cookies seguros
- ✅ Proteção de rotas privadas
- ✅ Gerenciamento de contas e sessões

### 🏠 **Gerenciamento de Salas**
- ✅ Criar salas com três níveis de visibilidade:
  - 🌍 **Públicas** - Acessível para todos
  - 🔗 **Link** - Acessível por link direto
  - 🔒 **Privadas** - Acessível apenas por convite
- ✅ Listagem e busca de salas públicas
- ✅ Dashboard com minhas salas
- ✅ Edição e exclusão de salas
- ✅ Sistema de convites por e-mail para salas privadas

### 🎙️ **Transcrição de Áudio com IA**
- ✅ Gravação de áudio diretamente no navegador
- ✅ Transcrição automática usando Google Gemini 2.5 Flash
- ✅ Processamento em português do Brasil
- ✅ Geração de embeddings para busca semântica
- ✅ Chunking automático para melhor performance

### 🤖 **Sistema de Q&A com IA**
- ✅ Perguntas respondidas automaticamente por IA
- ✅ Busca semântica usando embeddings (pgvector)
- ✅ RAG (Retrieval-Augmented Generation) com contexto da sala
- ✅ Respostas baseadas no conteúdo transcrito
- ✅ Pinagem de perguntas importantes
- ✅ Feed em tempo real de perguntas e respostas

## 🛠️ Stack Tecnológica

### **Frontend Core**
- ⚛️ **Next.js 16** - Framework React com App Router e Server Actions
- 📘 **TypeScript 5.x** - Tipagem estática
- ⚛️ **React 19** - Biblioteca principal com novos hooks

### **Backend & API**
- 🔥 **Hono.js** - Framework web ultra-rápido para API routes
- 🔐 **Better Auth** - Autenticação moderna e type-safe
- 🗃️ **Prisma ORM 7.x** - ORM de tipo seguro com PostgreSQL
- 🐘 **PostgreSQL (Neon)** - Banco de dados serverless
- 🔍 **pgvector** - Extensão PostgreSQL para busca vetorial

### **IA & Machine Learning**
- 🤖 **Google Gemini 2.5 Flash** - Modelo de IA para transcrição e geração
- 🧠 **Text Embedding 004** - Geração de embeddings para busca semântica
- 📊 **Vector Search** - Busca por similaridade usando embeddings

### **Gerenciamento de Estado & Dados**
- 🔄 **TanStack Query v5** - Cache, sincronização e invalidação
- 📝 **TanStack Form** - Formulários reativos com validação
- ✅ **Zod v4** - Schema validation e type inference
- 🍪 **Cookies** - Gestão de sessão segura

### **UI & Styling**
- 🎨 **Shadcn UI** - Sistema de componentes acessíveis
- 💨 **Tailwind CSS v4** - Utility-first CSS framework
- 🌗 **next-themes** - Suporte a tema claro/escuro
- 🎯 **Lucide React** - Ícones modernos e customizáveis
- 🔔 **Sonner** - Toast notifications elegantes

### **Qualidade de Código**
- 🔍 **ESLint 9** - Análise estática de código
- 💅 **Prettier** - Formatação automática
- 📏 **TypeScript Strict Mode** - Tipagem rigorosa
- 🔌 **TanStack Query ESLint Plugin** - Regras específicas para queries

## 🏗️ Arquitetura do Projeto

```
app/
├── (private)/             # 🔒 Rotas protegidas (requer autenticação)
│   └── dashboard/         # Dashboard do usuário
│       ├── page.tsx       # Lista de salas do usuário
│       ├── create-room/   # Formulário de criação
│       └── room/          # Detalhes e edição de sala
├── (public)/              # 🌍 Rotas públicas
│   ├── (auth)/            # Autenticação
│   │   ├── sign-in/       # Login
│   │   └── sign-up/       # Registro
│   └── (root)/            # Home e salas públicas
│       ├── page.tsx       # Landing page
│       └── room/          # Visualização de sala
└── api/
    └── [...route]/        # API com Hono.js
        └── route.ts       # Rotas de API centralizadas

components/
├── ui/                    # Componentes Shadcn UI base
├── form/                  # Componentes de formulário
│   ├── input-field.tsx
│   ├── select-field.tsx
│   ├── textarea-field.tsx
│   └── submit-button.tsx
├── layout/                # Layout e navegação
│   ├── header.tsx
│   ├── footer.tsx
│   └── user-menu.tsx
└── theme-switcher.tsx     # Toggle de tema claro/escuro

features/
├── auth/                  # 🔐 Autenticação
│   ├── actions.ts         # Server actions de auth
│   ├── schemas.ts         # Schemas Zod de validação
│   └── components/
│       ├── sign-in-form.tsx
│       ├── sign-up-form.tsx
│       └── social-providers.tsx
└── room/                  # 🏠 Gerenciamento de salas
    ├── room-service.ts    # Lógica de negócio
    ├── schemas.ts         # Schemas de validação
    ├── components/
    │   ├── room-form.tsx              # Formulário de criação/edição
    │   ├── room-list.tsx              # Lista de salas
    │   ├── room-details.tsx           # Detalhes da sala
    │   ├── room-page.tsx              # Página completa de sala
    │   ├── my-rooms.tsx               # Dashboard de salas do usuário
    │   ├── room-question-form.tsx     # Formulário de perguntas
    │   ├── record-room-audio.tsx      # Gravador de áudio
    │   └── feed-room-context.tsx      # Contexto do feed
    ├── hooks/
    │   ├── use-rooms.ts               # Lista salas públicas
    │   ├── use-my-rooms.ts            # Lista minhas salas
    │   ├── use-room.ts                # Detalhes de sala
    │   ├── use-room-details.ts        # Detalhes estendidos
    │   ├── use-feed-room.ts           # Feed de Q&A
    │   ├── use-create-room.ts         # Criar sala
    │   ├── use-update-room.ts         # Atualizar sala
    │   ├── use-create-room-question.ts # Criar pergunta
    │   ├── use-delete-room-question.ts # Deletar pergunta
    │   ├── use-pin-question.ts        # Pinegar pergunta
    │   └── use-upload-room-audio.ts   # Upload de áudio
    └── server/
        └── route.ts                   # Rotas API do Hono

lib/                       # 🛠️ Utilitários e configurações
├── auth.ts                # Configuração Better Auth
├── auth-client.ts         # Cliente de autenticação
├── prisma.ts              # Cliente Prisma singleton
├── rpc.ts                 # Cliente RPC para comunicação API
├── session-middleware.ts  # Middleware de sessão Hono
├── tanstack-query.ts      # Configuração TanStack Query
└── utils.ts               # Funções utilitárias

prisma/
├── schema.prisma          # 📊 Definição de modelos
│   ├── User               # Usuário com Better Auth
│   ├── Session            # Sessões
│   ├── Account            # Contas vinculadas
│   ├── Room               # Salas de Q&A
│   ├── RoomChunk          # Chunks de transcrição com embeddings
│   ├── Question           # Perguntas com respostas
│   └── Invite             # Convites para salas privadas
├── migrations/            # Histórico de migrações SQL
└── generated/             # Tipos TypeScript gerados

services/
└── gemini.ts              # 🤖 Integração Google Gemini
    ├── transcribeAudio()      # Transcrição de áudio
    ├── generateEmbeddings()   # Geração de embeddings
    └── generateAnswer()       # Geração de respostas
```

## 🚀 Como Executar

### **Pré-requisitos**
- 📦 Node.js 18+
- 📦 npm, yarn ou pnpm
- 🐘 Banco de dados PostgreSQL (recomendado: [Neon](https://neon.tech/))
- 🔑 API Key do Google Gemini ([Obter aqui](https://ai.google.dev/))

### **Instalação**
```bash
# Clone o repositório
git clone https://github.com/marquesmaycon/ask-room

cd ask-room

# Instale as dependências
npm install
```

### **Configuração de Ambiente**

Crie um arquivo `.env.local` na raiz do projeto:

```bash
# Database (PostgreSQL com pgvector)
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"

# Better Auth
BETTER_AUTH_SECRET="seu-secret-aleatório-aqui"
BETTER_AUTH_URL="http://localhost:3000"

# Google Gemini
GEMINI_API_KEY="sua-api-key-aqui"
```

### **Setup do Banco de Dados**

```bash
# Gerar cliente Prisma
npx prisma generate

# Executar migrações
npx prisma migrate deploy

# (Opcional) Abrir Prisma Studio
npx prisma studio
```

### **Executar o Projeto**

```bash
# Modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar build de produção
npm start
```

Acesse [http://localhost:3000](http://localhost:3000)

### **Comandos Disponíveis**
```bash
npm run dev              # 🚀 Servidor de desenvolvimento
npm run build            # 🏗️ Build para produção
npm run start            # ▶️ Executar build de produção
npm run lint             # 🔍 Análise de código com ESLint
```


## 🎯 Destaques Técnicos

### **🤖 IA & Machine Learning**
- 🎙️ Transcrição de áudio em tempo real com Gemini 2.5 Flash
- 🧠 Geração de embeddings para busca semântica (768 dimensões)
- 🔍 Busca vetorial usando pgvector com operador de distância coseno
- 📚 RAG (Retrieval-Augmented Generation) para respostas contextuais
- 🎯 Threshold de similaridade ajustado (>0.7) para resultados relevantes
- 🗂️ Chunking inteligente de transcrições para melhor performance

### **⚡ Otimizações de Performance**
- 🚀 Server Components por padrão
- 🔄 Client Components apenas onde necessário
- 💾 Cache inteligente com TanStack Query
- ⚡ Prefetch de dados com TanStack Query nos Server Components
- 🌐 API Routes otimizadas com Hono.js
- 📊 Queries SQL otimizadas com Prisma
- 🎯 Lazy loading de componentes

### **🎨 Experiência do Usuário**
- ⏳ Loading states em todas as ações
- 🎯 Estados vazios informativos
- 🚨 Tratamento de erros contextual
- 📱 Design totalmente responsivo
- ⌨️ Navegação por teclado
- 🌗 Suporte a tema claro/escuro
- 🔔 Notificações toast elegantes

### **🔐 Segurança & Validação**
- 🛡️ Autenticação segura com Better Auth
- 🔒 Proteção de rotas com middleware
- ✅ Validação de formulários com Zod
- 🔑 Gestão de sessões segura com cookies
- 👁️ Controle de visibilidade de salas (Public/Link/Private)
- 📧 Sistema de convites por e-mail

### **💻 Desenvolvimento**
- 📘 TypeScript strict mode para type safety
- 🔍 ESLint para qualidade de código
- 💅 Prettier para formatação consistente
- 🏗️ Arquitetura modular e escalável
- 🎨 Componentes separados por features
- 🔄 Hot reload em desenvolvimento
- 📦 Code splitting automático

## 🌐 Fluxo da Aplicação

```
1. 📝 Registro/Login
   └─> Autenticação via Better Auth
   └─> Persistência de sessão

2. 🏠 Criar Sala
   ├─> Definir nome e descrição
   ├─> Escolher visibilidade (Public/Link/Private)
   ├─> Se privada: adicionar e-mails para convite
   └─> Sala criada e pronta para uso

3. 🎙️ Gravar Áudio
   ├─> Gravar diretamente no navegador
   ├─> Transcrição automática com Gemini 2.5 Flash
   ├─> Geração de embeddings (Text Embedding 004)
   ├─> Chunking do texto transcrito
   └─> Armazenamento no PostgreSQL com pgvector

4. 💬 Fazer Pergunta
   ├─> Usuário digita pergunta
   ├─> Sistema gera embedding da pergunta
   ├─> Busca vetorial nos chunks (similaridade > 0.7)
   ├─> RAG: Gemini gera resposta usando contexto relevante
   └─> Resposta exibida em tempo real

5. 📌 Gerenciar Q&A
   ├─> Visualizar feed de perguntas/respostas
   ├─> Pinegar perguntas importantes
   ├─> Deletar perguntas (apenas criador da sala)
   └─> Dashboard com histórico completo
```

## 🤖 Como Funciona a IA

### **Pipeline de Processamento de Áudio**

```
🎤 Áudio Gravado
    ↓
🔄 Conversão para Base64
    ↓
🤖 Google Gemini 2.5 Flash
    ↓
📝 Transcrição em PT-BR
    ↓
✂️ Chunking (Divisão em Partes)
    ↓
🧠 Geração de Embeddings (768D)
    ↓
💾 Armazenamento no PostgreSQL (pgvector)
```

### **Pipeline de Perguntas e Respostas**

```
❓ Pergunta do Usuário
    ↓
🧠 Geração de Embedding da Pergunta
    ↓
🔍 Busca Vetorial (Cosine Similarity)
    ↓
📊 Top Chunks Relevantes (similarity > 0.7)
    ↓
🤖 RAG com Gemini 2.5 Flash
    |
    ├─> Contexto: Chunks relevantes
    └─> Prompt: Responda baseado no contexto
    ↓
💬 Resposta Gerada
    ↓
💾 Armazenamento no Banco
    ↓
📱 Exibição em Tempo Real
```

### **Tecnologias de IA Utilizadas**

| Tecnologia | Uso | Modelo |
|------------|-----|--------|
| 🎙️ **Transcrição** | Converter áudio em texto | Gemini 2.5 Flash |
| 🧠 **Embeddings** | Vetorizar texto para busca | Text Embedding 004 |
| 🔍 **Busca Vetorial** | Encontrar conteúdo similar | pgvector (PostgreSQL) |
| 💬 **Geração de Respostas** | RAG para respostas contextuais | Gemini 2.5 Flash |

## 📱 Responsividade

- **Mobile First**: Design otimizado para dispositivos móveis
- **Breakpoints Tailwind**: sm, md, lg, xl, 2xl
- **Componentes Adaptáveis**: Layouts flexíveis que se ajustam a qualquer tela
- **Touch Friendly**: Botões e áreas de toque otimizadas

## ♿ Acessibilidade

- ✅ Navegação completa por teclado
- ✅ ARIA labels em todos os componentes interativos
- ✅ Foco visível em elementos focados
- ✅ Mensagens de erro descritivas
- ✅ Loading states anunciados para screen readers
- ✅ Contraste adequado em ambos os temas

<div align="center">
  <img src="https://github.com/marquesmaycon.png" width="100px" style="border-radius: 50%"/>
  <br/>
  <strong>Maycon Marques</strong>
  <br/>
  <br/>
  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mayconhenrique/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat-square&logo=github&logoColor=white)](https://github.com/marquesmaycon)
[![Email](https://img.shields.io/badge/Email-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:mayconmarquesh@gmail.com)

  ### Feito com  e muita 
</div>
