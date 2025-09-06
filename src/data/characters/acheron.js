export const acheron = {
  // ===== 基本情報 =====
  id: 'acheron',
  name: '黄泉',
  nameEn: 'Acheron',
  type: '虚無デバフアタッカー',
  element: '雷',
  path: '虚無',
  rarity: 5,
  voiceActor: '沢城みゆき',
  icon: null, // 今後画像パスを設定

  // ===== 新追加：基礎ステータス（レベル80時）※要確認 =====
  baseStats: {
    level80: {
      hp: 1125, // 推定値、要HoYoWiki確認
      atk: 698,  // 推定値、要HoYoWiki確認
      def: 437,  // 推定値、要HoYoWiki確認
      speed: 101 // 推定値、要HoYoWiki確認
    }
  },

  // ===== 新追加：スキル倍率・計算式データ =====
  skillData: {
    basic: {
      name: '通常攻撃：三途渡り',
      scaling: 'atk',
      multiplier: 1.0,
      element: '雷',
      type: 'single_target'
    },
    skill: {
      name: 'スキル：残月',
      scaling: 'atk',
      multiplier: 1.6,
      element: '雷',
      type: 'single_target',
      debuffApplication: 'crimson_knot'
    },
    ultimate: {
      name: '必殺技：雨血天香',
      scaling: 'atk',
      multiplier: 4.8, // 基本倍率
      element: '雷',
      type: 'aoe',
      conditionalMultiplier: {
        condition: 'debuff_count >= 3',
        multiplier: 7.2 // 雷鳴状態
      }
    },
    talent: {
      name: '天賦：屠戮',
      stackingDebuff: 'crimson_knot',
      maxStacks: 9,
      ultimateCharge: {
        slashCount: 7, // 7回攻撃で必殺技発動
        condition: 'crimson_knot_stacks'
      }
    }
  },

  // ===== 変更：育成目安を統合形式に =====
  recommendedStats: {
    // 基礎能力値
    hp: {
      target: 3500,
      priority: 'low',
      note: '生存性確保程度'
    },
    atk: {
      target: 4000,
      priority: 'high',
      note: '虚無キャラとしては異例の高攻撃力'
    },
    def: {
      target: 'any',
      priority: 'low',
      note: '生存性確保程度'
    },
    speed: {
      target: 135,
      priority: 'medium',
      note: '標準的な行動順'
    },

    // 戦闘計算ステータス
    critRate: {
      target: 70,
      priority: 'high',
      note: '必殺技の雷鳴効果に必須'
    },
    critDmg: {
      target: 150,
      priority: 'high',
      note: 'メインダメージソース'
    },
    breakEffect: {
      target: 'ignore',
      priority: 'low',
      note: '虚無アタッカーには無関係'
    },
    effectHitRate: {
      target: 20,
      priority: 'medium',
      note: 'デバフ命中率確保'
    },

    // 属性ダメージ
    lightningDmg: {
      target: 50,
      priority: 'high',
      note: '雷属性ダメージ増加'
    }
  },

  // ===== 新追加：ダメージ計算式定義 =====
  damageFormulas: {
    // 通常ダメージ
    normalDamage: {
      formula: '(ATK × スキル倍率) × (1 + 雷属性ダメージ%) × (1 + その他ダメージ%) × 会心係数 × 防御軽減係数',
      factors: ['atk', 'skillMultiplier', 'lightningDmg', 'dmgBonus', 'critMultiplier', 'defReduction']
    },

    // 雷鳴状態ダメージ
    thunderDamage: {
      formula: '通常ダメージ × 雷鳴倍率 × (1 + デバフ数ボーナス)',
      factors: ['normalDamage', 'thunderMultiplier', 'debuffCountBonus'],
      condition: 'enemy_debuff_count >= 3'
    }
  },

  // ===== 新追加：特殊システム定義 =====
  specialMechanics: {
    crimsonKnot: {
      name: '緋想',
      description: 'デバフスタック、9層で雷鳴状態発動',
      maxStacks: 9,
      stackingSources: ['skill', 'ultimate', 'ally_debuffs']
    },
    thunderState: {
      name: '雷鳴',
      condition: 'crimson_knot_stacks >= 9 || enemy_debuffs >= 3',
      effects: {
        ultimateEnhanced: true,
        damageMultiplier: 1.5,
        ignoreDefense: 20
      }
    },
    nihilityResonance: {
      name: '虚無共鳴',
      condition: 'team_nihility_count >= 2',
      effects: {
        damageBonus: 15,
        critDmgBonus: 25
      }
    }
  },

  // ===== 装備情報（既存を拡張） =====
  equipment: {
    '遺物セット': {
      recommended: '開拓者のタンクローブ 2セット + 雷を伴う狂想楽団 2セット',
      effect: '攻撃力+12% + 雷属性ダメージ+10%',
      alternatives: [
        '開拓者のタンクローブ 4セット（攻撃力特化）',
        '雷を伴う狂想楽団 4セット（雷特化）'
      ],
      statBonus: {
        atkPercent: 12,
        lightningDmg: 10
      }
    },
    'オーナメント': {
      recommended: '繁星競技場 2セット',
      effect: '会心率+8%、基礎攻撃力80%以上で会心ダメージ+20%',
      statBonus: {
        critRate: 8,
        conditionalCritDmg: {
          condition: 'base_atk >= 80_percent',
          critDmgBonus: 20
        }
      }
    },
    '光円錐': {
      signature: '彼女はもう目を閉じている（モチーフ）',
      alternatives: [
        '雨のち晴れ（5星汎用）', 
        'おやすみと寝顔（4星選択肢）',
        '決意は汗のごとく（無課金）'
      ]
    },
    'メインステータス': {
      '胴体': '攻撃力% または 会心率%',
      '脚部': '攻撃力% または 速度',
      'オーブ': '雷属性ダメージ%',
      '縄': '攻撃力%'
    }
  },

  // ===== チーム・運用（変更なし） =====
  team: {
    core: [
      { name: '黄泉', role: 'メインDPS', note: '虚無デバフアタッカー', required: true },
      { name: 'ペラ', role: 'デバッファー', note: '防御力ダウン、虚無共鳴', required: false }
    ],
    supports: [
      { name: 'ルアン・メェイ', role: 'バッファー', note: 'ダメージバフと弱点撃破補助' },
      { name: 'スパークル', role: 'バッファー', note: '会心ダメージと行動順操作' },
      { name: 'ブローニャ', role: 'バッファー', note: '攻撃力バフと即行動' },
      { name: 'ギャラガー', role: 'ヒーラー', note: '回復と生存性確保' }
    ]
  },

  playstyle: {
    rotation: [
      'ペラでデバフ付与（防御ダウン等）',
      '黄泉のスキルでさらにデバフ蓄積',
      'デバフ3個以上で必殺技発動',
      '雷鳴効果で超高火力を発揮'
    ],
    tips: [
      'デバフ数が威力に直結するため、虚無キャラとの組み合わせが重要',
      '会心率70%を確保して雷鳴効果を安定発動',
      '虚無共鳴のため、ペラやヴェルトとの組み合わせを推奨',
      '必殺技のタイミングがダメージの鍵'
    ]
  }
};