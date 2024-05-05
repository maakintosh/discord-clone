# [Chatdemo](https://chatdemo-l8bt.onrender.com)

A fullstack discord-clone web app built using Next.js 13, Prisma ORM, TailwindCSS, Shadcn/ui, Clerk, Socket.io etc. and fully docker-containerized. Mainly based on [this project](https://www.codewithantonio.com/projects/team-chat-platform).

## Features for users

- Real-time messaging by websocket communication | **Socket.io**
- CRUD operation: servers, channels, messages, direct-messages and members | **Prisma**
- Member　role management (GUEST, MODERATOR, ADMIN)
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
- Form input validation | **Zod**

## DevOps Features

- Containerize whole dev environment | **Devcontainer**, **Docker compose**
- Spinnig up local pre-deploy (test) Docker instance from inside devcontainer | **Docker-outside-of-docker**, **Docker compose**
- CD pipeline | **Github action**
  > that automatically 1.triggers pending db migration for production and 2. builds and pushes production image to github container registry
- Render IaC file
  > controls both web service and postgresDB production instance deployed on Render
- Visualize ERD from prisma schema and validate diffs on every PR | **prisma-erd-generator**, **@mermaid-js**, **Github action**
- Code linting & formatting | **eslint**, **prettier**
- Pre-commit actions | **husky**, **lint-staged**
- Commit message linting | **@commitlint**

## Added features Roadmap

- [x] ~~initial DevOps setup~~
- [x] ~~toast massages on CRUD actions~~
- [x] ~~tooltips on hovering every icon~~
- [x] ~~light / dark mode toggle button~~
- [x] ~~setup Devcontainer~~
- [x] ~~visualize ERD~~
- [x] ~~local pre-deploy (test) Docker instance~~
- [x] ~~deploy on Render.com~~
- [x] ~~CD pipeline~~
- [x] ~~IaC file for Render~~
- [x] ~~Livekit API bugfix~~
- [x] ~~project icon~~
- [x] ~~public landing page at the root domain~~
- [ ] feat:UI: chat messages alignment
  > locate my messeges aligned at right, others at left.
  > colorize my messages as prime color (indigo-500)
- [ ] feat:UI: skelton loading UI
- [ ] feat: nestable replies to a chat message (like Youtube)

## How to start Devcontainer

1. install [Extension: Remote Development
   ](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) on your VSCode
2. Start [Docker desktop](https://www.docker.com/ja-jp/products/docker-desktop/) on your local machine or install it if you don't have it (sorry).
3. click skyblue button at the bottom left editor and select "Reopen in container"
   > this project's devcontainer spins up soon. Everything you need is already setup, so no additional configuration is required. wow.
4. start dev environment from inside the devcontainer running:

```bash
npm run dev
```

Happy coding :)
