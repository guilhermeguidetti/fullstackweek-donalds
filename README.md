# Next Foods 🍔

Projeto desenvolvido durante a Full Stack Week 8.0, uma plataforma de delivery de comida com foco em restaurantes.
URL: https://foods.gzguidetti.com

## 🚀 Tecnologias Utilizadas

- **Frontend**:

  - Next.js 15
  - React 19
  - TypeScript
  - Tailwind CSS
  - shadcn/ui
  - Lucide Icons
  - Sonner (Toasts)
  - React Hook Form
  - Zod (Validação)

- **Backend**:

  - Prisma ORM
  - PostgreSQL
  - Server Actions (Next.js)
  - Stripe (Pagamentos)

- **Hospedagem**:
  - Vercel
  - PostgreSQL (Railway)

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL
- Git
- Conta Stripe (para pagamentos)
- Conta Vercel (para deploy)

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/next-foods.git
cd next-foods
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DATABASE_URL="postgresql://seu-usuario:sua-senha@localhost:5432/fsw-donalds"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Vercel
VERCEL_URL="foods.gzguidetti.com"
```

4. Execute as migrações do banco de dados:

```bash
npx prisma migrate dev
```

5. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

## 🏗️ Estrutura do Projeto

```
next-foods/
├── prisma/              # Configurações e esquema do Prisma
├── public/              # Arquivos estáticos
├── src/
│   ├── app/             # Rotas e páginas da aplicação
│   │   ├── [slug]/      # Páginas dinâmicas do restaurante
│   │   ├── actions.ts   # Server Actions
│   │   ├── layout.tsx   # Layout principal
│   │   └── page.tsx     # Página inicial
│   ├── components/      # Componentes reutilizáveis
│   │   ├── ui/          # Componentes de UI
│   │   └── ...          # Outros componentes
│   ├── lib/             # Utilitários e configurações
│   └── styles/          # Estilos globais
├── .eslintrc.json       # Configurações do ESLint
├── .prettierrc          # Configurações do Prettier
├── next.config.js       # Configurações do Next.js
├── package.json         # Dependências e scripts
├── postcss.config.js    # Configurações do PostCSS
└── tailwind.config.js   # Configurações do Tailwind
```

## 📦 Funcionalidades

### Página Inicial

- Listagem de restaurantes em cards
- Design responsivo e otimizado para mobile
- Navegação para páginas individuais dos restaurantes

### Páginas de Restaurante

- Menu de produtos organizado por categorias
- Carrinho de compras
- Formulário de checkout
- Gerenciamento de pedidos

### Carrinho de Compras

- Adição/remoção de produtos
- Ajuste de quantidades
- Cálculo automático do total
- Persistência dos dados

### Pagamentos

- Integração com Stripe
- Checkout seguro
- Suporte a múltiplos métodos de pagamento
- Webhooks para atualização de status
- Recibos automáticos

## 🎨 Design System

O projeto utiliza um design system personalizado com as seguintes características:

### Cores

- Primária: Amarelo (#FFB800)
- Fundo: Branco
- Texto: Cinza escuro
- Acentos: Tons de cinza

### Tipografia

- Fonte: Poppins
- Pesos: 100 a 900
- Tamanhos responsivos

### Componentes

- Cards
- Botões
- Formulários
- Modais
- Toasts
- E mais...

## 🚀 Deploy

O projeto está hospedado na Vercel e pode ser acessado em [foods.gzguidetti.com](https://foods.gzguidetti.com).

### Configuração do Deploy

1. Faça login na [Vercel](https://vercel.com)
2. Importe o repositório
3. Configure as variáveis de ambiente:
   - `DATABASE_URL`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
4. Configure o domínio personalizado (opcional)
5. Deploy automático com GitHub

## 🛠️ Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Gera a build de produção
- `npm run start`: Inicia o servidor de produção
- `npm run lint`: Executa o linter
- `npm run prepare`: Configura o Husky
- `npm run postinstall`: Gera o cliente do Prisma

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- [FullStackClub](https://www.fullstackclub.com.br/) pela Full Stack Week 8.0
- [shadcn/ui](https://ui.shadcn.com/) pelos componentes
- [Prisma](https://www.prisma.io/) pelo ORM
- [Next.js](https://nextjs.org/) pelo framework
- [Tailwind CSS](https://tailwindcss.com/) pelos estilos
- [Stripe](https://stripe.com/) pela plataforma de pagamentos
- [Vercel](https://vercel.com/) pela hospedagem
