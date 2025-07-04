# Quiz The Office - Backend API

Uma API REST para um quiz sobre a série The Office, construída com Fastify, Prisma e PostgreSQL.

### Funcionalidades

- 🎭 **Gestão de Perguntas**: CRUD completo de perguntas com categorias (personagens, episódios, citações, relacionamentos)
- 🏆 **Sistema de Quiz**: Iniciar quiz, responder perguntas e finalizar com pontuação
- 👤 **Gestão de Usuários**: Sistema de usuários com pontuação e níveis
- 📊 **Níveis de Dificuldade**: Perguntas categorizadas por dificuldade (EASY, MEDIUM, HARD)
- 🎯 **Tracking de Respostas**: Acompanhamento detalhado de tentativas e respostas dos usuários

### Tecnologias

- TypeScript
- Fastify
- Prisma ORM
- PostgreSQL
- Zod (validação)

### Modelos de Dados

#### Question
- Perguntas do quiz com informações sobre temporada, episódio, categoria e dificuldade
- Relacionamento com múltiplas respostas (Answer)

#### Answer  
- Opções de resposta para cada pergunta
- Indicação de resposta correta

#### QuizAttempt
- Tentativas de quiz dos usuários
- Controle de pontuação e tempo

#### UserAnswer
- Registro de todas as respostas dos usuários
- Tracking de acertos e tempo gasto

### Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env` e preencha as variáveis com os valores corretos:

```bash
# Database
PG_CONNECTION_STRING="postgresql://username:password@localhost:5432/quiz_the_office?schema=public"

# Server  
PORT=3000
NODE_ENV=development
```

### Comandos CLI

```bash
# Instalar dependências
npm install

# Gerar cliente Prisma
npx prisma generate

# Executar migrações
npx prisma migrate dev

# Popular banco com dados iniciais
npx prisma db seed

# Construir aplicação
npm run build

# Executar em modo de desenvolvimento
npm run dev

# Iniciar aplicação
npm start
```

### Endpoints da API

#### Perguntas
- `GET /questions` - Listar perguntas (com filtros por dificuldade, categoria, temporada)
- `GET /questions/:id` - Obter pergunta específica
- `POST /questions` - Criar nova pergunta

#### Quiz
- `POST /quiz/start` - Iniciar nova tentativa de quiz
- `POST /quiz/answer` - Responder uma pergunta
- `PUT /quiz/:quizAttemptId/finish` - Finalizar quiz

#### Usuários
- `GET /user` - Listar usuários
- `GET /user/:id` - Obter usuário específico
- `POST /user` - Criar usuário
- `PUT /user/:id` - Atualizar usuário
- `DELETE /user/:id` - Remover usuário

### Estrutura do Projeto

```
src/
├── controllers/     # Controllers das rotas
├── services/        # Lógica de negócio
├── repositories/    # Camada de acesso aos dados
├── interfaces/      # Interfaces TypeScript
├── routes/          # Definição das rotas
├── config/          # Configurações (DB, erros)
├── enums/           # Enumerações
├── middlewares/     # Middlewares customizados
└── utils/           # Utilitários
```

### Architecture

TBD

### Specific Business Rules

TBD

### Schedulers

TBD

### Database

TBD
