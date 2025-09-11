/**
 * 必殺技システム管理クラス
 * 各キャラクターの特殊な必殺技チャージシステムを統合管理
 */
class UltimateSystemManager {
  constructor() {
    this.systemHandlers = new Map();
    this.registerDefaultSystems();
  }

  /**
   * デフォルトシステムを登録
   */
  registerDefaultSystems() {
    // 後で各システムクラスをインポートして登録
    // this.registerSystem('ep', new EPSystem());
    // this.registerSystem('xinlei', new XinleiSystem());
    // this.registerSystem('canmeng', new CanmengSystem());
  }

  /**
   * 新しいシステムハンドラーを登録
   * @param {string} type - システムタイプ
   * @param {Object} handler - システムハンドラー
   */
  registerSystem(type, handler) {
    this.systemHandlers.set(type, handler);
    console.log(`Ultimate system registered: ${type}`);
  }

  /**
   * イベントを処理
   * @param {Object} character - 対象キャラクター
   * @param {Object} event - イベントデータ
   * @param {Object} battleState - 戦闘状態
   * @returns {Object|null} - 処理結果
   */
  processEvent(character, event, battleState) {
    if (!character.ultimateSystem) {
      // 標準EPシステムの場合のフォールバック処理
      return this.processStandardEP(character, event, battleState);
    }

    const systemType = character.ultimateSystem.type;
    const handler = this.systemHandlers.get(systemType);

    if (handler) {
      try {
        return handler.handleEvent(character, event, battleState);
      } catch (error) {
        console.error(`Error in ultimate system ${systemType}:`, error);
        return null;
      }
    }

    console.warn(`Unknown ultimate system type: ${systemType}`);
    return this.processStandardEP(character, event, battleState);
  }

  /**
   * 標準EPシステムの処理
   * @param {Object} character - キャラクター
   * @param {Object} event - イベント
   * @param {Object} battleState - 戦闘状態
   * @returns {Object|null} - 処理結果
   */
  processStandardEP(character, event, battleState) {
    if (event.type === 'ep_gain') {
      const newEP = Math.min(
        (character.currentEP || 0) + event.amount,
        character.maxEP || 140
      );
      
      const oldEP = character.currentEP || 0;
      character.currentEP = newEP;

      return {
        type: 'ep_change',
        characterId: character.id,
        oldValue: oldEP,
        newValue: newEP,
        gainAmount: event.amount
      };
    }

    return null;
  }

  /**
   * キャラクターの必殺技が使用可能かチェック
   * @param {Object} character - キャラクター
   * @returns {boolean} - 使用可能かどうか
   */
  canUseUltimate(character) {
    if (!character.ultimateSystem) {
      // 標準EPシステム
      return (character.currentEP || 0) >= (character.maxEP || 140);
    }

    const systemType = character.ultimateSystem.type;
    const handler = this.systemHandlers.get(systemType);

    if (handler && handler.canUseUltimate) {
      return handler.canUseUltimate(character);
    }

    // フォールバック
    return character.ultimateSystem.currentValue >= character.ultimateSystem.maxValue;
  }

  /**
   * 必殺技使用時の処理
   * @param {Object} character - キャラクター
   * @param {Object} battleState - 戦闘状態
   * @returns {Object} - 使用結果
   */
  useUltimate(character, battleState) {
    if (!this.canUseUltimate(character)) {
      return { success: false, reason: 'insufficient_energy' };
    }

    if (!character.ultimateSystem) {
      // 標準EPシステム
      character.currentEP = 5; // 通常は必殺技使用後5EP残る
      return { success: true, type: 'standard_ep' };
    }

    const systemType = character.ultimateSystem.type;
    const handler = this.systemHandlers.get(systemType);

    if (handler && handler.useUltimate) {
      return handler.useUltimate(character, battleState);
    }

    // フォールバック
    character.ultimateSystem.currentValue = 0;
    return { success: true, type: systemType };
  }
}

export default UltimateSystemManager;