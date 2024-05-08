# Chatdemo<br/><https://chatdemo-l8bt.onrender.com>

> **This app is created mainly based on [this project](https://www.codewithantonio.com/projects/team-chat-platform).**

日本語版READMEは[こちら](https://github.com/maakintosh/discord-clone/blob/main/README-ja.md)

### A fullstack discord-clone web app built using Next.js 13, Prisma, TailwindCSS, Shadcn/ui, Clerk, Socket.io etc. and fully docker-containerized.

<img width="200" alt="chatdemo-app" src="https://github.com/maakintosh/discord-clone/assets/102001127/ae92abaa-e28b-469e-bc67-2cc341b6e1de">
<img width="200" alt="server-header-dropdown" src="https://github.com/maakintosh/discord-clone/assets/102001127/98583fc8-00fe-4acb-b994-cc838e5b65e5">
<img width="220" alt="landing-page-globe" src="https://github.com/maakintosh/discord-clone/assets/102001127/e6e6c185-f2ec-4485-b1d8-607be3c259ff">


**After you suceeded in sign-in and create a server, feel free join this [demo server](https://chatdemo-l8bt.onrender.com/invite/8b956d5a-2900-4545-bf12-958693184e5f) to quickly try some features!**

Also, all development history up to completion has been recorded on [Github project](https://github.com/users/maakintosh/projects/6/views/1).

<br/><br/>
**This web app is deployed on Render.com free-plan for demo purpose, so there are huge [limitations](https://docs.render.com/free). such as:**  
> 1. sleeps service everytime with 15 mins inactivity, and takes 1 min to reboot.  
> I'm sorry.. a few more seconds.. please wait.. oh no...
> 2. monthly usage limits.

<br/><br/>

## Features for users

- Real-time messaging by websocket communication | **Socket.io**
- CRUD operation: servers, channels, messages, direct-messages and members | **Prisma**
- Member　role management (GUEST, MODERATOR, ADMIN)
  > MODERATOR can invite, create channels, delete comments.  
  > ADMIN (creater of the server), in addition, can change member role, kickout, server settings, delete server.
- Server invitation link generation
- 1on1 direct messages
- Infinite scrollable chat | **@tanstack/react-query**
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

<br/><br/>

## DevOps Features

- Containerize whole dev environment | **Devcontainer**, **Docker compose**
- Spinnig up local pre-deploy (test) Docker instance from inside devcontainer | **Docker-outside-of-docker**, **Docker compose**
- CD pipeline | **Github action**
  > that automatically:  
  > 1.builds and pushes production image to github container registry and  
  > 2.triggers all db migration for production (if changed)
- Render IaC file
  > defines production instances of both web service itself and its postgresDB that are deployed on Render
- Visualize ERD from prisma schema and validate diffs on every PR | **prisma-erd-generator**, **@mermaid-js**, **Github action**
- Code linting & formatting | **eslint**, **prettier**
- Pre-commit actions | **husky**, **lint-staged**
- Commit message linting | **@commitlint**

<br/><br/>

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

<br/><br/>

## How to start Devcontainer

1. clone this project onto your local machine.
2. install [Extension: Remote Development
   ](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) on your VSCode
3. start [Docker desktop](https://www.docker.com/ja-jp/products/docker-desktop/) on your local machine or install it if you don't have it (sorry).
4. click skyblue-color button at the bottom left VSCode editor and select "Reopen in container". This project's devcontainer will spin up soon. If you successfully spins up devcontainer, docker desktop container will be like this.

   <img width="900" alt="devcontainer" src="https://github.com/maakintosh/discord-clone/assets/102001127/15ada155-165e-4534-a0ae-84c13783de8b">

   > Everything you need is already setup, so no additional configuration is required. wow.

6. start dev environment from inside the devcontainer running:

```bash
npm run dev
```

Happy coding :)
