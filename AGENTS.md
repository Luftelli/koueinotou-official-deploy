# Copilot向けガイド

## プロジェクト概要
- Gatsby 5 + TypeScriptで構築した「光影の塔」公式サイト。主要ページは`src/pages`配下にあり、Netlifyへデプロイされる。
- すべてのページは`Layout`でラップし、`ParallaxBackground`・`Header`・`Footer`を組み合わせたパララックス背景の中央寄せレイアウトを維持する。
- メタデータとOpenGraphは`HeadBase`で統一管理。各ページで`Head`をエクスポートし、タイトルと説明文を適切に渡す。

## レイアウトとスタイリング
- セクションの配置は`Section`で、半透明パネルは`Box`で包むのが既定パターン。
- スタイルはTailwind + daisyUI。共通のフォントやスクロールバー設定は`src/styles/global.css`に集約されている。
- `Button`は内部リンク/外部リンクを自動判定し、外部は`gatsby-plugin-google-gtag`の`OutboundLink`経由にするため再利用すること。
- 画像や動画などのリッチメディアは`StaticImage`または`src/images`からの直接importを使用し、Gatsbyの画像パイプラインを崩さない。

## データと機能
- 開発状況ページは`contents/tasks/asana_tasks.json`を`allTasksJson`として取得する。新しいフィールドを扱う場合は`development-status.tsx`内でマッピングを追加する。
- 進捗計算ロジックは`features/task/models.tsx`の`Task`・`TaskGroup`・`TaskStatus`に集約されている。拡張時は既存メソッドを利用し、`assertNever`で分岐を網羅する。
- `TaskProgressSection`はChart.jsのドーナツグラフを描画する。サーバー/クライアント差異を避けるため、`useLayoutEffect`内でのプラグイン登録処理を両方更新すること。
- `development-history.tsx`は`react-chrono`を用いたタイムライン。`items`配列を直接更新するか、`contents/histories`のMarkdown読込に発展させる。

## コンテンツパイプライン
- ビルド前にAsana進捗データを取得する場合は`.env`へ`ASANA_API_TOKEN`、`ASANA_PROJECT_ID`、`ASANA_API_READ_CONCURRENT_CALL_LIMIT`、`ASANA_API_WRITE_CONCURRENT_CALL_LIMIT`、必要なら`BLACK_WORD_LIST`を設定し、`npm run asana_fetch`を実行する。
- フェッチスクリプト`tools/asana_task_fetcher.ts`は`contents/tasks/asana_tasks.json`を書き換えつつ、NGワードを除去する。状況が変わったら生成されたJSONもコミットに含める。

## ビルドとデプロイ
- Node.js 18系（Voltaで固定）が必須。バージョンを切り替えたら`npm install`を一度走らせる。
- ローカルプレビューは`npm run develop`で起動し、`http://localhost:8000`にアクセスする。
- 本番ビルドは`npm run build`を使用する。`gatsby build --no-uglify`を内包しており、Chart.jsの難読化問題を回避するため必須。
- Netlifyは`koueinotou-official-deploy`リポジトリをミラーとして参照する。Cdecとの調整なしに自動デプロイ設定を変更しない。
- `gatsby-node.ts`では旧Netlifyプレビューからの恒久リダイレクトを追加済み。将来のドメイン移行時は同様のパターンを流用する。

## コーディング規約と注意点
- ESLint + Prettier（Airbnbベース）を遵守し、抑制コメントは最終手段。自動修正で解決すること。
- GatsbyのGraphQL型定義（`Queries.*`）を活用し、`graphql`タグ内以外でクエリ文字列を操作しない。
- レスポンシブは`lg`（1024px）を基準にTailwindユーティリティを配置している。特に`src/pages/index.tsx`のパターンに倣う。
- フッターはクライアントで`© Luftelli {year}`を描画するため、SSR専用APIで現在年を決定しないこと。
- 外部スクリプトや解析ツールを追加する際は`gatsby-config.ts`のプラグイン設定に集約し、ページ個別で直接埋め込まない。

## ゲームの仕様
- ページで紹介しているゲーム「光影の塔」の使用は`./documents/game_spec.md`を参照。
