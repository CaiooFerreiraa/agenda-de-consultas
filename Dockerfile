# Usar imagem do Node.js
FROM node:20-alpine AS base
WORKDIR /app

# Instalar dependências
FROM base AS install
RUN apk add --no-cache libc6-compat
RUN mkdir -p /temp/dev
COPY package.json package-lock.json* /temp/dev/
COPY prisma /temp/dev/prisma
RUN cd /temp/dev && npm ci

# Instalar dependências de produção
FROM base AS install-prod
RUN apk add --no-cache libc6-compat
RUN mkdir -p /temp/prod
COPY package.json package-lock.json* /temp/prod/
COPY prisma /temp/prod/prisma
RUN cd /temp/prod && npm ci --omit=dev

# Build do projeto
FROM base AS build
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# Variáveis de ambiente para o build
ARG DATABASE_URL
ARG NEXT_PUBLIC_API_URL
ENV DATABASE_URL=$DATABASE_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Imagem final de produção
FROM base AS release
COPY --from=install-prod /temp/prod/node_modules node_modules
COPY --from=build /app/.next .next
COPY --from=build /app/public public
COPY --from=build /app/package.json .
COPY --from=build /app/prisma prisma

# Expor a porta 3000
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "run", "start"]
