# Anki

Anki はあらゆる言語にの勉強をサポートする単語帳 Web アプリです。従来の単語帳アプリの不便なところを払拭し、より効率的な勉強を推進します。

![image](https://github.com/iwagoro/Anki/assets/42830468/a376bf5a-125d-49c5-a686-d59c2792f21a)

## 特徴

-   **通信環境の悪い場所でもストレスフリーな学習** : バックエンドとの通信は単語帳をめくるたびに行われるのではなく、ローカルに保存して一斉に行うため、ある程度通信環境が悪くても使用できます。
-   **厳格な苦手な単語の徹底的な排除** : 単語ごとに、正解回数と不正解回数の２つの値を持っています。不正解回数が正解回数よりも３多くなると、自動的に苦手な単語へと追加されます。これを解除するには正解回数が不正解回数が一緒になるまで正解する必要があります。また、正解回数は不正解回数＋１よりも多くなることはありません。
-   **最も無駄な単語帳作成時間を排除** : 単語帳を作成するのは最も無駄な時間です。その時間に何個の単語を学習できるでしょうか。しかしこのアプリでは、ChatGPT と cloud vision を使い作成時間を大幅削減を可能にします。ニュース記事や英語論文など、文章が含まれた画像をアップロードすると、自動で文章が抽出されます。文章から任意の単語を選ぶと、その文章を考慮した意味を ChatGPT が生成します。
-   **隙間時間の有効活用** : 単語学習の履歴はリアルタイムで保存されます。途中で学習を終了しても学習履歴はリセットされず記録されます。

## 技術スタック

### フロントエンド

<div style="display:flex;gap:1.25rem;">
<img src="https://img.shields.io/badge/-Next.js-000000.svg?logo=next.js&style=flat-square">
<img src="https://img.shields.io/badge/-tailwindcss-000000.svg?logo=tailwindcss&style=flat-square">
<img src="https://img.shields.io/badge/-shadcn-000000.svg?logo=shadcnui&style=flat-square">
<img src="https://img.shields.io/badge/-firebase-000000.svg?logo=firebase&style=flat-square">
<img src="https://img.shields.io/badge/-vercel-000000.svg?logo=vercel&style=flat-square">
</div>

### バックエンド

<div style="display:flex;gap:1.25rem;">
  
<img src="https://img.shields.io/badge/-fastapi-000000.svg?logo=fastapi&style=flat-square">
<img src="https://img.shields.io/badge/-sqlalchemy-000000.svg?logo=sqlalchemy&style=flat-square">
<img src="https://img.shields.io/badge/-postgresql-000000.svg?logo=postgresql&style=flat-square">
<img src="https://img.shields.io/badge/-firebase-000000.svg?logo=firebase&style=flat-square">
<img src="https://img.shields.io/badge/-pydantic-000000.svg?logo=pydantic&style=flat-square">
<img src="https://img.shields.io/badge/-openai-000000.svg?logo=openai&style=flat-square">
<img src="https://img.shields.io/badge/-google%20cloud-000000.svg?logo=googlecloud&style=flat-square">
<img src="https://img.shields.io/badge/-supabase-000000.svg?logo=supabase&style=flat-square">
</div>

## データベース

![image](https://github.com/iwagoro/Anki/assets/42830468/e3c950a7-6c50-4115-a52f-926400922135)

## セットアップ

```
# リポジトリをクローン
git clone https://github.com/iwagoro/Anki.git

# ディレクトリに移動
cd Anki

# 依存関係をインストール
yarn install

# 実行
yarn dev
```

## ライセンス

MIT
