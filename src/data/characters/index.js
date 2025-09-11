// 個別キャラクターファイルをインポート
import { firefly } from './firefly';
import { castorice } from './castorice';
import { acheron } from './acheron';
import { hyacine } from './hyacine';
import { tribbie } from './tribbie';
import { cipher } from './cipher';
// 新キャラクター追加時はここに追加

// 全キャラクターデータを統合してエクスポート
export const characterData = {
  firefly,
  castorice,
  acheron,
  hyacine,
  tribbie,
  cipher,
  // 新キャラクター追加時はここに追加
};