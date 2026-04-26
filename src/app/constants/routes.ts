/**
 * アプリケーション全体のルートパス定数。
 *
 * - 静的ルート: 文字列リテラルで定義。
 * - 動的ルート: ファクトリ関数で表現（マジックストリング排除）。
 *
 * 使用例:
 *   import { ROUTES } from "@/constants/routes";
 *   router.push(ROUTES.play.root);
 *   router.push(ROUTES.play.result("abc-123"));
 */
export const ROUTES = {
  // ----------------------------------------------------------
  // P-01: タイトル（TOP）
  // ----------------------------------------------------------
  top: "/" as const,

  // ----------------------------------------------------------
  // P-02, P-03: 出題・回答 / 正解・解説・評価
  // ----------------------------------------------------------
  play: {
    /** /play — ランダム出題 */
    root: "/play" as const,

    /** /play/[id] — 指定 ID の謎を出題 */
    detail: (id: string): string => `/play/${id}`,

    /** /play/[id]/result — 正解・解説・評価画面 */
    result: (id: string): string => `/play/${id}/result`,
  },

  // ----------------------------------------------------------
  // P-04: ログイン
  // ----------------------------------------------------------
  auth: {
    /** /auth/signin */
    signIn: "/auth/signin" as const,

    /** /auth/callback — OAuth コールバック（内部遷移のみ） */
    callback: "/auth/callback" as const,
  },

  // ----------------------------------------------------------
  // P-05: 制作者ダッシュボード
  // ----------------------------------------------------------
  creator: {
    /** /creator/dashboard */
    dashboard: "/creator/dashboard" as const,

    editor: {
      /** /creator/editor — 新規作成 */
      new: "/creator/editor" as const,

      /** /creator/editor/[id] — 既存謎の編集 */
      edit: (id: string): string => `/creator/editor/${id}`,
    },
  },

  // ----------------------------------------------------------
  // P-07: マイページ・退会
  // ----------------------------------------------------------
  settings: {
    /** /settings/profile */
    profile: "/settings/profile" as const,
  },

  // ----------------------------------------------------------
  // P-08〜P-11: 管理者
  // ----------------------------------------------------------
  admin: {
    /** /admin — 管理者TOP */
    root: "/admin" as const,

    /** /admin/reports — 通報一覧 */
    reports: "/admin/reports" as const,

    /** /admin/riddles — 全投稿一覧 */
    riddles: "/admin/riddles" as const,

    /** /admin/users — ユーザー管理 */
    users: "/admin/users" as const,
  },
} as const;

/**
 * ROUTES のすべての静的パス文字列を表すユーティリティ型。
 * 動的ルート（ファクトリ関数）は除外する。
 *
 * 使用例: リンクの href 型制約として利用。
 */
export type StaticRoute =
  | typeof ROUTES.top
  | typeof ROUTES.play.root
  | typeof ROUTES.auth.signIn
  | typeof ROUTES.auth.callback
  | typeof ROUTES.creator.dashboard
  | typeof ROUTES.creator.editor.new
  | typeof ROUTES.settings.profile
  | typeof ROUTES.admin.root
  | typeof ROUTES.admin.reports
  | typeof ROUTES.admin.riddles
  | typeof ROUTES.admin.users;
