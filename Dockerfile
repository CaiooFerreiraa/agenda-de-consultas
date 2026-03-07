# 1. Estágio de Dependências
# Nota: Usando bookworm (Debian) em vez de alpine para garantir compatibilidade 
# total com os binários nativos do lightningcss usados pelo Tailwind CSS v4.
FROM node:20-bookworm AS deps
WORKDIR /app

# Instalar dependências necessárias para o Prisma e build
RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json* ./
COPY prisma ./prisma/

# Instalação limpa das dependências
RUN npm install

# 2. Estágio de Build
FROM node:20-bookworm AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Desabilitar telemetria
ENV NEXT_TELEMETRY_DISABLED=1

# Variáveis para o build
ARG DATABASE_URL
ARG NEXT_PUBLIC_API_URL

ENV DATABASE_URL=$DATABASE_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Gerar cliente Prisma e Build
RUN npx prisma generate
RUN npm run build

# 3. Estágio de Execução (Runner)
FROM node:20-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Instalar runtime do openssl para o Prisma
RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

RUN addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 nextjs

# Copiar apenas o necessário do build standalone
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# server.js é gerado pelo output: standalone do Next.js
CMD ["node", "server.js"]
