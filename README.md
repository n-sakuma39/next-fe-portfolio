## ポートフォリオ概要
- 個人ポートフォリオサイト  
Next.jsとContentfulを使って、ポートフォリオサイト作成。

## 開発環境
- Next.js
- Contentful（CMS）
- GitHub

## 実装機能
- カテゴリーの絞り込み
- 年月の絞り込み
- タグの絞り込み
- ページネーション機能(投稿一覧ページ)
- お問い合わせフォーム

## 主なライブラリ
- eslint
- contentful
- contentful/rich-text-react-renderer
- axios
- dayjs
- react-hook-form
- react-icons

## 工夫した点
コードが冗長にならないようにリファクタリングを意識した。  
例えば、同じような記述の共通部分は、コンポーネント化して無駄な記述を減らした。

## 苦労した点
Contentfulのデータの取得のところで、絞り込みで結構時間を要しました。  
特に投稿日を取得してから表示を2023年07月とフォーマット形成して、データを処理して、  
ちゃんと年月別にソート分けするところは、不明なところは、実装方法が書いてあるサイトなどで調べつつ、  
なんとか実装出来ました。

## 今後実装したい機能など
- TypeScriptを使った実装
- APIを使ってのデータフェッチ

## 著者
[n-sakuma39](https://github.com/n-sakuma39/next-fe-portfolio)