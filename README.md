# BlogAE

Uma API completa para sistema de blog desenvolvida com Express.js, TypeScript e Prisma.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web para Node.js
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Prisma** - ORM moderno para Node.js e TypeScript
- **SQLite** - Banco de dados relacional leve
- **Bcrypt** - Biblioteca para hash de senhas
- **CORS** - Middleware para Cross-Origin Resource Sharing
- **Pino** - Logger de alta performance
- **Multer** - Middleware para upload de arquivos
- **TSX** - Executor TypeScript/JavaScript com hot reload

## 📋 Funcionalidades

- **Gerenciamento de Usuários** - Cadastro, autenticação e perfis de usuário
- **Sistema de Posts** - Criação, edição e visualização de posts
- **Categorias** - Organização de posts por categorias
- **Validação de Dados** - Middleware de validação com schemas
- **Tratamento de Erros** - Sistema robusto de tratamento de exceções
- **Logs** - Sistema de logging com Pino
- **Upload de Arquivos** - Suporte para upload com Multer

## 📁 Estrutura do Projeto

```
src/
├── config/          # Configurações da aplicação
├── controllers/     # Controladores das rotas
├── exceptions/      # Tratamento de erros customizados
├── middlewares/     # Middlewares personalizados
├── repository/      # Camada de acesso a dados
├── routes/          # Definição das rotas da API
├── schemas/         # Schemas de validação
├── types/           # Definições de tipos TypeScript
├── utils/           # Utilitários e helpers
└── static/          # Arquivos estáticos
```

## ⚙️ Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**

## 🛠️ Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/piedro404/blogae.git

cd blogae
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
PORT=3000
CORS_ORIGIN="*"
NODE_ENV=development
TTL_CACHE=3600
LOG_LEVEL=debug

# Database
DATABASE_URL="file:./dev.db"
```

### 4. Configure o banco de dados

Execute as migrações do Prisma para criar as tabelas:

```bash
npm run migrate
```

Gere o cliente Prisma:

```bash
npm run prisma:generate
```

### 5. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo de desenvolvimento com hot reload
- `npm run build` - Compila o projeto TypeScript para JavaScript
- `npm start` - Inicia o servidor em modo de produção
- `npm run migrate` - Executa as migrações do banco de dados
- `npm run prisma:generate` - Gera o cliente Prisma
- `npm test` - Executa os testes

## 🗄️ Banco de Dados

O projeto utiliza SQLite como banco de dados padrão com as seguintes entidades:

- **Users** - Usuários do sistema
- **Posts** - Posts do blog
- **Categories** - Categorias dos posts

### Estrutura das Tabelas

```sql
-- Usuários
users (id, external_id, name, email, password, created_at, updated_at)

-- Categorias
categories (id, external_id, name, description, created_at, updated_at)

-- Posts
posts (id, external_id, title, content, author_id, category_id, created_at, updated_at)
```

## 🔧 Configurações Adicionais

### CORS
Configure as origens permitidas editando a variável `CORS_ORIGIN` no arquivo `.env`.

### Logs
O sistema de logs pode ser configurado através da variável `LOG_LEVEL` com os seguintes níveis:
- `trace`
- `debug`
- `info`
- `warn`
- `error`
- `fatal`

### Cache
Configure o tempo de vida do cache através da variável `TTL_CACHE` (em segundos).

## 🚀 Deploy

Para fazer o deploy em produção:

1. Configure a variável `NODE_ENV=production`
2. Configure o `DATABASE_URL` para seu banco de produção
3. Execute `npm run build`
4. Execute `npm start`

## 📊 API Endpoints

A API disponibiliza endpoints para:

- **Users** - `/api/users/*`
- **Posts** - `/api/posts/*`
- **Categories** - `/api/categories/*`

Consulte os arquivos de rotas em `src/routes/` para mais detalhes sobre os endpoints disponíveis.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo `LICENSE` para mais detalhes.