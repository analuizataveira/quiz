# Quiz do The Office - Integração Frontend e Backend

Este projeto integra um frontend Next.js com um backend Fastify para criar um quiz interativo sobre "The Office".

## 🚀 Funcionalidades da Integração

### Backend (API)
- ✅ **API REST com Fastify** na porta 3000
- ✅ **Banco PostgreSQL** com Prisma ORM
- ✅ **Gestão de Perguntas**: CRUD completo
- ✅ **Sistema de Quiz**: Iniciar, responder, finalizar
- ✅ **Gestão de Usuários**: Criar usuário e salvar pontuações
- ✅ **Ranking**: Sistema de pontuação e ranking

### Frontend (Interface)
- ✅ **Next.js com TypeScript** 
- ✅ **Integração com API** via Axios
- ✅ **Estados reais** do quiz gerenciados pela API
- ✅ **Ranking dinâmico** dos usuários
- ✅ **Fallback local** para funcionar offline

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL em execução
- npm ou yarn

## 🏃‍♂️ Como Executar

### 1. Configurar o Backend

```bash
cd backend

# Instalar dependências
npm install

# Configurar banco de dados
# Crie um arquivo .env com:
# PG_CONNECTION_STRING="postgresql://usuario:senha@localhost:5432/quiz_office"

# Executar migrações
npx prisma migrate dev

# Popular banco com dados iniciais (opcional)
npx prisma db seed

# Iniciar servidor
npm run dev
```

O backend estará disponível em: `http://localhost:3000`

### 2. Configurar o Frontend

```bash
cd frontend

# Instalar dependências
npm install

# O arquivo .env.local já está configurado com:
# VITE_API_BASE_URL=http://localhost:3000

# Iniciar aplicação
npm run dev
```

O frontend estará disponível em: `http://localhost:3001`

## 🔄 Fluxo da Integração

### 1. **Carregamento de Perguntas**
```
Frontend → GET /questions → Backend → Database → Response
```

### 2. **Início do Quiz**
```
Frontend → POST /user (criar usuário) → Backend
Frontend → POST /quiz/start → Backend → Criar QuizAttempt
```

### 3. **Responder Pergunta**
```
Frontend → POST /quiz/answer → Backend → Salvar UserAnswer
```

### 4. **Finalizar Quiz**
```
Frontend → PUT /quiz/:id/finish → Backend → Atualizar pontuação
Frontend → PUT /user/:id → Backend → Atualizar melhor score
```

### 5. **Ranking**
```
Frontend → GET /user → Backend → Lista usuários ordenados por score
```

## 🗂️ Estrutura dos Dados

### Pergunta da API
```typescript
{
  id: string
  description: string
  optionA: string
  optionB: string
  optionC: string
  optionD: string
  correctAnswer: "A" | "B" | "C" | "D"
  explanation: string
  difficulty?: "EASY" | "MEDIUM" | "HARD"
  category?: string
  season?: number
}
```

### Usuário da API
```typescript
{
  id: string
  name: string
  score: number
  character: string
  createdAt: string
  updatedAt: string
}
```

## 🔧 Funcionalidades Implementadas

### ✅ Frontend
- [x] Hook `useQuizWithApi` para gerenciar estado
- [x] Repository pattern para comunicação com API
- [x] Mapeadores para converter dados API ↔ Frontend
- [x] Fallback para localStorage quando API indisponível
- [x] Tratamento de erros e loading states
- [x] Interface responsiva e animada

### ✅ Backend
- [x] Endpoints RESTful implementados
- [x] Validação de dados com Zod
- [x] Controle de transações do quiz
- [x] Sistema de pontuação
- [x] CORS configurado para frontend
- [x] Prisma ORM com migrações

### ✅ Banco de Dados
- [x] Schema otimizado para quiz
- [x] Relacionamentos entre User, Question, QuizAttempt
- [x] Histórico completo de respostas
- [x] Índices para performance

## 🌟 Destaques da Integração

1. **Resiliência**: Frontend funciona mesmo se API estiver offline
2. **Performance**: Carregamento otimizado de perguntas
3. **UX**: Estados de loading e feedback em tempo real
4. **Escalabilidade**: Arquitetura preparada para crescimento
5. **Type Safety**: TypeScript em todo o stack

## 🔍 Testando a Integração

1. **Iniciar Backend**: `cd backend && npm run dev`
2. **Iniciar Frontend**: `cd frontend && npm run dev`
3. **Abrir browser**: `http://localhost:3001`
4. **Fazer um quiz completo**
5. **Verificar ranking atualizado**
6. **Conferir dados no banco**: Use Prisma Studio `npx prisma studio`

## 🚦 Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/questions` | Listar perguntas |
| GET | `/questions/:id` | Obter pergunta específica |
| POST | `/questions` | Criar pergunta |
| POST | `/quiz/start` | Iniciar quiz |
| POST | `/quiz/answer` | Responder pergunta |
| PUT | `/quiz/:id/finish` | Finalizar quiz |
| GET | `/user` | Listar usuários (ranking) |
| POST | `/user` | Criar usuário |
| PUT | `/user/:id` | Atualizar usuário |

## 🎯 Próximos Passos

- [ ] Implementar autenticação JWT
- [ ] Adicionar WebSockets para quiz em tempo real
- [ ] Sistema de categorias de perguntas
- [ ] Dashboard administrativo
- [ ] Deploy automatizado
- [ ] Testes automatizados E2E

## 🤝 Contribuição

Para contribuir:

1. Faça fork do projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit suas mudanças: `git commit -m 'Adiciona nova funcionalidade'`
4. Push para branch: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

---

**Desenvolvido com ❤️ usando TypeScript, Next.js, Fastify e PostgreSQL**
