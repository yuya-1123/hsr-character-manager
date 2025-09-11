export const tribbie = {
  id: 'tribbie',
  name: 'トリビー',
  element: '量子',
  path: '調和',
  rarity: 5,
  type: 'サポーター・サブアタッカー',
  voiceActor: '遠野ひかる',
  description: '運命の三つ子の一員。全属性耐性貫通と追加攻撃で味方をサポートする汎用調和キャラ',

  // HoYoWiki検証済み基礎ステータス（Lv80昇格完了）
  baseStats: {
    level80: {
      hp: 1048,
      atk: 523,
      def: 727,
      speed: 96
    }
  },

  // 推奨ステータス
  recommendedStats: {
    priority: ['HP5000+', '速度95未満', '会心率68%'],
    description: '亡国の悲哀を詠う詩人4セットで速度デバフを活用。HP参照攻撃のため高HP重視。',
    targets: {
      hp: 5000,
      speed: 95, // 詩人4セット効果発動条件
      critRate: 68, // 戦闘中+32%で100%
      critDamage: '適度に',
      energyRegeneration: 'EP回復（必殺技回転率）'
    }
  },

  // 特殊システム
  specialMechanics: {
    divineRevelation: {
      name: '神の啓示',
      description: '味方全体に全属性耐性貫通+24%を3ターン付与'
    },
    boundary: {
      name: '結界（必殺技）',
      description: '敵全体の被ダメージ+30%、付加ダメージ発生、2ターン継続'
    },
    tripleNature: {
      description: 'トリビー・トリアン・トリノンの3体で構成。百界門を開く能力'
    }
  },

  // スキル概要
  skills: {
    basic: {
      name: 'あたちたちを見くびらないほうがいいわ！',
      description: '拡散攻撃（隣接含む、HP参照）'
    },
    skill: {
      name: 'いいお知らせ！',
      description: '自身に神の啓示付与（全属性耐性貫通バフ）'
    },
    ultimate: {
      name: 'ここに住んでるのは誰でしょう！',
      description: '全体攻撃＋結界展開（被ダメージ増加）'
    },
    talent: {
      name: 'どたばたトリビー',
      description: '味方必殺技発動時に追加攻撃（全体、各キャラ1回/ターン）'
    }
  },

  // 推奨装備
  recommendedEquipment: {
    lightCone: {
      best: 'もしも時が花だったら（モチーフ）',
      alternatives: ['ダンス！ダンス！ダンス！', '彫月裁雲の意']
    },
    relics: {
      main: '亡国の悲哀を詠う詩人 4セット',
      alternatives: []
    },
    ornament: {
      main: '静謐な拾骨地',
      alternatives: []
    }
  },

  // 運用方法
  usage: {
    role: 'サポーター・サブアタッカー',
    priority: 'HP確保 > 速度調整 > 会心系',
    playstyle: [
      'スキル→通常→通常のサイクル',
      '必殺技は即撃ち（2ターン回転推奨）',
      '天賦追加攻撃で手数増加',
      'SP供給可能（スキル間隔長い）'
    ]
  },

  // チーム編成例
  teamComposition: {
    bestPartners: [
      'マダムヘルタ（追加攻撃シナジー）',
      'アグライア（EP回復シナジー）',
      '黄泉（虚無デバフシナジー）',
      'キャストリス（HP参照アタッカー）'
    ],
    roleInTeam: '汎用サポーター・火力補助',
    synergy: '全体攻撃・必殺技頻発キャラと好相性。属性耐性貫通で全アタッカー強化'
  },

  // 育成優先度
  buildPriority: {
    '1': 'HP5000到達（火力・耐久両面）',
    '2': '速度95未満調整（詩人効果）',
    '3': '会心率68%（戦闘中100%）',
    '4': 'EP回復効率（必殺技回転率）'
  },

  // 凸効果
  eidolonPriority: {
    '1': '確定ダメージ追加（総ダメージ24%増加相当）',
    '2': '全体会心ダメージバフ',
    '6': '追加攻撃強化（完凸ゴリビー）'
  }
};