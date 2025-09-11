export const hyacine = {
  id: 'hyacine',
  name: 'ヒアンシー',
  element: '風',
  path: '記憶',
  rarity: 5,
  type: 'ヒーラー・サポーター',
  voiceActor: '羊宮妃那',
  description: '記憶の精霊「イカルン」を召喚し、高頻度の回復と火力支援を行う攻防一体のヒーラー',

  // HoYoWiki検証済み基礎ステータス（Lv80昇格完了）
  baseStats: {
    level80: {
      hp: 1086,
      atk: 388,
      def: 630,
      speed: 110
    }
  },

  // 推奨ステータス
  recommendedStats: {
    priority: ['速度200+', 'HP', '会心ダメージ'],
    description: '速度200超過で最大HP・治癒量が大幅増加。会心率は追加能力で100%になるため不要。',
    targets: {
      speed: 200,
      hp: '高いほど良い',
      critRate: '厳選不要（常時100%）',
      critDamage: '適度に',
      healingBoost: '治癒量参照'
    }
  },

  // 特殊システム
  specialMechanics: {
    spiritSummon: {
      name: 'イカルン',
      description: '記憶の精霊。味方HP減少時に自動回復、必殺技効果中は追加攻撃'
    },
    rainAfterState: {
      name: '雨上がり状態',
      description: '最大HPバフ＋イカルン強化。必殺技で3ターン付与'
    },
    speedThreshold: {
      value: 200,
      effect: '最大HP+20%、超過分1につき治癒量+1%'
    }
  },

  // スキル概要
  skills: {
    basic: {
      name: 'そよ風が雲に口付けを',
      description: '単体攻撃（最大HP参照）'
    },
    skill: {
      name: '虹が降り注ぐ時の愛',
      description: 'イカルン召喚・全体回復・デバフ解除'
    },
    ultimate: {
      name: '晨昏の中に飛び入る',
      description: '全体回復・雨上がり状態付与・最大HPバフ'
    },
    talent: {
      name: '青空と手を取り合って',
      description: 'イカルンの自動回復・雨上がり中の追加攻撃'
    }
  },

  // 推奨装備
  recommendedEquipment: {
    lightCone: {
      best: '空の虹が消えぬように（モチーフ）',
      alternatives: ['尽きぬ追憶', '光陰を織り黄金と成す']
    },
    relics: {
      main: '烈陽と雷鳴の武神 4セット',
      alternatives: []
    },
    ornament: {
      main: '深慮に浸る巨樹',
      alternatives: []
    }
  },

  // 運用方法
  usage: {
    role: 'ヒーラー・サブアタッカー',
    priority: '速度確保 > HP増強 > 会心ダメージ',
    playstyle: [
      '戦闘開始時：スキルでイカルン召喚',
      '必殺技で雨上がり状態維持',
      '味方HP減少時の自動回復',
      'SP消費多め（モチーフ光円錐推奨）'
    ]
  },

  // チーム編成例
  teamComposition: {
    bestPartners: [
      'キャストリス（HP消費シナジー）',
      'モーディス（HP消費アタッカー）',
      '刃（HP消費アタッカー）'
    ],
    roleInTeam: 'メインヒーラー・サブアタッカー',
    synergy: 'HP消費キャラとの相性抜群。最大HPバフでHP参照アタッカーの火力支援'
  },

  // 育成優先度
  buildPriority: {
    '1': '速度200到達（最優先）',
    '2': 'HPステータス強化',
    '3': '会心ダメージ（余裕があれば）',
    '4': '効果抵抗（デバフ解除用）'
  }
};