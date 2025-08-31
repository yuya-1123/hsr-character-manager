export const firefly = {
  id: 'firefly',
  name: 'ホタル',
  type: '超撃破アタッカー',
  element: '炎',
  path: '壊滅',
  rarity: 5,
  voiceActor: '楠木ともり（ホタル）/ 笠間淳（サム）',
  stats: {
    '速度': { 
      value: '150', 
      priority: 'high', 
      note: '完全燃焼時210で4回行動可能' 
    },
    '撃破特効': { 
      value: '360%以上', 
      priority: 'high', 
      note: '超撃破ダメージの最大化に必須' 
    },
    '攻撃力': { 
      value: '3,000以上', 
      priority: 'medium', 
      note: '撃破特効に変換される' 
    },
    '会心率': { 
      value: '不要', 
      priority: 'low', 
      note: '超撃破は会心に無関係' 
    },
    '会心ダメージ': { 
      value: '不要', 
      priority: 'low', 
      note: '超撃破は会心に無関係' 
    },
    'HP': { 
      value: '任意', 
      priority: 'low', 
      note: '生存性確保程度' 
    },
    '防御力': { 
      value: '任意', 
      priority: 'low', 
      note: '生存性確保程度' 
    }
  },
  equipment: {
    '遺物セット': {
      recommended: '蝗害一掃せし機械騎士 4セット',
      effect: '撃破特効+16%、敵撃破時に超撃破ダメージ+40%',
      alternatives: ['機神バナナボート 2セット + 撃破特効系2セット']
    },
    'オーナメント': {
      recommended: '劫火蓮灯の鋳煉宮 2セット',
      effect: '撃破特効+16%、攻撃力上昇効果'
    },
    '光円錐': {
      signature: '夢が帰り着く場所（モチーフ）',
      alternatives: ['星の記憶（無課金選択肢）', '秘密の誓い（配布光円錐）']
    },
    'メインステータス': {
      '胴体': '攻撃力%',
      '脚部': '速度',
      'オーブ': '攻撃力%',
      '縄': '撃破特効%'
    }
  },
  team: {
    core: [
      { name: 'ホタル', role: 'メインDPS', note: '超撃破による高火力アタッカー', required: true },
      { name: '調和主人公', role: 'サポート', note: '超撃破バフの専門家', required: true }
    ],
    supports: [
      { name: 'ルアン・メェイ', role: 'バッファー', note: '速度・撃破特効・弱点撃破効率アップ' },
      { name: 'ギャラガー', role: 'ヒーラー', note: '炎弱点付与＋回復' }
    ]
  },
  playstyle: {
    rotation: [
      '必殺技で完全燃焼状態に移行',
      '強化スキルを3回使用',
      '強化通常攻撃でフィニッシュ',
      '完全燃焼終了、通常ローテーションに戻る'
    ],
    tips: [
      '完全燃焼中は速度210になり4回行動可能',
      '撃破特効が最重要、会心系ステータスは無視',
      '炎弱点の敵には特に強力',
      'SP消費が激しいため調和主人公との連携必須'
    ]
  }
};