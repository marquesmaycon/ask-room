import { createRoomChunk } from "@/features/room/room-service"
import { prisma } from "@/lib/prisma"
import { generateEmbbedings } from "@/services/gemini"

const roomsData = [
  {
    name: "Zeus - Rei dos Deuses",
    description: "O soberano do Olimpo, deus dos céus e do trovão.",
    userId: "user-1",
    chunk: `
        Zeus é o deus dos céus e do trovão na mitologia grega, rei dos deuses do Olimpo. Filho dos titãs Cronos e Reia, é o mais jovem de seus irmãos. Zeus governa o Monte Olimpo como o pai dos deuses e dos homens, sendo conhecido por sua força e autoridade suprema. Seus símbolos incluem o raio, a águia, o touro e o carvalho. Zeus é casado com Hera, mas é famoso por suas numerosas aventuras amorosas com deusas e mortais. Como senhor dos céus, controla o clima, especialmente o trovão e a chuva, e é considerado o protetor da justiça, da ordem e da hospitalidade. Sua influência se estende sobre todos os aspectos da vida divina e mortal.
      `,
    questions: [
      {
        question: "Quais são os principais símbolos de Zeus?",
        answer:
          "Os símbolos de Zeus incluem o raio, a águia, o touro e o carvalho. Esses símbolos representam seu poder sobre os céus e sua autoridade suprema como rei dos deuses.",
        pinned: false,
        userId: "user-3"
      },
      {
        question: "Por que Zeus é considerado protetor da justiça e da hospitalidade?",
        answer:
          "Como senhor dos céus e pai dos deuses e dos homens, Zeus é considerado o protetor da justiça, da ordem e da hospitalidade. Sua influência se estende sobre todos os aspectos da vida divina e mortal.",
        pinned: false,
        userId: "user-5"
      },
      {
        question: "Qual é a relação familiar de Zeus com os titãs?",
        answer:
          "Zeus é filho dos titãs Cronos e Reia, sendo o mais jovem de seus irmãos. Ele governa o Monte Olimpo como rei dos deuses após vencer os titãs.",
        pinned: true,
        userId: "user-4"
      }
    ]
  },
  {
    name: "Hera - Rainha dos Deuses",
    description: "Deusa do casamento, das mulheres e da família.",
    userId: "user-1",
    chunk: `
        Hera é a deusa do casamento, da maternidade e das esposas na mitologia grega. Irmã e esposa de Zeus, é a rainha dos deuses olímpicos. Filha de Cronos e Reia, Hera preside as bodas e é o arquétipo da união no leito conjugal. Representada como majestosa e solene, muitas vezes coroada, Hera geralmente ostenta na mão uma romã, símbolo da fertilidade. A vaca e o pavão são seus animais simbólicos principais. Retratada como ciumenta e agressiva contra qualquer relação extraconjugal de Zeus, odiava e perseguia as amantes do marido e os filhos bastardos gerados desses relacionamentos. Apesar de sua personalidade vingativa nas histórias, era amplamente reverenciada como protetora do casamento e das mulheres casadas.
      `,
    questions: [
      {
        question: "Quais são os animais simbólicos de Hera?",
        answer:
          "A vaca e o pavão são os animais simbólicos principais de Hera. Esses animais representam sua majestade e posição como rainha dos deuses olímpicos.",
        pinned: false,
        userId: "user-2"
      },
      {
        question: "O que a romã simboliza em relação a Hera?",
        answer:
          "Hera geralmente ostenta na mão uma romã, que é símbolo da fertilidade. Isso está relacionado ao seu papel como deusa do casamento e da maternidade.",
        pinned: false,
        userId: "user-4"
      },
      {
        question: "Como Hera reagia às aventuras amorosas de Zeus?",
        answer:
          "Retratada como ciumenta e agressiva contra qualquer relação extraconjugal de Zeus, Hera odiava e perseguia as amantes do marido e os filhos bastardos gerados desses relacionamentos.",
        pinned: false,
        userId: "user-5"
      },
      {
        question: "Qual é o papel de Hera nas bodas e no casamento?",
        answer:
          "Hera preside as bodas e é o arquétipo da união no leito conjugal. Apesar de sua personalidade vingativa nas histórias, era amplamente reverenciada como protetora do casamento e das mulheres casadas.",
        pinned: false,
        userId: "user-3"
      }
    ]
  },
  {
    name: "Posídon - Senhor dos Mares",
    description: "Deus dos mares, terremotos e cavalos.",
    userId: "user-2",
    chunk: `
        Posídon é o deus dos mares, terremotos e cavalos na mitologia grega. Filho de Cronos e Reia, é irmão de Zeus e Hades. Após a vitória sobre os titãs, recebeu o domínio sobre todos os mares e oceanos. É representado segurando um tridente, seu principal símbolo e arma. Posídon é conhecido por seu temperamento volátil, capaz de causar tempestades violentas e terremotos quando irritado. Vivia em um palácio dourado no fundo do mar, cercado por criaturas marinhas. É considerado também o criador dos cavalos e protetor dos cavaleiros. Posídon teve numerosos filhos, incluindo vários heróis e criaturas míticas. Sua influência se estendia sobre navegadores, pescadores e todos aqueles que dependiam do mar.
      `,
    questions: [
      {
        question: "Qual é o principal símbolo de Posídon e por quê?",
        answer:
          "O tridente é o principal símbolo e arma de Posídon. Ele é representado segurando este instrumento, que simboliza seu domínio sobre todos os mares e oceanos.",
        pinned: true,
        userId: "user-1"
      },
      {
        question: "Como é descrito o temperamento de Posídon?",
        answer:
          "Posídon é conhecido por seu temperamento volátil, sendo capaz de causar tempestades violentas e terremotos quando irritado. Isso reflete seu controle sobre as forças da natureza marinha.",
        pinned: false,
        userId: "user-3"
      }
    ]
  },
  {
    name: "Deméter - Deusa da Colheita",
    description: "Deusa da agricultura, fertilidade e das estações.",
    userId: "user-2",
    chunk: `
        Deméter é a deusa da colheita, agricultura e fertilidade na mitologia grega. Filha de Cronos e Reia, é irmã de Zeus, Hera, Hades e Posídon. Sua principal função era ensinar aos mortais a arte da agricultura, especialmente o cultivo do trigo. O mito mais famoso envolvendo Deméter é o rapto de sua filha Perséfone por Hades. Durante a busca desesperada pela filha, Deméter fez a terra tornar-se estéril, causando uma grande fome. O acordo final estabeleceu que Perséfone passaria parte do ano no submundo com Hades e parte na superfície com a mãe, criando assim as estações do ano. Deméter é representada tendo em uma das mãos uma foice e na outra espigas e papoulas, trazendo na cabeça uma coroa com esses mesmos elementos.
      `,
    questions: [
      {
        question: "Como o mito de Perséfone explica as estações do ano?",
        answer:
          "O acordo estabeleceu que Perséfone passaria parte do ano no submundo com Hades e parte na superfície com a mãe Deméter, criando assim as estações do ano. Quando Perséfone está no submundo, Deméter deixa a terra estéril (inverno), e quando retorna, a vida floresce (primavera/verão).",
        pinned: false,
        userId: "user-4"
      },
      {
        question: "Qual era a principal função de Deméter?",
        answer:
          "A principal função de Deméter era ensinar aos mortais a arte da agricultura, especialmente o cultivo do trigo. Ela era responsável pela fertilidade da terra e pela colheita.",
        pinned: false,
        userId: "user-5"
      }
    ]
  },
  {
    name: "Atena - Deusa da Sabedoria",
    description: "Deusa da sabedoria, estratégia e guerra justa.",
    userId: "user-3",
    chunk: `
        Atena é a deusa da sabedoria, estratégia em batalha, artes, justiça e habilidade na mitologia grega. Filha partenogênica de Zeus, nasceu da cabeça de seu pai já adulta e completamente armada. Jamais se casou ou tomou amantes, mantendo uma virgindade perpétua. Era imbatível na guerra, superando até mesmo Ares em habilidade estratégica. Atena tornou-se mais conhecida como a protetora de Atenas, cidade que leva seu nome após vencer uma disputa com Posídon ao oferecer a oliveira aos atenienses. Seus símbolos incluem a coruja, a oliveira, a serpente e a égide (escudo). Representada sempre vestindo armadura e capacete, Atena personifica a sabedoria combinada com a força, sendo conselheira de heróis e patrona das artes e ofícios.
      `,
    questions: [
      {
        question: "Como Atena nasceu e o que isso tem de especial?",
        answer:
          "Atena é filha partenogênica de Zeus, tendo nascido da cabeça de seu pai já adulta e completamente armada. Esse nascimento incomum reforça sua natureza excepcional como deusa da sabedoria.",
        pinned: false,
        userId: "user-1"
      },
      {
        question: "Por que a cidade de Atenas leva o nome de Atena?",
        answer:
          "Atenas leva o nome de Atena após ela vencer uma disputa com Posídon ao oferecer a oliveira aos atenienses. Isso a tornou a protetora da cidade.",
        pinned: true,
        userId: "user-4"
      },
      {
        question: "Como Atena se diferencia de Ares na guerra?",
        answer:
          "Enquanto Ares representa a violência e brutalidade da guerra, Atena era imbatível na guerra por sua habilidade estratégica, superando até mesmo Ares. Ela personifica a sabedoria combinada com a força.",
        pinned: false,
        userId: "user-5"
      }
    ]
  },
  {
    name: "Apolo - Deus da Luz",
    description: "Deus do Sol, música, profecia e medicina.",
    userId: "user-3",
    chunk: `
        Apolo é uma das divindades principais da mitologia greco-romana, um dos deuses olímpicos. Filho de Zeus e Leto, e irmão gêmeo de Ártemis, Apolo nasceu na ilha de Delos. Era descrito como o deus da divina distância, identificado com o Sol e a Luz da Verdade. Suas funções e atributos eram diversos: deus da música, da profecia, da medicina, do arco e flecha, da poesia e das artes. Apolo era o líder das Musas e patrono de Delfos, onde ficava seu oráculo mais famoso. Representado como a perfeição da beleza masculina jovem, Apolo personificava o ideal grego de harmonia, razão e moderação. Seus símbolos incluem a lira, o arco e flecha, o louro, o cisne e o sol. Era venerado como deus da cura, mas também podia trazer doenças com suas flechas.
      `,
    questions: [
      {
        question: "Qual é a relação de Apolo com Delfos?",
        answer:
          "Apolo era o patrono de Delfos, onde ficava seu oráculo mais famoso. Esse oráculo era um dos mais importantes centros de profecia na Grécia antiga.",
        pinned: false,
        userId: "user-2"
      }
    ]
  },
  {
    name: "Ártemis - Deusa da Caça",
    description: "Deusa da caça, vida selvagem e da Lua.",
    userId: "user-4",
    chunk: `
        Ártemis é a deusa da caça, dos animais selvagens, da região selvagem, do parto e da virgindade na mitologia grega. Filha de Zeus e Leto, e irmã gêmea de Apolo, nasceu na ilha de Delos. Ártemis é uma das três deusas virgens do Olimpo, junto com Atena e Héstia. Era protetora das jovens donzelas e das mulheres durante o parto, apesar de sua própria virgindade eterna. Representada como uma caçadora hábil, carregando arco e flechas, Ártemis vagava pelos bosques e montanhas acompanhada de ninfas e animais selvagens. Era feroz na proteção de sua castidade e de suas companheiras. Seus símbolos incluem o arco e flecha, a corça, o urso e a lua crescente. Mais tarde também se tornou associada à lua e à magia, sendo identificada com Selene e Hécate.
      `,
    questions: [
      {
        question: "Quais são as três deusas virgens do Olimpo?",
        answer:
          "As três deusas virgens do Olimpo são Ártemis, Atena e Héstia. Todas mantinham virgindade eterna e rejeitavam relações amorosas.",
        pinned: false,
        userId: "user-1"
      },
      {
        question: "Por que Ártemis era protetora do parto apesar de ser virgem?",
        answer:
          "Ártemis era protetora das jovens donzelas e das mulheres durante o parto, apesar de sua própria virgindade eterna. Isso demonstra seu papel de cuidadora das mulheres em todos os estágios da vida.",
        pinned: false,
        userId: "user-3"
      }
    ]
  },
  {
    name: "Ares - Deus da Guerra",
    description: "Deus da guerra, violência e derramamento de sangue.",
    userId: "user-4",
    chunk: `
        Ares é o deus da guerra selvagem, sede de sangue e da matança personalizada na mitologia grega. Filho de Zeus e Hera, representa a violência e brutalidade da guerra, em contraste com Atena que representa a estratégia e a sabedoria militar. Seu culto não foi muito grande entre os gregos, sendo mais centrado na região norte da Grécia e em Esparta. Os romanos o identificaram com Marte, elevando muito seu status. Ares era frequentemente retratado como um guerreiro poderoso e agressivo, vestindo armadura completa e carregando lança e escudo. Seus símbolos incluem a lança, o escudo, o capacete, os cães e os abutres. Apesar de ser um olímpico, Ares era geralmente desprezado pelos outros deuses devido à sua natureza violenta e imprudente. Teve um famoso caso amoroso com Afrodite.
      `,
    questions: [
      {
        question: "Por que Ares era desprezado pelos outros deuses?",
        answer:
          "Apesar de ser um olímpico, Ares era geralmente desprezado pelos outros deuses devido à sua natureza violenta e imprudente. Ele representava a brutalidade da guerra sem sabedoria ou estratégia.",
        pinned: false,
        userId: "user-2"
      },
      {
        question: "Como os romanos trataram Ares?",
        answer:
          "Os romanos identificaram Ares com Marte, elevando muito seu status. Enquanto os gregos não o valorizavam muito, os romanos o tornaram uma divindade importante.",
        pinned: false,
        userId: "user-5"
      },
      {
        question: "Qual foi o famoso caso amoroso de Ares?",
        answer:
          "Ares teve um famoso caso amoroso com Afrodite, a deusa do amor e da beleza, que era casada com Hefesto.",
        pinned: false,
        userId: "user-1"
      }
    ]
  },
  {
    name: "Afrodite - Deusa do Amor",
    description: "Deusa do amor, beleza e sexualidade.",
    userId: "user-5",
    chunk: `
        Afrodite é a deusa do amor, da beleza e da sexualidade na mitologia grega. Responsável pela perpetuação da vida, prazer e alegria, Afrodite tinha um poder imenso sobre deuses e mortais. Na versão mais famosa de seu nascimento contada por Hesíodo, ela nasceu quando Cronos cortou os órgãos genitais de Urano e arremessou-os no mar; da espuma surgida ergueu-se Afrodite, emergindo adulta e de extraordinária beleza. Chegou à ilha de Chipre, que se tornou um de seus principais centros de culto. Afrodite era casada com Hefesto, mas teve vários amantes, sendo o mais famoso Ares. Seus símbolos incluem a rosa, a pomba, o cisne, a murta e a concha. Representada como a personificação da beleza ideal, Afrodite tinha o poder de inspirar amor e desejo. Seu cinturão mágico (cestus) tornava irresistível quem o usasse.
      `,
    questions: [
      {
        question: "Como Afrodite nasceu segundo Hesíodo?",
        answer:
          "Na versão contada por Hesíodo, Afrodite nasceu quando Cronos cortou os órgãos genitais de Urano e arremessou-os no mar. Da espuma surgida ergueu-se Afrodite, emergindo adulta e de extraordinária beleza.",
        pinned: true,
        userId: "user-2"
      },
      {
        question: "O que era o cestus de Afrodite?",
        answer:
          "O cestus era o cinturão mágico de Afrodite que tornava irresistível quem o usasse. Era um dos objetos que simbolizavam seu poder de inspirar amor e desejo.",
        pinned: false,
        userId: "user-3"
      }
    ]
  },
  {
    name: "Hefesto - Deus da Forja",
    description: "Deus do fogo, metalurgia e artesanato.",
    userId: "user-5",
    chunk: `
        Hefesto é o deus da tecnologia, dos ferreiros, artesãos, escultores, metais, metalurgia, fogo e dos vulcões na mitologia grega. Filho de Zeus e Hera (ou apenas de Hera por partenogênese), era o deus ferreiro do Olimpo. Diferente dos outros deuses, Hefesto era manco, resultado de ter sido jogado do Olimpo por Hera devido à sua aparência feia ao nascer. Apesar de sua deficiência física, era o mais habilidoso de todos os artesãos divinos. Criou as armas e armaduras dos deuses, incluindo o raio de Zeus, o tridente de Posídon e a égide de Atena. Seu principal lugar de trabalho era sob vulcões, onde mantinha suas forjas. Era casado com Afrodite, a deusa mais bela, mas ela constantemente o traía. Hefesto é representado como um homem forte e barbudo, geralmente segurando ferramentas de ferreiro. Seu equivalente romano é Vulcano.
      `
  },
  {
    name: "Hermes - Mensageiro dos Deuses",
    description: "Deus mensageiro, do comércio e dos viajantes.",
    userId: "user-1",
    chunk: `
        Hermes é o mensageiro dos deuses na mitologia grega, filho de Zeus e da ninfa Maia. Possuidor de vários atributos, era uma divindade muito antiga, cultuado desde antes da Grécia clássica. Originalmente um deus da fertilidade, dos rebanhos, da magia e da divinação, tornou-se posteriormente o mensageiro dos deuses, patrono da ginástica, dos ladrões, dos diplomatas, dos comerciantes, da literatura, dos poetas, dos viajantes e das estradas. Hermes era conhecido por sua astúcia e habilidade como ladrão - ainda bebê, roubou o gado de Apolo. Usava sandálias aladas que lhe permitiam voar, e carregava o caduceu, um bastão com duas serpentes entrelaçadas. Era o guia das almas dos mortos ao submundo. Representado como um jovem atlético e ágil, Hermes personificava a eloquência, a rapidez de pensamento e a capacidade de transitar entre diferentes mundos.
      `,
    questions: [
      {
        question: "O que Hermes fez ainda bebê?",
        answer:
          "Hermes era conhecido por sua astúcia e habilidade como ladrão - ainda bebê, roubou o gado de Apolo. Isso demonstra sua natureza engenhosa desde o nascimento.",
        pinned: false,
        userId: "user-3"
      },
      {
        question: "O que é o caduceu de Hermes?",
        answer:
          "O caduceu é um bastão com duas serpentes entrelaçadas que Hermes carregava. É um de seus símbolos mais conhecidos junto com as sandálias aladas.",
        pinned: false,
        userId: "user-4"
      },
      {
        question: "Qual era o papel de Hermes em relação aos mortos?",
        answer:
          "Hermes era o guia das almas dos mortos ao submundo. Essa função demonstrava sua capacidade de transitar entre diferentes mundos - o dos vivos e o dos mortos.",
        pinned: false,
        userId: "user-2"
      }
    ]
  },
  {
    name: "Dioniso - Deus do Vinho",
    description: "Deus do vinho, festas, teatro e êxtase.",
    userId: "user-2",
    chunk: `
        Dioniso é o deus dos ciclos vitais, das festas, do vinho, da insânia, do teatro e dos ritos religiosos na mitologia grega. Filho de Zeus e da princesa mortal Sêmele, foi o único deus olímpico filho de uma mortal. Seu nascimento foi dramático: Sêmele morreu ao ver Zeus em sua forma divina verdadeira, e Zeus salvou o feto, costurando-o em sua coxa até completar a gestação. Por isso Dioniso é chamado "o nascido duas vezes". Era representado nas cidades gregas como o protetor dos que não pertencem à sociedade convencional, simbolizando tudo o que é caótico, perigoso e inesperado. Seus seguidores, as mênades e os sátiros, celebravam rituais extáticos em sua honra. Dioniso introduziu o cultivo da videira e a produção do vinho na Grécia. Seus símbolos incluem a videira, a hera, o tirso (bastão envolvido em hera) e o leopardo.
      `,
    questions: [
      {
        question: "Por que Dioniso é chamado de 'o nascido duas vezes'?",
        answer:
          "Dioniso é chamado 'o nascido duas vezes' porque Sêmele morreu ao ver Zeus em sua forma divina verdadeira, e Zeus salvou o feto, costurando-o em sua coxa até completar a gestação. Assim, ele nasceu duas vezes: uma de Sêmele e outra de Zeus.",
        pinned: false,
        userId: "user-4"
      }
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
        image:
          "https://api.dicebear.com/9.x/micah/svg?seed=Ana&backgroundColor=ffd5dc&baseColor=f9c9b6&eyes=round&glasses=round&glassesProbability=30&hair=pixie&hairColor=77311d&mouth=smile&shirt=crew&shirtColor=fc909f",
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
        image:
          "https://api.dicebear.com/9.x/micah/svg?seed=Lucas&backgroundColor=d1d4f9&baseColor=ac6651&eyes=eyes&glasses=square&glassesProbability=50&hair=fonze&hairColor=000000&mouth=smirk&shirt=collared&shirtColor=6bd9e9",
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
        image:
          "https://api.dicebear.com/9.x/micah/svg?seed=Mariana&backgroundColor=b6e3f4&baseColor=f9c9b6&eyes=eyesShadow&glasses=round&glassesProbability=20&hair=full&hairColor=fc909f&mouth=laughing&shirt=open&shirtColor=e0ddff",
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
        image:
          "https://api.dicebear.com/9.x/micah/svg?seed=Pedro&backgroundColor=ffdfbf&baseColor=77311d&eyes=smiling&glasses=square&glassesProbability=60&hair=dougFunny&hairColor=ac6651&mouth=smile&shirt=crew&shirtColor=9287ff",
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
        image:
          "https://api.dicebear.com/9.x/micah/svg?seed=Rafael&backgroundColor=c0aede&baseColor=ac6651&eyes=round&glasses=round&glassesProbability=40&hair=dannyPhantom&hairColor=6bd9e9&mouth=nervous&shirt=collared&shirtColor=f4d150",
        emailVerified: true
      }
    })
  ])

  for (const { chunk, questions, ...rest } of roomsData) {
    console.log("Criando sala: ", rest.name)

    const roomExist = await prisma.room.findFirst({
      where: { name: rest.name }
    })

    if (roomExist) {
      console.log("Sala já existe, pulando...")
      continue
    }

    const room = await prisma.room.create({ data: rest })
    const embeddings = await generateEmbbedings(chunk.trim())
    await createRoomChunk(room.id, chunk.trim(), embeddings)

    const questionsData = questions?.map((q) => ({ ...q, roomId: room.id }))
    await prisma.question.createMany({ data: questionsData || [] })
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
