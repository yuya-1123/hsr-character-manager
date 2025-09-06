export const castorice = {
  // ===== 基本情報（変更なし） =====
  id: 'castorice',
  name: 'キャストリス',
  nameEn: 'Castorice',
  type: 'HP依存召喚アタッカー',
  element: '量子',
  path: '記憶',
  rarity: 5,
  voiceActor: '斎藤千和',
  icon: null, // 今後画像パスを設定

  // ===== 新追加：基礎ステータス（レベル80時） =====
  baseStats: {
    level80: {
      hp: 1630,
      atk: 523,
      def: 485,
      speed: 95
    }
  },

  // ===== 新追加：スキル倍率・計算式データ =====
  skillData: {
    basic: {
      name: '通常攻撃：生命の枷',
      scaling: 'maxHp',
      multiplier: 0.6,
      element: '量子',
      type: 'single_target'
    },
    skill: {
      name: 'スキル：死への憧憬',
      scaling: 'maxHp',
      multiplier: 0.75,
      element: '量子',
      type: 'aoe',
      hpCost: 0.4, // 味方HP40%消費
      spCost: 0 // SP消費なし
    },
    ultimate: {
      name: '必殺技：冥界への扉',
      scaling: 'newbud',
      multiplier: 1.0,
      element: '量子',
      type: 'summon',
      effect: 'summon_netherwing'
    },
    spiritSkill: {
      name: '精霊スキル：死竜のブレス',
      scaling: 'spiritMaxHp',
      multiplier: 1.8,
      element: '量子',
      type: 'aoe',
      maxUses: 4
    },
    spiritTalent: {
      name: '精霊天賦：バウンド攻撃',
      scaling: 'spiritMaxHp',
      multiplier: 4.5,
      element: '量子',
      type: 'single_target',
      condition: 'spirit_death'
    }
  },

  // ===== 変更：育成目安を統合形式に =====
  recommendedStats: {
    // 基礎能力値
    hp: {
      target: 8500,
      priority: 'high',
      note: '死竜の攻撃力に直接影響'
    },
    atk: {
      target: 'ignore',
      priority: 'low',
      note: 'HPを参照するため無関係'
    },
    def: {
      target: 'any',
      priority: 'low',
      note: '生存性確保程度'
    },
    speed: {
      target: 95, // 基礎値以下に制限
      maxLimit: 103,
      priority: 'high',
      note: '詩人4セット効果の発動条件'
    },

    // 戦闘計算ステータス
    critRate: {
      target: 58,
      priority: 'high',
      note: 'バフ込みで会心率100%到達が目標'
    },
    critDmg: {
      target: 200,
      priority: 'high',
      note: 'ダメージの最大化'
    },
    breakEffect: {
      target: 'any',
      priority: 'low',
      note: 'HP依存アタッカーには重要度低'
    },

    // 属性ダメージ
    quantumDmg: {
      target: 40,
      priority: 'medium',
      note: '量子属性ダメージ増加'
    }
  },

  // ===== 新追加：ダメージ計算式定義 =====
  damageFormulas: {
    // キャストリス本体のダメージ
    castoriceSkill: {
      formula: '(最大HP × スキル倍率) × (1 + 量子ダメージ%) × (1 + その他ダメージ%) × 会心係数 × 防御軽減係数',
      factors: ['maxHp', 'skillMultiplier', 'quantumDmg', 'dmgBonus', 'critMultiplier', 'defReduction']
    },

    // 死竜のダメージ
    spiritDamage: {
      formula: '(死竜最大HP × 精霊スキル倍率) × (1 + ダメージボーナス%) × 会心係数 × 防御軽減係数',
      factors: ['spiritMaxHp', 'spiritMultiplier', 'dmgBonus', 'critMultiplier', 'defReduction'],
      condition: 'spirit_summoned'
    },

    // 新蕾チャージ計算
    newbudCharge: {
      formula: 'HPダメージ量 = 新蕾チャージ量',
      factors: ['hpLost'],
      maxCharge: 34000 // レベル80時
    }
  },

  // ===== 新追加：特殊システム定義 =====
  specialMechanics: {
    newbudSystem: {
      name: '新蕾システム',
      description: '味方がHPを失うとチャージ、100%で死竜召喚',
      maxCharge: 34000, // レベル80時の上限
      chargeRate: 1.0 // HPダメージ1につき新蕾チャージ1
    },
    netherwing: {
      name: '死竜（記憶の精霊）',
      baseHp: 34000, // 新蕾上限と同値
      speed: 165,
      maxActions: 4,
      abilities: ['breath_attack', 'bound_attack'],
      lifespan: 3 // ターン数
    },
    moonCocoon: {
      name: '月の繭',
      description: '所持しているだけで味方の戦闘不能を1回防ぐ',
      scope: 'global', // 編成に入っていなくても有効
      usesPerBattle: 1
    }
  },

  // ===== 装備情報（既存を拡張） =====
  equipment: {
    '遺物セット': {
      recommended: '亡国の悲哀を詠う詩人 4セット',
      effect: '速度-10、会心率+8%、記憶の精霊強化',
      alternatives: ['HP系遺物との混合も検討可能'],
      statBonus: {
        speed: -10,
        critRate: 8,
        spiritBonus: 32 // 記憶の精霊会心率+32%
      }
    },
    'オーナメント': {
      recommended: '静謐な拾骨地 2セット',
      effect: 'HP+12%、会心ダメージ+20%（HP8000以上時）',
      statBonus: {
        hpPercent: 12,
        conditionalCritDmg: {
          condition: 'hp >= 8000',
          critDmgBonus: 20
        }
      }
    },
    '光円錐': {
      signature: '永訣よ美しくあれ（モチーフ）',
      alternatives: ['過去と未来（配布選択肢）', '朝露にて（4星選択肢）']
    },
    'メインステータス': {
      '胴体': '会心ダメージ%',
      '脚部': 'HP%',
      'オーブ': 'HP%',
      '縄': 'HP%'
    }
  },

  // ===== チーム・運用（変更なし） =====
  team: {
    core: [
      { name: 'キャストリス', role: 'メインDPS', note: 'HP依存の召喚アタッカー', required: true },
      { name: '記憶主人公', role: 'サポート', note: '記憶キャラクター専用サポート', required: true }
    ],
    supports: [
      { name: 'ギャラガー', role: 'ヒーラー', note: 'HP管理とデバフ付与' },
      { name: 'ペラ', role: 'デバッファー', note: '防御力ダウンで死竜の火力上昇' }
    ]
  },

  playstyle: {
    rotation: [
      'HP調整でパーティ全体のHP管理',
      '意図的にHPを削って新蕾チャージ',
      '新蕾100%で死竜召喚',
      '死竜の4連撃→自爆で大ダメージ'
    ],
    tips: [
      '速度103以下の維持が最重要',
      'HPは高いほど死竜が強力に',
      '会心率58%以上でバフ込み100%を目指す',
      'HP管理が勝負の鍵、計画的にダメージを受ける'
    ]
  }
};