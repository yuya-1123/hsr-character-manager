// ダメージ計算のユーティリティ関数

// 基本的なダメージ計算
export const calculateBaseDamage = (atk, multiplier, elementalDmg = 0, dmgBonus = 0) => {
  const baseDamage = atk * (multiplier / 100);
  const elementalMultiplier = 1 + (elementalDmg / 100);
  const bonusMultiplier = 1 + (dmgBonus / 100);
  
  return baseDamage * elementalMultiplier * bonusMultiplier;
};

// 会心を考慮したダメージ計算
export const calculateCritDamage = (baseDamage, critRate, critDmg) => {
  const critChance = Math.min(critRate / 100, 1); // 最大100%
  const critMultiplier = 1 + (critDmg / 100);
  
  // 期待値計算
  const normalDamage = baseDamage * (1 - critChance);
  const criticalDamage = baseDamage * critMultiplier * critChance;
  
  return {
    expected: normalDamage + criticalDamage,
    min: baseDamage,
    max: baseDamage * critMultiplier,
    critChance: critChance * 100
  };
};

// 防御・耐性計算
export const calculateDefenseReduction = (damage, enemyLevel = 80, enemyDef = 1000, resistance = 0) => {
  // 崩壊スターレイルの防御計算式（簡略版）
  const defReduction = 200 + 10 * enemyLevel / (200 + 10 * enemyLevel + enemyDef);
  const resReduction = 1 - (resistance / 100);
  
  return damage * defReduction * resReduction;
};

// 撃破特効によるダメージ計算（ホタル専用）
export const calculateSuperBreakDamage = (breakEffect, enemyMaxHp = 100000, toughnessMultiplier = 1) => {
  // 超撃破の基礎ダメージ
  const baseBreakDamage = enemyMaxHp * 0.1; // 敵最大HPの10%が基礎値（仮）
  const breakMultiplier = 1 + (breakEffect / 100);
  
  return baseBreakDamage * breakMultiplier * toughnessMultiplier * 3.7; // 3.7はホタルの超撃破倍率
};

// HP依存ダメージ計算（キャストリス専用）
export const calculateHpScalingDamage = (maxHp, multiplier, quantumDmg = 0, dmgBonus = 0) => {
  const baseDamage = maxHp * (multiplier / 100);
  const elementalMultiplier = 1 + (quantumDmg / 100);
  const bonusMultiplier = 1 + (dmgBonus / 100);
  
  return baseDamage * elementalMultiplier * bonusMultiplier;
};

// キャラクター別のダメージシミュレーション
export const simulateCharacterDamage = (character, equipment = {}, enemyStats = {}) => {
  const results = {
    characterName: character.name,
    damages: []
  };

  // デフォルトの敵ステータス
  const enemy = {
    level: enemyStats.level || 80,
    def: enemyStats.def || 1000,
    resistance: enemyStats.resistance || 0,
    maxHp: enemyStats.maxHp || 100000,
    ...enemyStats
  };

  // キャラクター別の計算
  switch (character.id) {
    case 'firefly': {
      // ホタルの場合：超撃破ダメージ中心
      const breakEffect = 360; // 目標値
      const atk = 3000; // 目標値
      const fireDmg = 50; // 炎属性ダメージボーナス
      
      // 通常攻撃
      const basicDamage = calculateBaseDamage(atk, 100, fireDmg, 0);
      results.damages.push({
        skill: '通常攻撃',
        damage: calculateDefenseReduction(basicDamage, enemy.level, enemy.def, enemy.resistance),
        type: 'single'
      });
      
      // 超撃破ダメージ（完全燃焼状態）
      const superBreakDmg = calculateSuperBreakDamage(breakEffect, enemy.maxHp);
      results.damages.push({
        skill: '超撃破（完全燃焼）',
        damage: superBreakDmg,
        type: 'super_break',
        note: '防御無視ダメージ'
      });
      
      // 必殺技
      const ultimateDamage = calculateBaseDamage(atk, 380, fireDmg, 0);
      results.damages.push({
        skill: '必殺技：サムの願い',
        damage: calculateDefenseReduction(ultimateDamage, enemy.level, enemy.def, enemy.resistance),
        type: 'aoe'
      });
      
      break;
    }
    
    case 'castorice': {
      // キャストリスの場合：HP依存ダメージ
      const maxHp = 8500; // 目標値
      const critRate = 58;
      const critDmg = 200;
      const quantumDmg = 40;
      
      // スキル（HP依存）
      const skillDamage = calculateHpScalingDamage(maxHp, 75, quantumDmg, 0);
      const skillCrit = calculateCritDamage(skillDamage, critRate, critDmg);
      results.damages.push({
        skill: 'スキル：死への憧憬',
        damage: calculateDefenseReduction(skillCrit.expected, enemy.level, enemy.def, enemy.resistance),
        type: 'aoe',
        critInfo: skillCrit
      });
      
      // 死竜の攻撃
      const spiritHp = 34000; // 新蕾上限値
      const spiritDamage = calculateHpScalingDamage(spiritHp, 180, quantumDmg, 32); // 詩人セットで会心率+32%
      const spiritCrit = calculateCritDamage(spiritDamage, critRate + 32, critDmg);
      results.damages.push({
        skill: '死竜：精霊スキル',
        damage: calculateDefenseReduction(spiritCrit.expected, enemy.level, enemy.def, enemy.resistance),
        type: 'aoe',
        critInfo: spiritCrit,
        note: '最大4回発動'
      });
      
      // 死竜の自爆
      const boundDamage = calculateHpScalingDamage(spiritHp, 450, quantumDmg, 32);
      const boundCrit = calculateCritDamage(boundDamage, critRate + 32, critDmg);
      results.damages.push({
        skill: '死竜：バウンド攻撃（自爆）',
        damage: calculateDefenseReduction(boundCrit.expected, enemy.level, enemy.def, enemy.resistance),
        type: 'single',
        critInfo: boundCrit
      });
      
      break;
    }
    
    case 'acheron': {
      // 黄泉の場合：雷鳴状態の高倍率ダメージ
      const atk = 4000; // 目標値
      const critRate = 70;
      const critDmg = 150;
      const lightningDmg = 50;
      
      // 通常攻撃
      const basicDamage = calculateBaseDamage(atk, 100, lightningDmg, 0);
      const basicCrit = calculateCritDamage(basicDamage, critRate, critDmg);
      results.damages.push({
        skill: '通常攻撃：三途渡り',
        damage: calculateDefenseReduction(basicCrit.expected, enemy.level, enemy.def, enemy.resistance),
        type: 'single',
        critInfo: basicCrit
      });
      
      // スキル
      const skillDamage = calculateBaseDamage(atk, 160, lightningDmg, 0);
      const skillCrit = calculateCritDamage(skillDamage, critRate, critDmg);
      results.damages.push({
        skill: 'スキル：残月',
        damage: calculateDefenseReduction(skillCrit.expected, enemy.level, enemy.def, enemy.resistance),
        type: 'single',
        critInfo: skillCrit
      });
      
      // 必殺技（通常）
      const ultimateDamage = calculateBaseDamage(atk, 480, lightningDmg, 0);
      const ultimateCrit = calculateCritDamage(ultimateDamage, critRate, critDmg);
      results.damages.push({
        skill: '必殺技：雨血天香',
        damage: calculateDefenseReduction(ultimateCrit.expected, enemy.level, enemy.def, enemy.resistance),
        type: 'aoe',
        critInfo: ultimateCrit
      });
      
      // 必殺技（雷鳴状態）
      const thunderDamage = calculateBaseDamage(atk, 720, lightningDmg, 50); // 雷鳴で追加ダメージボーナス
      const thunderCrit = calculateCritDamage(thunderDamage, critRate, critDmg);
      results.damages.push({
        skill: '必殺技（雷鳴状態）',
        damage: calculateDefenseReduction(thunderCrit.expected, enemy.level, enemy.def, enemy.resistance),
        type: 'aoe',
        critInfo: thunderCrit,
        note: 'デバフ3個以上で発動'
      });
      
      break;
    }
    
    default:
      results.damages.push({
        skill: 'データなし',
        damage: 0,
        type: 'none',
        note: 'このキャラクターのシミュレーションはまだ実装されていません'
      });
  }

  return results;
};