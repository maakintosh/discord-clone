# [Chatdemo](https://chatdemo-l8bt.onrender.com)

Next.js 13, Prisma ORM, TailwindCSS, Shadcn/ui, Clerk, Socket.io などを使用して構築されたフルスタックdiscordクローンウェブアプリです。Dockerコンテナ化済み。主に[こちら](https://www.codewithantonio.com/projects/team-chat-platform)のプロジェクトを参考に作りました。

## ユーザー機能

- Websocket通信によるリアルタイムメッセージング | **Socket.io**
- CRUD操作: サーバー、チャンネル、メッセージ、DM、メンバー | **Prisma**
- メンバー管理 (ゲスト、モデレーター、管理者)
  > モデレーターは招待、チャンネルの作成、コメントの削除が可能。
  > 加えて管理者 (サーバーの作成者) は、メンバーの役割変更、キックアウト、サーバー設定、サーバーの削除も可能。
- サーバー招待リンクの生成
- 1対1のDM
- 無限ローディングチャット | **@tanstack/react-query**
- ビデオ通話と音声通話 | **Livekit**
- 画像とPDFのアップロード (2MB以下。調整可能) | **Uploadthing**
- PC、タブレット、モバイル対応のUI | **TailwindCSS**、**Shadcn/ui**、**AceternityUI**
- アニメーション | **framer-motion**
- ライト/ダークモード
- 絵文字ピッカー | **@emoji-mart**
- CRUDアクション時のToastメッセージ | **React-hot-toast**
- 認証 | **Clerk**
- React状態管理 | **Zustand**
- フォーム入力検証 | **Zod**

## DevOps機能

- 開発環境全体をコンテナ化 | **Devcontainer**、**Docker compose**
- 開発コンテナ内からローカルのテスト環境Dockerインスタンスを起動 | **Docker-outside-of-docker**、**Docker compose**
- CDパイプライン | **Github action**
  > 自動的に1. 保留中の本番環境へのDBマイグレーションを起動し、2. 本番環境イメージをビルドしてGithub Container Registryにプッシュする
- Render IaCファイル
  > Renderにデプロイされた、Webサービス本体とpostgresDB両方の本番環境インスタンスを定義する
- prismaスキーマからERDを視覚化し、すべてのPR時に差分を検証 | **prisma-erd-generator**、**@mermaid-js**、**Github action**
- コードリント、フォーマット | **eslint**、**prettier**
- pre-commitアクション | **husky**、**lint-staged**
- コミットメッセージのリント | **@commitlint**

## 機能追加ロードマップ

- [x] ~~DevOpsの初期設定~~
- [x] ~~CRUDアクション時のToastメッセージ~~
- [x] ~~各アイコンホバー時のTooltip表示~~
- [x] ~~ライト / ダークモード切り替えボタン~~
- [x] ~~Devcontainerの導入~~
- [x] ~~ERDの視覚化~~
- [x] ~~ローカルのテスト環境Dockerインスタンス~~
- [x] ~~Render.comへのデプロイ~~
- [x] ~~CDパイプライン~~
- [x] ~~Render IaCファイル~~
- [x] ~~Livekit APIバグ修正~~
- [x] ~~プロジェクトアイコン~~
- [x] ~~ルートドメイン( / )にて認証保護なしの公開ランディングページ~~
- [ ] feat:UI: チャットメッセージの配置
  > 自分のメッセージを右揃え、その他を左揃えにする
  > 自分のメッセージをプライムカラー（indigo-500）にする
- [ ] feat:UI: スケルトンローディングUI
- [ ] feat: チャットメッセージへのネスト可能な返信(Youtubeのような)

## Devcontainerの起動方法

1. VSCodeに [拡張機能: Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) をインストール。

2. ローカルマシンで [Docker Desktop](https://www.docker.com/ja-jp/products/docker-desktop/) を起動します。ない場合はインストール（メンドくてすみません）。

3. エディター左下の水色のボタンをクリックし、「コンテナーで再度開く」を選択します。
   > すぐに本プロジェクトのdevcontainerが起動します。必要な拡張機能や設定が事前にすべてセットアップされているため追加の設定が一切不要です。すご。
4. devcontainer内で開発環境を起動:

```bash
npm run dev
```

Happy coding! :)
