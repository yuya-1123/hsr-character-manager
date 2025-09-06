export const firefly = {
  // ===== 基本情報（変更なし） =====
  id: 'firefly',
  name: 'ホタル',
  nameEn: 'Firefly',
  type: '超撃破アタッカー',
  element: '炎',
  path: '壊滅',
  rarity: 5,
  voiceActor: '楠木ともり（ホタル）/ 笠間淳（サム）',
  icon: null, // 今後画像パスを設定

  // ===== 新追加：基礎ステータス（レベル80時） =====
  baseStats: {
    level80: {
      hp: 814,
      atk: 523,
      def: 776,
      speed: 104
    }
  },

  // ===== 新追加：スキル倍率・計算式データ =====
  skillData: {
    basic: {
      name: '通常攻撃：4番目の小壁',
      scaling: 'atk',
      multiplier: 1.0,
      element: '炎',
      type: 'single_target'
    },
    skill: {
      name: 'スキル：完全燃焼',
      scaling: 'atk',
      multiplier: 2.0,
      element: '炎',
      type: 'single_target',
      specialEffects: ['speed_boost', 'enhanced_state']
    },
    ultimate: {
      name: '必殺技：サムの願い',
      scaling: 'atk',
      multiplier: 3.8,
      element: '炎',
      type: 'aoe',
      breakScaling: {
        baseMultiplier: 2.0,
        breakEffectScaling: 0.15 // 撃破特効100%につき威力15%増加
      }
    },
    talent: {
      name: '天賦：炎核過載',
      superBreakMultiplier: 3.7, // 超撃破ダメージ倍率
      condition: 'enhanced_state'
    }
  },

  // ===== 変更：育成目安を統合形式に =====
  recommendedStats: {
    // 基礎能力値
    hp: {
      target: 3000,
      priority: 'low',
      note: '生存性確保程度'
    },
    atk: {
      target: 3000,
      priority: 'medium', 
      note: '撃破特効に変換される'
    },
    def: {
      target: 'any',
      priority: 'low',
      note: '生存性確保程度'
    },
    speed: {
      target: 150,
      priority: 'high',
      note: '完全燃焼時210で4回行動可能'
    },

    // 戦闘計算ステータス
    critRate: {
      target: 'ignore',
      priority: 'low',
      note: '超撃破は会心に無関係'
    },
    critDmg: {
      target: 'ignore', 
      priority: 'low',
      note: '超撃破は会心に無関係'
    },
    breakEffect: {
      target: 360,
      priority: 'high',
      note: '超撃破ダメージの最大化に必須'
    },
    outgoingHealing: {
      target: 'ignore',
      priority: 'low',
      note: 'アタッカーには無関係'
    },

    // 属性ダメージ
    fireDmg: {
      target: 50, // 遺物・オーナメントから獲得目標
      priority: 'medium',
      note: '炎属性ダメージ増加'
    },

    // エネルギー系
    energyRegenRate: {
      target: 20,
      priority: 'medium',
      note: '必殺技回転率向上'
    }
  },

  // ===== 新追加：ダメージ計算式定義 =====
  damageFormulas: {
    // 基本攻撃ダメージ
    basicDamage: {
      formula: '(ATK × スキル倍率) × (1 + 属性ダメージ%) × (1 + その他ダメージ%) × 防御軽減係数 × 耐性係数',
      factors: ['atk', 'skillMultiplier', 'elementalDmg', 'dmgBonus', 'defReduction', 'resistance']
    },
    
    // 超撃破ダメージ（ホタル専用）
    superBreakDamage: {
      formula: '(敵最大HP × 靭性係数 × 超撃破基礎倍率) × (1 + 撃破特効/100) × (1 + ダメージボーナス%)',
      factors: ['enemyMaxHp', 'toughnessMultiplier', 'superBreakBase', 'breakEffect', 'dmgBonus'],
      condition: 'enhanced_state_active'
    }
  },

  // ===== 新追加：特殊システム定義 =====
  specialMechanics: {
    enhancedState: {
      name: '完全燃焼状態',
      trigger: 'ultimate_cast',
      duration: 3, // 行動回数
      effects: {
        speedBoost: 210, // 速度固定値
        actionCount: 4, // 追加行動回数
        skillEnhancement: true,
        superBreakEnable: true
      }
    },
    superBreak: {
      name: '超撃破',
      condition: 'enhanced_state_active',
      baseDamage: 3.7,
      scaling: 'breakEffect'
    }
  },

  // ===== 装備情報（既存を拡張） =====
  equipment: {
    '遺物セット': {
      recommended: '蝗害一掃せし機械騎士 4セット',
      effect: '撃破特効+16%、敵撃破時に超撃破ダメージ+40%',
      alternatives: ['機神バナナボート 2セット + 撃破特効系2セット'],
      statBonus: {
        breakEffect: 16,
        conditionalBonus: {
          superBreakDmg: 40,
          condition: 'enemy_broken'
        }
      }
    },
    'オーナメント': {
      recommended: '劫火蓮灯の鋳煉宮 2セット',
      effect: '撃破特効+16%、攻撃力上昇効果',
      statBonus: {
        breakEffect: 16,
        conditionalAtk: {
          condition: 'breakEffect >= 150',
          atkBonus: 25
        }
      }
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

  // ===== チーム・運用（変更なし） =====
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