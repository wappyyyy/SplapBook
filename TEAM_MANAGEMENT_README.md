# 🦑 スプラトゥーン固定チーム管理システム

## 📋 概要

スプラトゥーンの固定チームを登録・検索できるWebアプリケーションです。XP範囲でチームを検索し、適切なメンバーを見つけることができます。

## 🚀 セットアップ手順

### 1. Supabaseプロジェクトの設定

1. [Supabase](https://supabase.com)でプロジェクトを作成
2. プロジェクトのURLとAPIキーを取得
3. `.env.local`ファイルを作成し、以下を設定:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. データベースの設定

1. Supabaseダッシュボードの「SQL Editor」を開く
2. `supabase/database-setup.sql`の内容をコピー&ペースト
3. 「RUN」ボタンを押してテーブルとサンプルデータを作成

### 3. アプリケーションの起動

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

アプリケーションは `http://localhost:3000/teams` でアクセス可能です。

## 🎯 機能紹介

### チーム登録機能

- **チーム名**: 最大50文字で入力
- **4人のメンバー情報**:
  - プレイヤー名（最大20文字）
  - XP値（1500-4000の範囲）
- **平均XP自動計算**: 4人のXP合計 ÷ 4（小数点以下切り捨て）
- **バリデーション**: 全項目必須、XP範囲チェック

### チーム検索機能

- **検索条件**: XP下限値・上限値で範囲指定
- **検索結果**: 平均XPが指定範囲内のチーム一覧
- **ソート**: 平均XP昇順で表示

## 🏗️ 技術スタック

- **フロントエンド**: Nuxt 3 + Vue 3 + TypeScript
- **スタイリング**: Tailwind CSS
- **バックエンド**: Supabase
- **アイコン**: Nuxt Icon

## 📁 プロジェクト構造

```
├── components/features/team/
│   ├── TeamRegistrationForm.vue    # チーム登録フォーム
│   ├── TeamSearchForm.vue          # チーム検索フォーム
│   ├── TeamSearchResults.vue       # 検索結果一覧
│   └── TeamCard.vue               # チーム情報カード
├── composables/
│   ├── useTeam.ts                 # チーム CRUD操作
│   └── useTeamSearch.ts           # チーム検索ロジック
├── types/
│   └── team.ts                    # チーム関連型定義
├── pages/teams/
│   └── index.vue                  # メインページ
└── supabase/
    └── database-setup.sql         # データベースセットアップ
```

## 🎨 デザインテーマ

- **カラーパレット**: スプラトゥーンらしいポップで鮮やかな色使い
  - メイン: `bg-gradient-to-r from-pink-500 to-orange-400`
  - アクセント: `text-cyan-400`, `text-purple-500`
  - 背景: `bg-gray-900` (ダークテーマベース)
- **フォント**: `font-bold`, `font-semibold`を多用してゲーム感を演出
- **レイアウト**: カード型UI、グリッドレイアウト活用

## 📊 データベーススキーマ

### teams テーブル
- `id`: UUID (Primary Key)
- `name`: VARCHAR(50) (チーム名)
- `average_xp`: INTEGER (平均XP, 1500-4000)
- `created_at`: TIMESTAMP (作成日時)

### team_members テーブル
- `id`: UUID (Primary Key)
- `team_id`: UUID (外部キー)
- `player_name`: VARCHAR(20) (プレイヤー名)
- `xp_score`: INTEGER (XP値, 1500-4000)
- `member_position`: INTEGER (メンバー位置, 1-4)
- `created_at`: TIMESTAMP (作成日時)

## 🔧 カスタマイズ

### バリデーションルールの変更

`types/team.ts` の `validationRules` オブジェクトを編集:

```typescript
export const validationRules: ValidationRules = {
  teamName: {
    required: true,
    maxLength: 50,  // チーム名の最大文字数
    pattern: /^[a-zA-Z0-9ひらがなカタカナ漢字\s]+$/
  },
  // ...
}
```

### スタイルのカスタマイズ

コンポーネント内のTailwind CSSクラスを編集してスタイルを変更できます。

## 🧪 テスト用サンプルデータ

初期セットアップ時に以下のサンプルチームが作成されます:

1. **チームイカ** (平均XP: 2100)
2. **スプラエリート** (平均XP: 3200)
3. **ナワバリウォーズ** (平均XP: 1800)
4. **ガチマッチ最強** (平均XP: 3500)
5. **初心者フレンドリー** (平均XP: 1600)

## 🚨 トラブルシューティング

### よくある問題

1. **Supabase接続エラー**
   - `.env.local`ファイルの設定を確認
   - Supabaseプロジェクトが有効か確認

2. **データが表示されない**
   - データベースのテーブルが正しく作成されているか確認
   - Row Level Security (RLS) ポリシーが適用されているか確認

3. **フォームバリデーションエラー**
   - XP値が1500-4000の範囲内か確認
   - 文字数制限を超えていないか確認

## 📝 今後の拡張案

- [ ] チーム詳細ページの追加
- [ ] チーム編集・削除機能
- [ ] プレイヤー検索機能
- [ ] お気に入りチーム機能
- [ ] マッチング履歴機能
- [ ] リアルタイムチャット機能

## 🤝 コントリビューション

プルリクエストやイシューの報告を歓迎します。機能追加や改善提案がありましたら、お気軽にご連絡ください。

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。