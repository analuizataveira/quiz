#!/bin/bash

# Script para testar a integração completa

echo "🚀 Testando Integração Frontend + Backend"
echo "========================================"

# Verificar se o backend está rodando
echo "📡 Verificando se o backend está ativo..."
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Backend está rodando na porta 3000"
else
    echo "❌ Backend não está rodando. Execute: cd backend && npm run dev"
    exit 1
fi

# Testar endpoints principais
echo ""
echo "🔍 Testando endpoints da API..."

# Testar GET /questions
echo "- Testando GET /questions..."
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/questions)
if [ $response = "200" ]; then
    echo "  ✅ GET /questions funciona"
else
    echo "  ❌ GET /questions falhou (HTTP $response)"
fi

# Testar GET /user
echo "- Testando GET /user..."
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/user)
if [ $response = "200" ]; then
    echo "  ✅ GET /user funciona"
else
    echo "  ❌ GET /user falhou (HTTP $response)"
fi

# Verificar se o frontend está rodando
echo ""
echo "🌐 Verificando se o frontend está ativo..."
if curl -s http://localhost:3001 > /dev/null; then
    echo "✅ Frontend está rodando na porta 3001"
else
    echo "❌ Frontend não está rodando. Execute: cd frontend && npm run dev"
    exit 1
fi

echo ""
echo "🎉 Integração testada com sucesso!"
echo ""
echo "📋 Para usar a aplicação:"
echo "1. Acesse: http://localhost:3001"
echo "2. Digite seu nome"
echo "3. Faça o quiz"
echo "4. Veja seu resultado salvo no ranking"
echo ""
echo "🔧 Para verificar os dados no banco:"
echo "cd backend && npx prisma studio"
echo ""
echo "📊 Endpoints disponíveis:"
echo "- GET    http://localhost:3000/questions"
echo "- POST   http://localhost:3000/questions"
echo "- GET    http://localhost:3000/user"
echo "- POST   http://localhost:3000/user"
echo "- POST   http://localhost:3000/quiz/start"
echo "- POST   http://localhost:3000/quiz/answer"
echo "- PUT    http://localhost:3000/quiz/:id/finish"
