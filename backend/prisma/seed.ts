import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Iniciando o seed do Quiz The Office...')

    // Criar perguntas do The Office com a nova estrutura
    const questions = [
        {
            description: "Qual é o nome completo do personagem principal interpretado por Steve Carell?",
            optionA: "Michael Gary Scott",
            optionB: "Michael John Scott", 
            optionC: "Michael David Scott",
            optionD: "Michael James Scott",
            correctAnswer: "A",
            explanation: "Michael Gary Scott é o gerente regional da filial de Scranton da Dunder Mifflin. Seu nome completo é revelado várias vezes ao longo da série.",
            difficulty: "EASY",
            category: "characters",
            season: 1
        },
        {
            description: "Qual é o nome da empresa onde os personagens trabalham?",
            optionA: "Schrute Farms",
            optionB: "Dunder Mifflin",
            optionC: "Michael Scott Paper Company", 
            optionD: "Vance Refrigeration",
            correctAnswer: "B",
            explanation: "Dunder Mifflin é uma empresa fictícia de papel onde se passa a maior parte da série. É uma empresa regional de suprimentos de papel e material de escritório.",
            difficulty: "EASY",
            category: "general"
        },
        {
            description: "Quem disse a famosa frase 'Bears. Beets. Battlestar Galactica.'?",
            optionA: "Dwight Schrute",
            optionB: "Jim Halpert",
            optionC: "Michael Scott",
            optionD: "Andy Bernard",
            correctAnswer: "B",
            explanation: "Jim Halpert disse isso imitando Dwight Schrute no episódio 'Product Recall' da terceira temporada. É uma das imitações mais memoráveis do Jim.",
            difficulty: "MEDIUM", 
            category: "quotes",
            season: 3,
            episode: 20
        },
        {
            description: "Qual é o apelido que Dwight Schrute se dá no trabalho?",
            optionA: "Vice-Gerente",
            optionB: "Assistente do Gerente Regional",
            optionC: "Gerente Assistente",
            optionD: "Segundo em Comando",
            correctAnswer: "B",
            explanation: "Dwight frequentemente se refere a si mesmo como 'Assistente do Gerente Regional', embora Jim sempre o corrija dizendo que ele é 'Assistente DO Gerente Regional'.",
            difficulty: "MEDIUM",
            category: "characters"
        },
        {
            description: "Em que cidade fica a filial onde se passa a série?",
            optionA: "New York, Nova York",
            optionB: "Philadelphia, Pensilvânia", 
            optionC: "Scranton, Pensilvânia",
            optionD: "Pittsburgh, Pensilvânia",
            correctAnswer: "C",
            explanation: "A série se passa na filial de Scranton, Pensilvânia da Dunder Mifflin. Scranton é uma cidade real na Pensilvânia.",
            difficulty: "EASY",
            category: "general"
        },
        {
            description: "Qual é a famosa frase de Michael Scott sobre declarar falência?",
            optionA: "I AM BANKRUPT!",
            optionB: "I DECLARE BANKRUPTCY!",
            optionC: "BANKRUPTCY IS DECLARED!",
            optionD: "WE ARE BROKE!",
            correctAnswer: "B",
            explanation: "Michael grita 'I DECLARE BANKRUPTCY!' no episódio 'Fun Run' da quarta temporada, pensando que apenas declarar falência resolveria seus problemas financeiros.",
            difficulty: "HARD",
            category: "quotes",
            season: 4,
            episode: 1
        },
        {
            description: "Quem é a recepcionista da Dunder Mifflin no início da série?",
            optionA: "Erin Hannon",
            optionB: "Pam Beesly",
            optionC: "Kelly Kapoor", 
            optionD: "Angela Martin",
            correctAnswer: "B",
            explanation: "Pam Beesly trabalha como recepcionista no início da série. Ela mais tarde se torna vendedora e depois administradora do escritório.",
            difficulty: "EASY",
            category: "characters",
            season: 1
        },
        {
            description: "Com quem Pam estava noiva no início da série?",
            optionA: "Jim Halpert",
            optionB: "Roy Anderson",
            optionC: "Ryan Howard",
            optionD: "Toby Flenderson",
            correctAnswer: "B",
            explanation: "Pam estava noiva de Roy Anderson, que trabalhava no depósito. Eles tiveram um relacionamento longo mas que não funcionou, abrindo caminho para Jim.",
            difficulty: "MEDIUM",
            category: "relationships",
            season: 1
        },
        {
            description: "Qual é o produto mais famoso que a fazenda de Dwight produz?",
            optionA: "Milho",
            optionB: "Beterrabas",
            optionC: "Batatas",
            optionD: "Cenouras",
            correctAnswer: "B",
            explanation: "Dwight é famoso por suas beterrabas na Schrute Farms. 'Bears. Beets. Battlestar Galactica' é uma referência direta à obsessão de Dwight por beterrabas.",
            difficulty: "MEDIUM",
            category: "characters"
        },
        {
            description: "Qual é o nome do personagem interpretado por John Krasinski?",
            optionA: "Jim Halpert",
            optionB: "Ryan Howard", 
            optionC: "Andy Bernard",
            optionD: "Kevin Malone",
            correctAnswer: "A",
            explanation: "John Krasinski interpreta Jim Halpert, o vendedor brincalhão que está sempre fazendo pegadinhas com Dwight e que se apaixona por Pam.",
            difficulty: "EASY",
            category: "characters"
        }
    ];

    console.log('Criando perguntas...')
    
    for (const questionData of questions) {
        await prisma.question.create({
            data: {
                ...questionData,
                difficulty: questionData.difficulty as any
            }
        });
    }

    console.log('Seed concluído! 🎉')
    console.log(`Criadas ${questions.length} perguntas sobre The Office`)
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
