# Chatdemo  <https://chatdemo-l8bt.onrender.com>
> **This project is created mainly based on [this tutorial](https://www.codewithantonio.com/projects/team-chat-platform).**

### A fullstack discord-clone web app built using Next.js 13, Prisma ORM, TailwindCSS, Shadcn/ui, Clerk, Socket.io etc. and fully docker-containerized.  
<img width="300" alt="chatdemo-app" src="https://github.com/maakintosh/discord-clone/assets/102001127/ae92abaa-e28b-469e-bc67-2cc341b6e1de">
<img width="300" alt="create-server" src="https://github.com/maakintosh/discord-clone/assets/102001127/ea1da402-418a-46af-ba91-6249a3a9399d">  
<img width="300" alt="スクリーンショット 2024-05-06 23 06 50" src="https://github.com/maakintosh/discord-clone/assets/102001127/98583fc8-00fe-4acb-b994-cc838e5b65e5">


**After you suceeded in sign-in and create a server, feel free join this [demo server](https://chatdemo-l8bt.onrender.com/invite/8b956d5a-2900-4545-bf12-958693184e5f) to quickly try some features!**  

Also, all development history up to completion has been recorded on [github project](https://github.com/users/maakintosh/projects/6/views/1).  

> **This web app is deployed on Render.com free-plan for demo purpose that has [important limitations](https://docs.render.com/free). such as:**  
> 1.shuts down service everytime with 15 mins inactivity, and takes 1 min to reboot.  
> 2.monthly usage limits.  
> I'm sorry for the inconvenience... really...

## Features for users

- Real-time messaging by websocket communication | **Socket.io**
- CRUD operation: servers, channels, messages, direct-messages and members | **Prisma**
- Member　role management (GUEST, MODERATOR, ADMIN)
  > MODERATOR can invite, create channels, delete comments.  
  > ADMIN (creater of the server), in addition, can change member role, kickout, server settings, delete server.
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
  > that automatically  
  > 1.triggers pending db migration for production and  
  > 2.builds and pushes production image to github container registry
- Render IaC file
  > controls production instances of both web service itself and its postgresDB that are deployed on Render
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

1. folk this project onto your local machine.
2. install [Extension: Remote Development
   ](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) on your VSCode
3. start [Docker desktop](https://www.docker.com/ja-jp/products/docker-desktop/) on your local machine or install it if you don't have it (sorry).
4. click skyblue-color button at the bottom left VSCode editor and select "Reopen in container".
   This project's devcontainer will spin up soon.
   > Everything you need is already setup, so no additional configuration is required. wow.  
   > if you successfully spins up devcontainer, docker desktop container will be like this.
   > <img width="900" alt="スクリーンショット 2024-05-04 10 40 45" src="https://github.com/maakintosh/discord-clone/assets/102001127/15ada155-165e-4534-a0ae-84c13783de8b">

5. start dev environment from inside the devcontainer running:

```bash
npm run dev
```

Happy coding :)
