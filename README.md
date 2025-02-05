# 📌 Comunica-EB - Backend

Backend do sistema **Comunica-EB**, responsável pelo gerenciamento de escalas e ausências de funcionários na área da saúde.

## 🚀 Tecnologias Utilizadas
- **Node.js + Express**
- **Prisma ORM**
- **PostgreSQL**
- **Docker**
- **Autenticação JWT**
- **Testes com Jest**

## 📂 Estrutura do Projeto
- `/controllers`: Lida com requisições HTTP
- `/services`: Contém a lógica de negócios
- `/routes`: Define as rotas da API
- `/repositories`: Gerencia operações do banco com Prisma
- `/middleware`: Autenticação e validações

## 🔧 Como Rodar o Projeto
```bash
# Instale as dependências
npm install

# Configure o banco e o Prisma
npx prisma migrate dev --name init

# Inicie o servidor
npm run dev
