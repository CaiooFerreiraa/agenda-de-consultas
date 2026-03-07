# Contexto do Projeto: Conecta Saúde Marketplace

## Descrição
O Conecta Saúde é uma plataforma robusta de marketplace de saúde que conecta pacientes a médicos de diversas especialidades e provê infraestrutura para hospitais acionarem profissionais sob demanda. O sistema gerencia perfis públicos, agendas dinâmicas e fluxos de agendamento em tempo real.

## Stack / Tecnologias
- **Frontend**: Next.js 15 (App Router), Tailwind CSS, Lucide React, shadcn/ui.
- **Backend/ORM**: Server Actions, Prisma ORM.
- **Banco de Dados**: Neon (PostgreSQL).
- **Autenticação**: Auth.js (NextAuth) com adaptador Prisma.
- **Tipografia**: Playfair Display (Headers/Display) e Inter/System (Corpo).

## Convenções e Padrões de UI/UX
- **Modern Luxury Aesthetic**: Uso extensivo de superfícies brancas, bordas suaves (`rounded-3xl`), sombras leves (`shadow-sm`) e cores azuis primárias (`#2563eb`).
- **Cards & Grids**: Grid de especialistas sem imagens (uso de iniciais em gradiente) para manter foco na especialidade e nome. Grids de horários visuais para seleção rápida.
- **Feedback Visual**: Estados de loading (Loader2), feedbacks de sucesso (Emerald) e erro (Red) utilizando banners e ícones semânticos.
- **Hierarquia Visual**: Headers com font Playfair para um toque mais profissional e sofisticado. Call-to-actions (CTAs) com sombras coloridas para destaque.
- **Responsividade**: Mobile-first com bottom navigation no dashboard para usuários em dispositivos móveis.

## Histórico de Decisões Críticas
- **Refatoração UI/UX**: Transformação de um agendador simples para um marketplace completo (Home > Busca > Perfil > Reserva).
- **Arquitetura de Dados**: Inclusão de `bio`, `price` e `image` na entidade `User` para enriquecer perfis médicos.
- **Gerenciamento de Agenda**: Implementação de sistema de geração de slots em lote para médicos (`BulkCreateForm`), abandonando bloqueio de dias manuais por uma gestão de tempo fina.
- **Sistema de Serviços por Especialista**: Migração de valor fixo por consulta para um catálogo flexível de serviços (cada um com nome, descrição, preço e duração), permitindo ao paciente escolher exatamente o que deseja agendar.
- **Chat de Negociação e Suporte**: Implementação de chat em tempo real integrado aos dashboards de médico e paciente para sanar dúvidas de sintomas ou negociar detalhes antes da consulta.
- **Expansão de Layout (Wide Screen)**: Adaptação das interfaces para utilizar larguras de até 1700px, criando um ambiente de trabalho mais robusto e "premium", removendo a sensação de design pequeno e centralizado.
- **Segurança**: Remoção do arquivo `.env` do controle de versão e configuração de `.gitignore` rigoroso.
- **Roteamento Next.js 15**: Adaptação de componentes assíncronos (params/searchParams) e remoção de `useSearchParams` em componentes aninhados para evitar warnings de hidratação.
- **Correção de Erro de Build na Vercel**: Alteração no `prisma.config.ts` para usar `process.env.DATABASE_URL` em vez do helper `env()`, evitando erros de variável de ambiente ausente durante a execução do `prisma generate` no deploy.
- **Correção de Build Vercel**: Adição do script `postinstall: prisma generate` no `package.json` para evitar erros de inicialização do cliente Prisma durante o deploy.
- **Correção TypeScript (Prisma Config)**: Adição de assertion `as string` em `process.env.DATABASE_URL` no `prisma.config.ts` para resolver erro do compilador durante o build local e no deploy.
- **Identidade Visual (Favicon)**: Implementação do novo favicon institucional enviado pelo usuário em alta resolução (PNG) para consolidar a marca.
- **Rebranding**: Alteração do nome do sistema de "MedSchedule" para "Conecta Saúde" em toda a interface, metadados e documentação do agente.
- **Implementação de Pipeline CI/CD**: Criado `Dockerfile` otimizado para Node.js (Alpine), `.dockerignore`, `docker-compose.yml` e workflow do GitHub Actions (`deploy.yml`) para deploy automático em containers na AWS EC2. Configuração baseada em Docker Hub e SSH, adaptando a estrutura previamente usada no Multiverso Literário para o ambiente Node.js.
- **Correção de Erro de Build (lightningcss)**: Adição de `gcompat` e `libstdc++` ao `Dockerfile` (Alpine) para resolver o erro de carregamento de módulos nativos do `lightningcss` (Tailwind v4) durante o build no ambiente Docker.

## Notas de Desenvolvimento
- Sempre utilizar `.agent/database.md` e `.agent/design.md` como guias antes de novas features.
- Todas as alterações visuais devem manter a consistência com o tema "F4F7FE" (fundo) e "rounded-3xl" (bordas).