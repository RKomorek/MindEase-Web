🧠 MindEase

MindEase é uma aplicação web focada em organização de tarefas e redução da sobrecarga cognitiva, oferecendo uma interface simples, moderna e adaptável para ajudar usuários a manterem foco e produtividade.

A aplicação combina Kanban de tarefas, timer Pomodoro e um painel cognitivo que permite ajustar a interface para melhorar a experiência de uso.

✨ Funcionalidades
📋 Gerenciamento de Tarefas

Organização de tarefas em formato Kanban

Criação e acompanhamento de tarefas diárias

Interface limpa focada em reduzir distrações

⏱️ Pomodoro Timer

Timer de 25 minutos de foco

Controles de start, pause e reset

Integrado à tela de tarefas para facilitar sessões de foco

🧠 Painel Cognitivo

Permite ajustar a interface para reduzir sobrecarga mental:

Ajuste de cores e contraste

Controle de espaçamento cognitivo

Interface adaptável para diferentes necessidades

⚙️ Configurações

Personalização de preferências

Ajustes cognitivos da interface

🖥️ Estrutura da Aplicação

O projeto é dividido em telas principais:

Home
 ├── Tasks (Kanban + Pomodoro)
 ├── Panel (Painel Cognitivo)
 └── Profile (Configurações)

Cada tela utiliza um conjunto de componentes reutilizáveis e tokens de design, garantindo consistência visual e facilidade de manutenção.

🧱 Arquitetura do Projeto

O projeto segue uma estrutura modular:

src
 ├── app
 │   ├── page.tsx
 │   ├── tasks
 │   ├── panel
 │   └── profile
 │
 ├── components
 │   ├── ui
 │   │   ├── button
 │   │   ├── card
 │   │   ├── themed-view
 │   │   └── mindease-logo
 │
 ├── shared
 │   ├── hooks
 │   │   └── use-theme-color
 │
 │   ├── stores
 │   │   └── cognitive-store

Principais conceitos utilizados:

Componentização

Design Tokens

Theme System

Hooks reutilizáveis

🎨 Sistema de Tema

A aplicação utiliza um sistema de cores dinâmico baseado em tokens:

foreground

background

muted

border

Esses tokens garantem suporte automático para:

Dark mode

Light mode

Customizações cognitivas

🧰 Tecnologias Utilizadas

Next.js

React

TypeScript

Tailwind CSS

Zustand (state management)

🚀 Como executar o projeto
1️⃣ Clonar o repositório
git clone https://github.com/seu-usuario/mindease.git
2️⃣ Entrar na pasta do projeto
cd mindease
3️⃣ Instalar dependências
npm install

ou

yarn install
4️⃣ Rodar o projeto
npm run dev

O projeto ficará disponível em:

http://localhost:3000
🎯 Objetivo do Projeto

Este projeto foi desenvolvido com o objetivo de:

Criar uma aplicação focada em produtividade e foco

Explorar boas práticas de arquitetura em React / Next.js

Implementar interfaces adaptáveis para reduzir carga cognitiva

📌 Possíveis melhorias futuras

Persistência de tarefas

Sistema de autenticação

Estatísticas de produtividade

Histórico de sessões Pomodoro

Sincronização em nuvem