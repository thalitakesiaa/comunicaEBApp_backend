# 📌 Comunica-EB - Backend

Backend do sistema **Comunica-EB**, responsável pelo gerenciamento de escalas e ausências de funcionários na área da saúde.

## 🚀 Tecnologias Utilizadas
- **Node.js**
- **Express**
- **Prisma (para o ORM)**
- **PostgreSQL (para o banco de dados)**
- **Joi (para validação de dados)**
- **Swagger (para documentação da API)**
- **Bcrypt (para criptografia de senhas)**

## 📂 Estrutura do Projeto
- `/controllers`: Lida com requisições HTTP
- `/services`: Contém a lógica de negócios
- `/routes`: Define as rotas da API
- `/repositories`: Gerencia operações do banco com Prisma
- `/middleware`: Autenticação e validações

## Pré-requisitos

Antes de rodar o projeto, você precisa ter os seguintes itens instalados:

- **Node.js** (você pode verificar a versão instalada com `node -v` no terminal)
- **npm** (gerenciador de pacotes do Node.js)
- **PostgreSQL** (banco de dados)

Se você não tem o Node.js e o npm instalados, baixe e instale a partir do [site oficial](https://nodejs.org/).

Para o PostgreSQL, siga as instruções de instalação no [site oficial](https://www.postgresql.org/download/).

## Passo a Passo para Rodar a API


### 1. Clone o Repositório

Clone o repositório para sua máquina local:

```bash
git clone https://github.com/seu-usuario/comunicaEBApp_backend.git
cd comunicaEBApp_backend

### 2. Instale as Dependências

# Instale as dependências
npm install


### 3. Configure o Banco de Dados

# Configure o banco e o Prisma
npx prisma migrate dev --name init

### 4. Inicie a API

# Inicie o servidor
npm run dev
