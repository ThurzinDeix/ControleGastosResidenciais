# Sistema de Controle de Gastos Residenciais

## Objetivo
Implementar um sistema para controle de gastos residenciais, separado em Web API e Front-end, seguindo as regras de negócio definidas no teste técnico.

## Estrutura do Projeto

```
/GastosResidenciaisAPI        -> Back-end em ASP.NET Core
/gastos-residenciais-web     -> Front-end em React + TypeScript
```

## Tecnologias

**Back-end**
- C#
- ASP.NET Core
- Entity Framework Core
- Banco de dados persistente (SQLite/SQL Server)

**Front-end**
- React
- TypeScript
- Vite
- Tailwind CSS
- React Query
- Shadcn/UI

## Funcionalidades

### Pessoas
- Criar pessoa
- Listar pessoas
- Excluir pessoa (remove também suas transações)

### Categorias
- Criar categoria
- Listar categorias
- Finalidade: Receita, Despesa ou Ambas

### Transações
- Criar transação
- Listar transações
- Regra de menor de idade: apenas despesas
- Validação de categoria conforme tipo da transação

### Relatórios
- Totais por pessoa (receitas, despesas e saldo)
- Totais gerais
- Resumo financeiro

## Como Executar

### Back-end
```bash
cd GastosResidenciaisAPI
dotnet restore
dotnet run
```

### Front-end
```bash
cd gastos-residenciais-web
npm install
npm run dev
```

A aplicação estará disponível no navegador após iniciar o front-end.

## Observações
- O projeto foi desenvolvido seguindo boas práticas em .NET e React.
- Toda a lógica de negócio está validada tanto no back-end quanto no front-end.
- O sistema mantém os dados mesmo após reiniciar a aplicação.

