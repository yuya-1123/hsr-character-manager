/**
 * キャストリス専用の新蕾システム
 * 味方のHP減少を新蕾に変換、死竜の存在で動作が変化
 */
class XinleiSystem {
  constructor() {
    this.systemType = 'xinlei';
  }

  /**
   * イベントを処理
   * @param {Object} character - キャストリス
   * @param {Object} event - イベントデータ
   * @param {Object} battleState - 戦闘状態
   * @returns {Object|null} - 処理結果
   */
  handleEvent(character, event, battleState) {
    switch (event.type) {
      case 'hp_change':
        return this.processHpChange(character, event, battleState);
      case 'spirit_summon':
        return this.onSpiritSummon(character, event, battleState);
      case 'spirit_dismiss':
        return this.onSpiritDismiss(character, event, battleState);
      case 'combat_start':
        return this.onCombatStart(character, event, battleState);
      default:
        return null;
    }
  }

  /**
   * HP変化を処理
   * @param {Object} character - キャストリス
   * @param {Object} event - HP変化イベント
   * @param {Object} battleState - 戦闘状態
   * @returns {Object|null} - 処理結果
   */
  processHpChange(character, event, battleState) {
    // HP減少のみを対象とする
    if (event.hpChange >= 0) {
      return null;
    }

    // 死竜が存在するかチェック
    const dragonSpirit = this.findDragonSpirit(character, battleState);
    
    if (dragonSpirit) {
      // 死竜が存在 → 死竜のHP回復
      return this.healDragonSpirit(character, dragonSpirit, event, battleState);
    } else {
      // 死竜が存在しない → 新蕾チャージ
      return this.chargeXinlei(character, event, battleState);
    }
  }

  /**
   * 新蕾をチャージ
   * @param {Object} character - キャストリス
   * @param {Object} event - HP変化イベント
   * @param {Object} battleState - 戦闘状態
   * @returns {Object} - 処理結果
   */
  chargeXinlei(character, event, battleState) {
    const hpLoss = Math.abs(event.hpChange);
    const conversionRate = character.ultimateSystem?.conversionRules?.hpLoss?.rate || 1.0;
    const xinleiGain = Math.floor(hpLoss * conversionRate);

    const oldValue = character.ultimateSystem.currentValue;
    const newValue = Math.min(
      oldValue + xinleiGain,
      character.ultimateSystem.maxValue
    );

    character.ultimateSystem.currentValue = newValue;

    return {
      type: 'xinlei_charge',
      characterId: character.id,
      targetCharacterId: event.targetCharacterId,
      oldValue: oldValue,
      newValue: newValue,
      gainAmount: xinleiGain,
      sourceHpLoss: hpLoss,
      conversionRate: conversionRate,
      description: `${event.targetCharacterId}のHP減少${hpLoss} → 新蕾+${xinleiGain}`
    };
  }

  /**
   * 死竜のHP回復
   * @param {Object} character - キャストリス
   * @param {Object} dragonSpirit - 死竜
   * @param {Object} event - HP変化イベント
   * @param {Object} battleState - 戦闘状態
   * @returns {Object} - 処理結果
   */
  healDragonSpirit(character, dragonSpirit, event, battleState) {
    const hpLoss = Math.abs(event.hpChange);
    const healAmount = Math.floor(hpLoss); // 1:1変換（仕様要確認）

    const oldHp = dragonSpirit.currentHp;
    const newHp = Math.min(oldHp + healAmount, dragonSpirit.maxHp);
    dragonSpirit.currentHp = newHp;

    return {
      type: 'dragon_heal',
      characterId: character.id,
      spiritId: dragonSpirit.id,
      targetCharacterId: event.targetCharacterId,
      oldHp: oldHp,
      newHp: newHp,
      healAmount: newHp - oldHp,
      sourceHpLoss: hpLoss,
      description: `${event.targetCharacterId}のHP減少${hpLoss} → 死竜HP回復+${newHp - oldHp}`
    };
  }

  /**
   * 死竜召喚時の処理
   * @param {Object} character - キャストリス
   * @param {Object} event - 召喚イベント
   * @param {Object} battleState - 戦闘状態
   * @returns {Object} - 処理結果
   */
  onSpiritSummon(character, event, battleState) {
    if (event.spiritType === 'dragon' && event.ownerId === character.id) {
      return {
        type: 'xinlei_mode_change',
        characterId: character.id,
        mode: 'dragon_active',
        description: '死竜召喚：新蕾チャージ → 死竜HP回復モードに変更'
      };
    }
    return null;
  }

  /**
   * 死竜解除時の処理
   * @param {Object} character - キャストリス
   * @param {Object} event - 解除イベント
   * @param {Object} battleState - 戦闘状態
   * @returns {Object} - 処理結果
   */
  onSpiritDismiss(character, event, battleState) {
    if (event.spiritType === 'dragon' && event.ownerId === character.id) {
      return {
        type: 'xinlei_mode_change',
        characterId: character.id,
        mode: 'xinlei_charge',
        description: '死竜解除：死竜HP回復 → 新蕾チャージモードに変更'
      };
    }
    return null;
  }

  /**
   * 戦闘開始時の処理
   * @param {Object} character - キャストリス
   * @param {Object} event - 戦闘開始イベント
   * @param {Object} battleState - 戦闘状態
   * @returns {Object} - 処理結果
   */
  onCombatStart(character, event, battleState) {
    // 秘技使用の場合は新蕾30%獲得
    if (event.secretTechniqueUsed && event.userId === character.id) {
      const xinleiGain = Math.floor(character.ultimateSystem.maxValue * 0.3);
      character.ultimateSystem.currentValue = Math.min(
        character.ultimateSystem.currentValue + xinleiGain,
        character.ultimateSystem.maxValue
      );

      return {
        type: 'xinlei_charge',
        characterId: character.id,
        oldValue: character.ultimateSystem.currentValue - xinleiGain,
        newValue: character.ultimateSystem.currentValue,
        gainAmount: xinleiGain,
        source: 'secret_technique',
        description: 'キャストリス秘技使用：新蕾+30%'
      };
    }

    return null;
  }

  /**
   * 死竜を検索
   * @param {Object} character - キャストリス
   * @param {Object} battleState - 戦闘状態
   * @returns {Object|null} - 死竜オブジェクト
   */
  findDragonSpirit(character, battleState) {
    if (!battleState.spirits) {
      return null;
    }

    return battleState.spirits.find(spirit => 
      spirit.ownerId === character.id && 
      spirit.type === 'dragon' && 
      spirit.isActive
    );
  }

  /**
   * 必殺技使用可能かチェック
   * @param {Object} character - キャストリス
   * @returns {boolean} - 使用可能かどうか
   */
  canUseUltimate(character) {
    return character.ultimateSystem.currentValue >= character.ultimateSystem.maxValue;
  }

  /**
   * 必殺技使用時の処理
   * @param {Object} character - キャストリス
   * @param {Object} battleState - 戦闘状態
   * @returns {Object} - 使用結果
   */
  useUltimate(character, battleState) {
    if (!this.canUseUltimate(character)) {
      return { success: false, reason: 'insufficient_xinlei' };
    }

    // 新蕾をリセット
    character.ultimateSystem.currentValue = 0;

    // 死竜召喚処理は別途実装
    return {
      success: true,
      type: 'xinlei',
      effectType: 'dragon_summon',
      description: '死竜・ボリュクス召喚'
    };
  }

  /**
   * システム情報を取得
   * @param {Object} character - キャストリス
   * @param {Object} battleState - 戦闘状態
   * @returns {Object} - システム情報
   */
  getSystemInfo(character, battleState) {
    const dragonSpirit = this.findDragonSpirit(character, battleState);
    
    return {
      systemType: this.systemType,
      characterId: character.id,
      currentXinlei: character.ultimateSystem.currentValue,
      maxXinlei: character.ultimateSystem.maxValue,
      progressPercentage: (character.ultimateSystem.currentValue / character.ultimateSystem.maxValue) * 100,
      dragonActive: !!dragonSpirit,
      dragonHp: dragonSpirit ? { current: dragonSpirit.currentHp, max: dragonSpirit.maxHp } : null,
      mode: dragonSpirit ? 'dragon_heal' : 'xinlei_charge'
    };
  }
}

export default XinleiSystem;