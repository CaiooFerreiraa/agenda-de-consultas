# 1. Estágio de Dependências (Alpine)
FROM node:20-alpine AS deps
# Adicionar libc6-compat e openssl para compatibilidade com Prisma e lightningcss no modo musl
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# NOTA: Não copiamos o package-lock.json do Windows para evitar conflitos de plataforma 
# nos binários nativos (como o lightningcss-linux-x64-musl).
# O npm install no container baixará a versão correta para o Alpine.
COPY package.json ./
COPY prisma ./prisma/

# Instalação limpa para a plataforma Linux/Alpine
RUN npm install --include=optional --legacy-peer-deps

# 2. Estágio de Build
FROM node:20-alpine AS builder
# Adicionar suporte a musl para o build (essencial para Turbopack em Alpine)
RUN apk add --no-cache libc6-compat openssl
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
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Runtime do openssl
RUN apk add --no-cache openssl

RUN addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 nextjs

# Copiar apenas o necessário do build standalone do Next.js
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# O server.js é gerado pelo output: standalone do Next.js
CMD ["node", "server.js"]
