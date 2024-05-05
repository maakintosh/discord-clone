# Chatdemo

A fullstack discord-clone web app built using Next.js13, Prisma, Shadcn/ui, Clerk, Socket.io etc. mainly based on [this project](https://www.codewithantonio.com/projects/team-chat-platform).

## Features

- Real-time messaging by websocket communication | **Socket.io**
- CRUD operation: servers, channels, messages, DMs and members | **Prisma**
- Member management (GUEST, MODERATOR, ADMIN)
  > MODERATOR can invite, create channels, delete comments.
  > ADMIN ( creater of the server ) can change member role, kickout, server settings, delete server in addition.
- Server invitation link generation
- 1on1 direct messages
- Infinite loading chat | **@tanstack/react-query**
- Video & Voice call | **Livekit**
- Uploading images and PDFs (2MB or less, adjustable) | **Uploadthing**
- Responsive UI for PC, tablet, mobile | **TailwindCSS**, **Shadcn/ui**, **AceternityUI**
- Animation | **framer-motion**
- Light / Dark mode
- Emoji Picker | **@emoji-mart**
- Toast massages on CRUD actions | **React-hot-toast**
- Authentication | **Clerk**
- React state management | **Zustand**
- Form validation | **Zod**

## DevOps Features

- Containerize whole dev environment | **Devcontainer**, **DockerCompose**
- Spinnig up local Docker pre-deploy instance from inside devcontainer | **Docker-outside-of-docker**, **DockerCompose**
- CD pipeline | **Github action**
  > that automatically 1.triggers pending db migration for production and 2. builds and pushes production image to github container registry
- Render IaC file
  > controls both web service and postgresDB production instance deployed on Render
- Visualize ERD and check diffs on every PR | **prisma-erd-generator**, **@mermaid-js**, **Github action**
- linting & formatting | **eslint**, **prettier**
- Pre-commit actions | **husky**, **lint-staged**
- Commit message linting | **@commitlint**

## Roadmap

- [x] ~~initial DevOps setup~~
- [x] ~~toast massages on CRUD actions~~
- [x] ~~icon hover tooltip~~
- [x] ~~light / dark toggle button~~
- [x] ~~setup Devcontainer~~
- [x] ~~visualize ERD~~
- [x] ~~local Docker pre-deploy (test) instance~~
- [x] ~~deploy on Render.com~~
- [x] ~~CD pipeline~~
- [x] ~~IaC for Render~~
- [x] ~~public landing page~~
- [ ] feat:UI: chat messages alignment
- [ ] feat:UI: skelton loading UI
- [ ] feat: nestable replies to a chat message

## Getting Started

1. install [Extension: Remote Development
   ](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) on your VSCode
2. Start [Docker desktop](https://www.docker.com/ja-jp/products/docker-desktop/) on your local machine or install it if you don't have it
3. click skyblue button at the bottom left editor and select "Reopen in container"
   > devcontainer spins up soon and everything you need is already set up.
4. start local dev envionment running:

```bash
npm run dev
```

and open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
