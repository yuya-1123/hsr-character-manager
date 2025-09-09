// 遺物のデータ定義
export const relicSets = {
  // 4セット効果遺物
  machineKnight: {
    id: 'machineKnight',
    name: '蝗害一掃せし機械騎士',
    type: '4piece',
    effects: {
      '2piece': { breakEffect: 16 },
      '4piece': { 
        breakEffect: 16,
        superBreakDmg: 40,
        condition: 'enemy_broken' 
      }
    },
    description: '撃破特効+16%、敵撃破時に超撃破ダメージ+40%'
  },
  
  bananaBoat: {
    id: 'bananaBoat',
    name: '機神バナナボート',
    type: '4piece',
    effects: {
      '2piece': { critRate: 8 },
      '4piece': { 
        critRate: 8,
        critDmg: 36,
        condition: 'ultimate_cast'
      }
    },
    description: '会心率+8%、必殺技使用後会心ダメージ+36%'
  },

  poetOfLamentation: {
    id: 'poetOfLamentation',
    name: '亡国の悲哀を詠う詩人',
    type: '4piece',
    effects: {
      '2piece': { speed: -10, critRate: 8 },
      '4piece': {
        speed: -10,
        critRate: 8,
        spiritCritRate: 32
      }
    },
    description: '速度-10、会心率+8%、記憶の精霊会心率+32%'
  },

  // 2セット効果遺物
  pioneerTank: {
    id: 'pioneerTank',
    name: '開拓者のタンクローブ',
    type: '2piece',
    effects: {
      '2piece': { atkPercent: 12 }
    },
    description: '攻撃力+12%'
  },

  thunderOrchestra: {
    id: 'thunderOrchestra',
    name: '雷を伴う狂想楽団',
    type: '2piece',
    effects: {
      '2piece': { lightningDmg: 10 }
    },
    description: '雷属性ダメージ+10%'
  }
};

// オーナメント（プラネタリウムオーナメント）
export const ornamentSets = {
  forgePalace: {
    id: 'forgePalace',
    name: '劫火蓮灯の鋳煉宮',
    effects: {
      breakEffect: 16,
      conditionalAtk: {
        condition: 'breakEffect >= 150',
        atkBonus: 25
      }
    },
    description: '撃破特効+16%、撃破特効150%以上で攻撃力+25%'
  },

  quietBoneyard: {
    id: 'quietBoneyard',
    name: '静謐な拾骨地',
    effects: {
      hpPercent: 12,
      conditionalCritDmg: {
        condition: 'hp >= 8000',
        critDmgBonus: 20
      }
    },
    description: 'HP+12%、HP8000以上で会心ダメージ+20%'
  },

  starArena: {
    id: 'starArena',
    name: '繁星競技場',
    effects: {
      critRate: 8,
      conditionalCritDmg: {
        condition: 'base_atk >= 80_percent',
        critDmgBonus: 20
      }
    },
    description: '会心率+8%、基礎攻撃力80%以上で会心ダメージ+20%'
  }
};

// 遺物のメインステータスオプション
export const mainStatOptions = {
  body: [
    { id: 'hp_percent', name: 'HP%', value: 43.2 },
    { id: 'atk_percent', name: '攻撃力%', value: 43.2 },
    { id: 'def_percent', name: '防御力%', value: 54 },
    { id: 'crit_rate', name: '会心率%', value: 32.4 },
    { id: 'crit_dmg', name: '会心ダメージ%', value: 64.8 },
    { id: 'healing', name: '治癒量%', value: 34.6 },
    { id: 'effect_hit', name: '効果命中%', value: 43.2 }
  ],
  
  feet: [
    { id: 'hp_percent', name: 'HP%', value: 43.2 },
    { id: 'atk_percent', name: '攻撃力%', value: 43.2 },
    { id: 'def_percent', name: '防御力%', value: 54 },
    { id: 'speed', name: '速度', value: 25 }
  ],
  
  sphere: [
    { id: 'hp_percent', name: 'HP%', value: 43.2 },
    { id: 'atk_percent', name: '攻撃力%', value: 43.2 },
    { id: 'def_percent', name: '防御力%', value: 54 },
    { id: 'fire_dmg', name: '炎属性ダメージ%', value: 38.8 },
    { id: 'ice_dmg', name: '氷属性ダメージ%', value: 38.8 },
    { id: 'wind_dmg', name: '風属性ダメージ%', value: 38.8 },
    { id: 'lightning_dmg', name: '雷属性ダメージ%', value: 38.8 },
    { id: 'physical_dmg', name: '物理ダメージ%', value: 38.8 },
    { id: 'quantum_dmg', name: '量子ダメージ%', value: 38.8 },
    { id: 'imaginary_dmg', name: '虚数ダメージ%', value: 38.8 }
  ],
  
  rope: [
    { id: 'hp_percent', name: 'HP%', value: 43.2 },
    { id: 'atk_percent', name: '攻撃力%', value: 43.2 },
    { id: 'def_percent', name: '防御力%', value: 54 },
    { id: 'break_effect', name: '撃破特効%', value: 64.8 },
    { id: 'energy_regen', name: 'EP回復効率%', value: 19.4 }
  ]
};

// サブステータスの最大値（+15強化時）
export const subStatRanges = {
  hp: { min: 33, max: 127 },
  atk: { min: 16, max: 63 },
  def: { min: 16, max: 63 },
  hp_percent: { min: 3.4, max: 13.0 },
  atk_percent: { min: 3.4, max: 13.0 },
  def_percent: { min: 4.3, max: 16.2 },
  speed: { min: 2, max: 7 },
  crit_rate: { min: 2.5, max: 9.7 },
  crit_dmg: { min: 5.1, max: 19.4 },
  break_effect: { min: 5.1, max: 19.4 },
  effect_hit: { min: 3.4, max: 13.0 },
  effect_res: { min: 3.4, max: 13.0 }
};