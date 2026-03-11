# 🧠 MindEase

MindEase é uma aplicação web focada em **organização de tarefas e redução da sobrecarga cognitiva**, oferecendo uma interface simples, moderna e adaptável para ajudar usuários a manterem foco e produtividade.

A aplicação combina **Kanban de tarefas, timer Pomodoro e um painel cognitivo**, permitindo que o usuário organize atividades enquanto ajusta a interface para melhorar a concentração.

---

# ✨ Funcionalidades

## 📋 Gerenciamento de Tarefas
- Organização de tarefas em formato **Kanban**
- Criação e acompanhamento de tarefas
- Interface simples focada em **reduzir distrações**

## ⏱️ Pomodoro Timer
- Timer padrão de **25 minutos**
- Controles de **Start, Pause e Reset**
- Integrado à tela de tarefas para facilitar sessões de foco

## 🧠 Painel Cognitivo
Permite ajustar a interface para reduzir sobrecarga mental:

- Ajuste de **cores e contraste**
- Controle de **espaçamento cognitivo**
- Interface adaptável para diferentes necessidades

## ⚙️ Configurações
- Personalização de preferências
- Ajustes cognitivos da interface

---

# 🖥️ Estrutura da Aplicação

O projeto é dividido em telas principais:

Home
├── Tasks (Kanban + Pomodoro)
├── Panel (Painel Cognitivo)
└── Profile (Configurações)

---

# 🧱 Estrutura do Projeto

src
├── app
│ ├── page.tsx
│ ├── tasks
│ ├── panel
│ └── profile
│
├── components
│ ├── ui
│ │ ├── button
│ │ ├── card
│ │ ├── themed-view
│ │ └── mindease-logo
│
├── shared
│ ├── hooks
│ │ └── use-theme-color
│ │
│ └── stores
│ └── cognitive-store


Principais conceitos utilizados:

- Componentização
- Design Tokens
- Theme System
- Hooks reutilizáveis
- State management centralizado

---

# 🎨 Sistema de Tema

A aplicação utiliza um **sistema de cores baseado em tokens**, permitindo adaptação automática da interface:

- `foreground`
- `background`
- `muted`
- `border`

Esses tokens garantem suporte para:

- Dark Mode
- Light Mode
- Customizações cognitivas

---

# 🧰 Tecnologias Utilizadas

- Next.js
- React
- TypeScript
- Tailwind CSS
- Zustand

---

# 🚀 Como executar o projeto

## 1. Clonar o repositório

git clone https://github.com/RKomorek/MindEase-Web

## 2. Entrar na pasta do projeto

cd mindease

## 3. Instalar dependências

npm install

ou

yarn install

## 4. Rodar o projeto

npm run dev

## O projeto estará disponível em:

http://localhost:3000

---

# 🎯 Objetivo do Projeto

Este projeto foi desenvolvido com o objetivo de:

- Criar uma aplicação focada em **produtividade e foco**
- Explorar **boas práticas de arquitetura em React e Next.js**
- Desenvolver uma interface adaptável que **reduza a carga cognitiva do usuário**

---

# 📌 Possíveis melhorias futuras

- Persistência de tarefas
- Sistema de autenticação
- Estatísticas de produtividade
- Histórico de sessões Pomodoro
- Sincronização em nuvem

