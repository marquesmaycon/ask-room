import { prisma } from "@/lib/prisma"

import { Visibility } from "./generated/enums"

const roomsData = [
  {
    name: "Introdução ao React",
    description: "Conceitos básicos do React, componentes, props e estado.",
    userId: "user-1",
    chunk: `
        React é uma biblioteca JavaScript para construção de interfaces de usuário.
        Ele é baseado em componentes reutilizáveis e utiliza um fluxo de dados unidirecional.
        Os principais conceitos incluem componentes funcionais, props, estado e hooks como useState e useEffect.
      `,
    questions: [
      { question: "O que são componentes no React?", pinned: true },
      { question: "Qual a diferença entre props e state?", pinned: true },
      { question: "Quando devo usar useEffect?" },
      { question: "React é um framework ou biblioteca?" }
    ]
  },
  {
    name: "Clean Code na Prática",
    description: "Boas práticas para escrever código limpo e sustentável.",
    userId: "user-2",
    chunk: `
        Clean Code é um conjunto de práticas que visa tornar o código mais legível,
        manutenível e fácil de entender. Inclui nomes significativos, funções pequenas,
        baixo acoplamento e responsabilidade única.
      `,
    questions: [
      { question: "O que caracteriza um código limpo?", pinned: true },
      { question: "Por que nomes de variáveis são tão importantes?" },
      { question: "Funções grandes são sempre um problema?" }
    ]
  },
  {
    name: "Conceitos de Docker",
    description: "Introdução a containers e Docker.",
    userId: "user-3",
    chunk: `
        Docker é uma plataforma que permite criar, empacotar e executar aplicações em containers.
        Containers são ambientes isolados que garantem consistência entre desenvolvimento e produção.
      `,
    questions: [
      { question: "O que é um container?", pinned: true },
      { question: "Qual a diferença entre container e máquina virtual?" },
      { question: "Por que usar Docker em produção?" }
    ]
  },
  {
    name: "Banco de Dados Relacionais",
    description: "Fundamentos de bancos de dados SQL.",
    userId: "user-4",
    chunk: `
        Bancos de dados relacionais organizam dados em tabelas relacionadas entre si.
        Utilizam SQL como linguagem de consulta e garantem integridade através de chaves primárias e estrangeiras.
      `,
    questions: [
      { question: "O que é uma chave primária?", pinned: true },
      { question: "Quando usar chave estrangeira?" },
      { question: "O que é normalização?" }
    ]
  },
  {
    name: "APIs REST",
    description: "Boas práticas para criação de APIs RESTful.",
    userId: "user-5",
    chunk: `
        APIs REST utilizam padrões HTTP e são baseadas em recursos.
        Os métodos mais comuns são GET, POST, PUT, PATCH e DELETE.
        Uma boa API REST é stateless e previsível.
      `,
    questions: [
      { question: "Qual a diferença entre PUT e PATCH?", pinned: true },
      { question: "O que significa uma API ser stateless?" },
      { question: "Quando usar status HTTP 201?" }
    ]
  },
  {
    name: "Introdução à Inteligência Artificial",
    description: "Conceitos iniciais sobre IA.",
    userId: "user-1",
    chunk: `
        Inteligência Artificial é a área da computação que busca criar sistemas capazes
        de realizar tarefas que normalmente exigiriam inteligência humana.
        Inclui aprendizado de máquina, processamento de linguagem natural e visão computacional.
      `,
    questions: [
      { question: "O que diferencia IA de algoritmos tradicionais?", pinned: true },
      { question: "O que é machine learning?" }
    ]
  },
  {
    name: "Git e Controle de Versão",
    description: "Uso do Git no dia a dia.",
    userId: "user-2",
    chunk: `
        Git é um sistema de controle de versão distribuído.
        Ele permite acompanhar mudanças no código, trabalhar em equipe e manter histórico de alterações.
      `,
    questions: [
      { question: "Qual a diferença entre commit e push?", pinned: true },
      { question: "Para que servem branches?" }
    ]
  },
  {
    name: "Next.js e Server Side Rendering",
    description: "Renderização no Next.js.",
    userId: "user-3",
    chunk: `
        Next.js é um framework React que permite renderização no servidor,
        geração de sites estáticos e criação de APIs.
        SSR melhora SEO e tempo de carregamento inicial.
      `,
    questions: [
      { question: "O que é SSR no Next.js?", pinned: true },
      { question: "Quando usar SSG em vez de SSR?" }
    ]
  },
  {
    name: "Boas Práticas em Backend",
    description: "Arquitetura e organização de projetos backend.",
    userId: "user-4",
    chunk: `
        Boas práticas em backend incluem separação de responsabilidades,
        uso de camadas, validação de dados e tratamento de erros.
        Uma boa arquitetura facilita manutenção e escalabilidade.
      `,
    questions: [
      { question: "Por que separar camadas no backend?", pinned: true },
      { question: "Qual a importância da validação de dados?" },
      { question: "Como lidar com erros de forma consistente?" }
    ]
  }
]

async function main() {
  console.log("🌱 Iniciando seed...")

  await prisma.$transaction([
    prisma.user.upsert({
      where: { email: "ana@demo.dev" },
      update: {},
      create: {
        id: "user-1",
        name: "Ana Ribeiro",
        email: "ana@demo.dev",
        image: "https://i.pravatar.cc/150?img=12",
        emailVerified: true
      }
    }),
    prisma.user.upsert({
      where: { email: "lucas@demo.dev" },
      update: {},
      create: {
        id: "user-2",
        name: "Lucas Martins",
        email: "lucas@demo.dev",
        image: "https://i.pravatar.cc/150?img=32",
        emailVerified: true
      }
    }),
    prisma.user.upsert({
      where: { email: "mariana@demo.dev" },
      update: {},
      create: {
        id: "user-3",
        name: "Mariana Costa",
        email: "mariana@demo.dev",
        image: "https://i.pravatar.cc/150?img=47",
        emailVerified: true
      }
    }),
    prisma.user.upsert({
      where: { email: "pedro@demo.dev" },
      update: {},
      create: {
        id: "user-4",
        name: "Pedro Almeida",
        email: "pedro@demo.dev",
        image: "https://i.pravatar.cc/150?img=18",
        emailVerified: true
      }
    }),
    prisma.user.upsert({
      where: { email: "rafael@demo.dev" },
      update: {},
      create: {
        id: "user-5",
        name: "Rafael Souza",
        email: "rafael@demo.dev",
        image: "https://i.pravatar.cc/150?img=7",
        emailVerified: true
      }
    })
  ])

  for (const data of roomsData) {
    const room = await prisma.room.create({
      data: {
        name: data.name,
        description: data.description,
        visibility: Visibility.PUBLIC,
        userId: data.userId
      }
    })

    await prisma.roomChunk.create({
      data: {
        roomId: room.id,
        transcription: data.chunk.trim()
      }
    })

    await prisma.question.createMany({
      data: data.questions.map((q) => ({
        roomId: room.id,
        question: q.question,
        pinned: q.pinned ?? false
      }))
    })
  }

  console.log("✅ Seed finalizado com sucesso!")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
