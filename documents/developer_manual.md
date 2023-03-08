# 開発者マニュアル

本ドキュメントは、Luftelliメンバー向け開発マニュアルである。
開発は[koueinotou-official-deploy](https://github.com/Luftelli/koueinotou-official-deploy)ではなく[koueinotou-official](https://github.com/Luftelli/koueinotou-official)で行うこと。

## 作業準備

### 要件

- 言語: Node.js v18系列
- エディタ: VSCode

Node.jsをインストールしていない場合は、Node.jsをインストールする。
nvmを使用するのがおすすめ。Windowsなら[npm-windows](https://github.com/coreybutler/nvm-windows/releases)。

エディタはVSCode強制ではないが、自動フォーマット設定等の容易さからVSCodeを強くお勧めする。

### 必要パッケージインストール

以下のコマンドを実行する。

```bash
npm install
```

### VSCode設定

ワークスペースの推奨事項として設定されている以下の拡張機能をインストールする。
これにより、コードの自動フォーマット等が有効になる。

- ESLint: Node.js用静的解析ツールESLintのVSCode統合
- Prettier: Node.js用自動フォーマットツールPrettierのVSCode統合
- Tailwind CSS InteliSense: Tailwindのクラス指定を補完してくれる

## 作業フロー

サイト更新作業は以下のフローで行う。
フローの各項目では[リポジトリ規則](#リポジトリ規則)に従って作業を行うこと。

1. [責任者or作業者] Issue作成
1. [作業者]mainブランチから作業用ブランチを作成する
1. [作業者]目的の修正が完了するまで以下を繰り返す
    1. [作業者]作業用ブランチで修正を行う（[実装規約](#実装規約)に従うこと）
    1. [作業者]ローカルで動作確認を行う（[ローカルでの動作確認方法](#ローカルでの動作確認方法)を参照）
    1. [作業者]コミットする
    1. [作業者]プッシュする
1. [作業者]作業ブランチからmainブランチにPRを出す。reviwerは責任者に設定
1. [責任者]PRを確認し必要ならコメント・指摘する
1. [作業者]コメント・指摘があれば、全てなくなるまで返信・修正を行う※
1. [責任者]承認・マージを行う
1. [責任者]公開ページの更新を確認する
1. [責任者]Issueを閉じる

現在の責任者はCdec。

※コーディング規約違反がある場合は自動チェックにより指摘コメントが投稿される。これも全て対応してコメントを閉じること。

## 実装規約

### コーディング規約

ESLintとPrettierに従う。VSCodeで赤波線が出る部分は全て修正する。
明確な理由があり規約に従わない場合は、以下のコメントでエラーを抑制する。

```ts
// eslint-disable-next-line ルール名
```

VSCodeなら、自分で入力しなくても、赤波線にカーソルを合わせてクイックアクションを実行することで自動的に上記抑制コメントを入力してくれるので便利。

なお、コーディング規約のエラーが残っている場合は自動チェックにより指摘されるので全て対応する。
（指摘ではなくマージ不可にしたいが、Teamの無料版ではできなさそう）

規約自体は[Airbnb Style Guide](https://github.com/airbnb/javascript)に従うが、読み込む必要はない。

### 素材の規約

外部素材を使用する際は必ず利用規約・ライセンスを確認する。
以下をすべて満たす素材のみ利用可能。

- Webページでの使用可能
- 商用利用可能

利用した素材とそのURLは、[READMEの素材](../README.md#素材)に記載する。

### 共通コンポーネント

デザインを統一するために、使える部分では、`src/components`にある以下の共通コンポーネントを使う。

- Layoutコンポーネント：ページ全体のレイアウトを定義する。`sec/pages`下のコンポーネントはすべてこのコンポーネントをトップコンポーネントとして定義する
- Sectionコンポーネント：情報のグルーピング用。情報の塊はこのコンポーネントで囲う
- Boxコンポーネント: 視覚的なグルーピング用。枠で囲いたいような情報はこのコンポーネントで囲う

`src/components`にあるその他のコンポーネントについても、使えそうなら使ってもよい。

### レスポンシブ対応

本サイトはスマホとPC両方の表示に対応する。
画面幅1024pxを境目に、スマホ、PCを判定する。

これはTailwindのブレークポイントを使用することで実現可能。1024pxなので、`lg`を指定する。
必要な場合は他のブレークポイントを指定してもよい。

- [公式リファレンス](https://tailwindcss.com/docs/responsive-design)

## リポジトリ規則

### ブランチ

- main: リリース用ブランチ。ここの内容が公開されるサイトに反映される
- 作業ブランチ: 作業用ブランチ。作業時にmainブランチから作成し、mainへのマージ時に削除する

作業ブランチは以下の命名規則とする。

```txt
feature/Issue番号
```

### コミット

コミットメッセージは以下のフォーマットとする。

```txt
[コミット種別] #{Issue番号} コミット内容概要
```

コミット種別は以下のいずれか。

- add: 内容や機能追加
- update: 既存の内容や機能を更新（fixに該当するもの以外）
- fix: 既存の誤りやバグを修正
- delete: 既存の内容や機能を削除

### PR

PR明は以下のフォーマットとする。

```txt
[PR種別] #{Issue番号} PR内容概要
```

PR種別はコミット種別と同様。

PRの説明文はテンプレートに従って記入する。

### Issue

Issue名の規則は特になし。
説明については必要十分な内容を記載すること。

### タグ

現在は使用しない。

## 作業時の参考情報

### Gatsby.js

React系列のSSGフレームワーク。

`src/pages`の下に定義されたTSXファイルが一つのページを表すので、ページを追加する際は`src/pages`の下にTSXファイルを増やせばよい。

その他基本的な使い方はReactと同様。

詳細は[公式ドキュメント](https://www.gatsbyjs.com/docs/)参照。

### Tailwind CSS

ユーティリティベースのCSSフレームワーク。
用途ごとにCSSクラスが定義されているので、用途に合ったCSSクラスを選んで対象コンポーネントの`className`プロパティにクラスを指定する。

[公式リファレンス](https://tailwindcss.com/docs/installation)を参照して必要なクラスを探すのがよい。

### ローカルでの動作確認方法

以下コマンドを実行する。

```bash
npm run develop
```

実行後、以下のURLにブラウザでアクセスする。

- <http://localhost:8000>

## 構成

WebサーバーとしてNetlifyのStarterプランを使用している
本リポジトリのmainブランチに更新があった場合に、Netlifyでそれを検知して公開内容を更新するよう設定している。
Cdecのアカウントで設定しているので、設定が必要な場合はCdecに依頼すること。

ちなみに、Vercelも検討したが、Vercelは商用利用がフリープランでは不可能なため（[参考](https://vercel.com/docs/concepts/limits/fair-use-policy#commercial-usage)）候補から外した。
Netlifyはおそらく商用利用可能。

なお、`gatuby build`でビルドすると、なぜかChart.jsを使用してページが正常に表示されなくなる。
このため、これの解消方法が分かるまでは`gatuby build --no-uglify`でデプロイする。

## デプロイフロー

NetlifyのフリープランはOrganizationのprivateリポジトリ`koueinotou-official`からのデプロイに対応しておらず、これを回避するためにpublicなリポジトリ`koueinotou-official-deploy`を経由してデプロイしている。
更新作業自体は`koueinotou-official`で実施。

1. <https://github.com/Luftelli/koueinotou-official>のmainブランチにプッシュされる
1. GitHub Actionsにより<https://github.com/Luftelli/koueinotou-official-deploy>のmainに自動プッシュされる
1. `koueinotou-official-deploy`へのプッシュをトリガーにNetlifyに自動反映される
