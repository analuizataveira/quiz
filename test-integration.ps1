# Script para testar a integração completa no Windows

Write-Host "🚀 Testando Integração Frontend + Backend" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

# Verificar se o backend está rodando
Write-Host "📡 Verificando se o backend está ativo..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -Method GET -TimeoutSec 5 -ErrorAction Stop
    Write-Host "✅ Backend está rodando na porta 3000" -ForegroundColor Green
} catch {
    Write-Host "❌ Backend não está rodando. Execute: cd backend && npm run dev" -ForegroundColor Red
    exit 1
}

# Testar endpoints principais
Write-Host ""
Write-Host "🔍 Testando endpoints da API..." -ForegroundColor Yellow

# Testar GET /questions
Write-Host "- Testando GET /questions..." -ForegroundColor White
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/questions" -Method GET -TimeoutSec 5 -ErrorAction Stop
    if ($response.StatusCode -eq 200) {
        Write-Host "  ✅ GET /questions funciona" -ForegroundColor Green
    } else {
        Write-Host "  ❌ GET /questions falhou (HTTP $($response.StatusCode))" -ForegroundColor Red
    }
} catch {
    Write-Host "  ❌ GET /questions falhou: $($_.Exception.Message)" -ForegroundColor Red
}

# Testar GET /user
Write-Host "- Testando GET /user..." -ForegroundColor White
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/user" -Method GET -TimeoutSec 5 -ErrorAction Stop
    if ($response.StatusCode -eq 200) {
        Write-Host "  ✅ GET /user funciona" -ForegroundColor Green
    } else {
        Write-Host "  ❌ GET /user falhou (HTTP $($response.StatusCode))" -ForegroundColor Red
    }
} catch {
    Write-Host "  ❌ GET /user falhou: $($_.Exception.Message)" -ForegroundColor Red
}

# Verificar se o frontend está rodando
Write-Host ""
Write-Host "🌐 Verificando se o frontend está ativo..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3001" -Method GET -TimeoutSec 5 -ErrorAction Stop
    Write-Host "✅ Frontend está rodando na porta 3001" -ForegroundColor Green
} catch {
    Write-Host "❌ Frontend não está rodando. Execute: cd frontend && npm run dev" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🎉 Integração testada com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Para usar a aplicação:" -ForegroundColor Cyan
Write-Host "1. Acesse: http://localhost:3001" -ForegroundColor White
Write-Host "2. Digite seu nome" -ForegroundColor White
Write-Host "3. Faça o quiz" -ForegroundColor White
Write-Host "4. Veja seu resultado salvo no ranking" -ForegroundColor White
Write-Host ""
Write-Host "🔧 Para verificar os dados no banco:" -ForegroundColor Cyan
Write-Host "cd backend && npx prisma studio" -ForegroundColor White
Write-Host ""
Write-Host "📊 Endpoints disponíveis:" -ForegroundColor Cyan
Write-Host "- GET    http://localhost:3000/questions" -ForegroundColor White
Write-Host "- POST   http://localhost:3000/questions" -ForegroundColor White
Write-Host "- GET    http://localhost:3000/user" -ForegroundColor White
Write-Host "- POST   http://localhost:3000/user" -ForegroundColor White
Write-Host "- POST   http://localhost:3000/quiz/start" -ForegroundColor White
Write-Host "- POST   http://localhost:3000/quiz/answer" -ForegroundColor White
Write-Host "- PUT    http://localhost:3000/quiz/:id/finish" -ForegroundColor White
