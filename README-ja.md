# Chatdemo<br/><https://chatdemo-l8bt.onrender.com>

English README [here]()

> **このプロジェクトは主に[こちら](https://www.codewithantonio.com/projects/team-chat-platform)のチュートリアルを元に作成しました。**

#### Next.js 13, Prisma, TailwindCSS, Shadcn/ui, Clerk, Socket.ioなどを使用して構築したフルスタックdiscordクローンウェブアプリです。Dockerコンテナ化済み。

<br/>  
<img width="200" alt="chatdemo-app" src="https://github.com/maakintosh/discord-clone/assets/102001127/ae92abaa-e28b-469e-bc67-2cc341b6e1de">
<img width="200" alt="create-server" src="https://github.com/maakintosh/discord-clone/assets/102001127/ea1da402-418a-46af-ba91-6249a3a9399d">
<img width="200" alt="server-header-dropdown" src="https://github.com/maakintosh/discord-clone/assets/102001127/98583fc8-00fe-4acb-b994-cc838e5b65e5">

**サインインしてサーバーを作成したら、ご気軽にこの[デモサーバー](https://chatdemo-l8bt.onrender.com/invite/8b956d5a-2900-4545-bf12-958693184e5f)に参加して、いくつかの機能を簡単に試してみてください！**  
また、完成までの開発履歴はすべて[Github project](https://github.com/users/maakintosh/projects/6/views/1)にて記録されています。

> **本アプリは、商用ではなくデモンストレーションを目的としており、Render.comの無料プランにデプロイされています。そのため以下のような[制限](https://docs.render.com/free)がかかっています。**
>
> 1. 15分間操作がないと毎回サービスがスリープし、再起動に1分ほど必要。  
>    申し訳ありません..あと数秒ですので..そこをなんとかっ..ああっ..
> 2. 月間の使用量制限

<br/><br/>

## ユーザー機能

- Websocket通信によるリアルタイムメッセージング | **Socket.io**
- CRUD操作: サーバー、チャンネル、メッセージ、DM、メンバー | **Prisma**
- メンバー管理 (ゲスト、モデレーター、管理者)
  > モデレーターは招待、チャンネルの作成、コメントの削除が可能。  
  > 加えて管理者 (サーバーの作成者) は、メンバーの役割変更、追放、サーバー設定、サーバーの削除も可能。
- サーバー招待リンクの生成
- 1対1のDM
- 無限スクロールチャット | **@tanstack/react-query**
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

<br/><br/>

## DevOps機能

- 開発環境全体をコンテナ化 | **Devcontainer**、**Docker compose**
- 開発コンテナ内からローカルのテスト環境Dockerインスタンスを起動 | **Docker-outside-of-docker**、**Docker compose**
- CDパイプライン | **Github action**
  > 自動的に  
  > 1.本番環境イメージをビルドしてGithub Container Registryにプッシュし  
  > 2.（変更があれば）本番環境へのDBマイグレーションを全て実行する
- Render IaCファイル
  > RenderにデプロイされたWebサービス本体とpostgresDB両方の本番環境インスタンスを定義する
- prismaスキーマからERDを視覚化し、PR時に差分を検証 | **prisma-erd-generator**、**@mermaid-js**、**Github action**
- コードリント、フォーマット | **eslint**、**prettier**
- pre-commitアクション | **husky**、**lint-staged**
- コミットメッセージのリント | **@commitlint**

<br/><br/>

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

<br/><br/>

## Devcontainerの起動方法

1. このプロジェクトをローカルマシンにクローンします。

2. VSCodeに [拡張機能: Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) をインストール。

3. ローカルマシンで [Docker Desktop](https://www.docker.com/ja-jp/products/docker-desktop/) を起動します。ない場合はインストール（メンドくてすみません）。

4. VSCodeエディター左下の水色のボタンをクリックし、「コンテナーで再度開く」を選択します。すぐに本プロジェクトのdevcontainerが起動します。  
   devcontainerが正常に起動すると、Docker Desktop上のコンテナは次のようになります。  
    <img width="900" alt="devcontainer" src="https://github.com/maakintosh/discord-clone/assets/102001127/15ada155-165e-4534-a0ae-84c13783de8b">

   > 必要な拡張機能や設定が事前にすべてセットアップされているため、追加の設定は一切不要です。すご。

5. devcontainer内で開発環境を起動:

```bash
npm run dev
```

Happy coding! :)
