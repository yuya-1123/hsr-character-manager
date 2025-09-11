/**
 * 戦闘イベントシステム
 * イベント駆動型の戦闘処理を管理
 */
class BattleEventSystem {
  constructor() {
    this.listeners = new Map();
    this.eventHistory = [];
    this.debugMode = false;
  }

  /**
   * イベントリスナーを追加
   * @param {string} eventType - イベントタイプ
   * @param {string} characterId - キャラクターID
   * @param {Function} callback - コールバック関数
   */
  addEventListener(eventType, characterId, callback) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Map());
    }
    
    this.listeners.get(eventType).set(characterId, callback);
    
    if (this.debugMode) {
      console.log(`Event listener added: ${eventType} for ${characterId}`);
    }
  }

  /**
   * イベントリスナーを削除
   * @param {string} eventType - イベントタイプ
   * @param {string} characterId - キャラクターID
   */
  removeEventListener(eventType, characterId) {
    const typeListeners = this.listeners.get(eventType);
    if (typeListeners) {
      typeListeners.delete(characterId);
      if (typeListeners.size === 0) {
        this.listeners.delete(eventType);
      }
    }
  }

  /**
   * イベントを発火
   * @param {string} eventType - イベントタイプ
   * @param {Object} eventData - イベントデータ
   * @param {Object} battleState - 戦闘状態
   * @returns {Array} - 処理結果の配列
   */
  emit(eventType, eventData, battleState) {
    const timestamp = Date.now();
    const eventWithTimestamp = { ...eventData, timestamp, eventType };
    
    // イベント履歴に記録
    this.eventHistory.push(eventWithTimestamp);
    
    if (this.debugMode) {
      console.log(`Event emitted: ${eventType}`, eventData);
    }

    const typeListeners = this.listeners.get(eventType);
    if (!typeListeners) {
      return [];
    }

    const results = [];
    
    // アクティブなキャラクターのリスナーのみ実行
    for (const [characterId, callback] of typeListeners) {
      const character = battleState.team.find(char => char.id === characterId);
      if (character) {
        try {
          const result = callback(eventWithTimestamp, battleState);
          if (result) {
            results.push({
              characterId,
              result,
              timestamp
            });
          }
        } catch (error) {
          console.error(`Error in event listener for ${characterId}:`, error);
        }
      }
    }

    return results;
  }

  /**
   * イベント履歴をクリア
   */
  clearHistory() {
    this.eventHistory = [];
  }

  /**
   * イベント履歴を取得
   * @param {string} eventType - フィルターするイベントタイプ（オプション）
   * @returns {Array} - イベント履歴
   */
  getHistory(eventType = null) {
    if (eventType) {
      return this.eventHistory.filter(event => event.eventType === eventType);
    }
    return [...this.eventHistory];
  }

  /**
   * デバッグモードの切り替え
   * @param {boolean} enabled - デバッグモードを有効にするか
   */
  setDebugMode(enabled) {
    this.debugMode = enabled;
    console.log(`BattleEventSystem debug mode: ${enabled ? 'ON' : 'OFF'}`);
  }

  /**
   * 統計情報を取得
   * @returns {Object} - イベント統計
   */
  getStatistics() {
    const stats = {
      totalEvents: this.eventHistory.length,
      eventTypes: new Map(),
      characterActivity: new Map()
    };

    this.eventHistory.forEach(event => {
      // イベントタイプ別カウント
      const typeCount = stats.eventTypes.get(event.eventType) || 0;
      stats.eventTypes.set(event.eventType, typeCount + 1);

      // キャラクター別アクティビティ
      if (event.targetCharacterId) {
        const charCount = stats.characterActivity.get(event.targetCharacterId) || 0;
        stats.characterActivity.set(event.targetCharacterId, charCount + 1);
      }
    });

    return stats;
  }
}

export default BattleEventSystem;