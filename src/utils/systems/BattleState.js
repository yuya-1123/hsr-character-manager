import UltimateSystemManager from './UltimateSystemManager.js';
import BattleEventSystem from './BattleEventSystem.js';
import XinleiSystem from './XinleiSystem.js';

/**
 * 戦闘状態管理クラス
 * チーム、敵、召喚物、イベントシステムを統合管理
 */
class BattleState {
  constructor() {
    // 戦闘参加者
    this.team = [];
    this.enemies = [];
    this.spirits = [];

    // 戦闘進行
    this.turnOrder = [];
    this.currentTurn = 0;
    this.waveNumber = 1;
    this.combatActive = false;

    // システム管理
    this.ultimateManager = new UltimateSystemManager();
    this.eventSystem = new BattleEventSystem();

    // デバッグ・履歴
    this.actionHistory = [];
    this.debugMode = false;

    this.initializeSystems();
  }

  /**
   * システムを初期化
   */
  initializeSystems() {
    // 新蕾システムを登録
    this.ultimateManager.registerSystem('xinlei', new XinleiSystem());
    
    // 他のシステムも後で追加
    // this.ultimateManager.registerSystem('canmeng', new CanmengSystem());
  }

  /**
   * チームを設定
   * @param {Array} characters - キャラクター配列
   */
  setTeam(characters) {
    this.team = characters.map(char => ({
      ...char,
      currentHp: char.maxHp || char.baseStats?.level80?.hp || 1000,
      currentEP: char.ultimateSystem ? char.ultimateSystem.currentValue : 0,
      maxEP: char.ultimateSystem ? char.ultimateSystem.maxValue : 140,
      isActive: true
    }));

    this.registerCharacterEvents();
  }

  /**
   * キャラクターのイベントリスナーを登録
   */
  registerCharacterEvents() {
    this.team.forEach(character => {
      this.registerCharacterSpecificEvents(character);
    });
  }

  /**
   * キャラクター固有のイベントを登録
   * @param {Object} character - キャラクター
   */
  registerCharacterSpecificEvents(character) {
    const { eventSystem, ultimateManager } = this;

    switch (character.id) {
      case 'castorice':
        // HP変化イベント
        eventSystem.addEventListener('hp_change', character.id, (event, state) => {
          return ultimateManager.processEvent(character, event, state);
        });

        // 召喚物関連イベント
        eventSystem.addEventListener('spirit_summon', character.id, (event, state) => {
          return ultimateManager.processEvent(character, event, state);
        });

        eventSystem.addEventListener('spirit_dismiss', character.id, (event, state) => {
          return ultimateManager.processEvent(character, event, state);
        });

        // 戦闘開始イベント
        eventSystem.addEventListener('combat_start', character.id, (event, state) => {
          return ultimateManager.processEvent(character, event, state);
        });
        break;

      case 'acheron':
        // 黄泉の残夢システム（後で実装）
        eventSystem.addEventListener('debuff_applied', character.id, (event, state) => {
          return ultimateManager.processEvent(character, event, state);
        });
        break;

      default:
        // 標準EPシステム
        eventSystem.addEventListener('ep_gain', character.id, (event, state) => {
          return ultimateManager.processEvent(character, event, state);
        });
        break;
    }
  }

  /**
   * HP変化を処理
   * @param {string} characterId - キャラクターID
   * @param {number} amount - 変化量（負数=ダメージ、正数=回復）
   * @param {string} source - 変化の原因
   * @returns {Object} - 処理結果
   */
  changeHP(characterId, amount, source = 'unknown') {
    const character = this.team.find(char => char.id === characterId);
    if (!character) {
      console.warn(`Character not found: ${characterId}`);
      return null;
    }

    const oldHp = character.currentHp;
    const newHp = Math.max(0, Math.min(character.maxHp, character.currentHp + amount));
    const actualChange = newHp - oldHp;

    character.currentHp = newHp;

    // HP変化イベントを発火
    const event = {
      type: 'hp_change',
      targetCharacterId: characterId,
      hpChange: actualChange,
      requestedChange: amount,
      source: source,
      timestamp: Date.now()
    };

    const results = this.eventSystem.emit('hp_change', event, this);
    this.actionHistory.push({ event, results });

    if (this.debugMode) {
      console.log(`HP Change: ${characterId} ${oldHp} → ${newHp} (${actualChange})`, results);
    }

    return {
      characterId,
      oldHp,
      newHp,
      actualChange,
      eventResults: results
    };
  }

  /**
   * EP獲得を処理
   * @param {string} characterId - キャラクターID
   * @param {number} amount - EP獲得量
   * @param {string} source - 獲得の原因
   * @returns {Object} - 処理結果
   */
  gainEP(characterId, amount, source = 'unknown') {
    const event = {
      type: 'ep_gain',
      targetCharacterId: characterId,
      amount: amount,
      source: source,
      timestamp: Date.now()
    };

    const results = this.eventSystem.emit('ep_gain', event, this);
    this.actionHistory.push({ event, results });

    return results;
  }

  /**
   * 召喚物を追加
   * @param {Object} spiritData - 召喚物データ
   * @returns {Object} - 召喚結果
   */
  summonSpirit(spiritData) {
    const spirit = {
      id: `spirit_${spiritData.type}_${Date.now()}`,
      ...spiritData,
      isActive: true,
      summonTime: Date.now()
    };

    this.spirits.push(spirit);

    // 召喚イベントを発火
    const event = {
      type: 'spirit_summon',
      spiritId: spirit.id,
      spiritType: spirit.type,
      ownerId: spirit.ownerId,
      timestamp: Date.now()
    };

    const results = this.eventSystem.emit('spirit_summon', event, this);
    this.actionHistory.push({ event, results });

    if (this.debugMode) {
      console.log(`Spirit summoned:`, spirit, results);
    }

    return { spirit, results };
  }

  /**
   * 召喚物を解除
   * @param {string} spiritId - 召喚物ID
   * @returns {Object} - 解除結果
   */
  dismissSpirit(spiritId) {
    const spiritIndex = this.spirits.findIndex(s => s.id === spiritId);
    if (spiritIndex === -1) {
      return null;
    }

    const spirit = this.spirits[spiritIndex];
    this.spirits.splice(spiritIndex, 1);

    // 解除イベントを発火
    const event = {
      type: 'spirit_dismiss',
      spiritId: spiritId,
      spiritType: spirit.type,
      ownerId: spirit.ownerId,
      timestamp: Date.now()
    };

    const results = this.eventSystem.emit('spirit_dismiss', event, this);
    this.actionHistory.push({ event, results });

    return { spirit, results };
  }

  /**
   * 戦闘開始
   * @param {Object} options - 戦闘開始オプション
   */
  startCombat(options = {}) {
    this.combatActive = true;
    this.currentTurn = 0;

    const event = {
      type: 'combat_start',
      secretTechniqueUsed: options.secretTechniqueUsed || false,
      userId: options.secretTechniqueUser || null,
      timestamp: Date.now()
    };

    const results = this.eventSystem.emit('combat_start', event, this);
    this.actionHistory.push({ event, results });

    if (this.debugMode) {
      console.log('Combat started:', event, results);
    }
  }

  /**
   * 必殺技使用
   * @param {string} characterId - キャラクターID
   * @returns {Object} - 使用結果
   */
  useUltimate(characterId) {
    const character = this.team.find(char => char.id === characterId);
    if (!character) {
      return { success: false, reason: 'character_not_found' };
    }

    const result = this.ultimateManager.useUltimate(character, this);
    
    if (result.success) {
      const event = {
        type: 'ultimate_used',
        characterId: characterId,
        ultimateType: result.type,
        timestamp: Date.now()
      };

      const eventResults = this.eventSystem.emit('ultimate_used', event, this);
      this.actionHistory.push({ event, eventResults });
    }

    return result;
  }

  /**
   * デバッグモードの切り替え
   * @param {boolean} enabled - デバッグモードを有効にするか
   */
  setDebugMode(enabled) {
    this.debugMode = enabled;
    this.eventSystem.setDebugMode(enabled);
  }

  /**
   * 戦闘状態の統計を取得
   * @returns {Object} - 統計情報
   */
  getStatistics() {
    return {
      battleState: {
        combatActive: this.combatActive,
        currentTurn: this.currentTurn,
        teamSize: this.team.length,
        activeSpirits: this.spirits.filter(s => s.isActive).length,
        totalActions: this.actionHistory.length
      },
      eventStats: this.eventSystem.getStatistics(),
      characterStates: this.team.map(char => ({
        id: char.id,
        name: char.name,
        hp: { current: char.currentHp, max: char.maxHp },
        ultimateReady: this.ultimateManager.canUseUltimate(char),
        ultimateSystem: char.ultimateSystem?.type || 'standard_ep'
      }))
    };
  }

  /**
   * 戦闘状態をリセット
   */
  reset() {
    this.team = [];
    this.enemies = [];
    this.spirits = [];
    this.turnOrder = [];
    this.currentTurn = 0;
    this.combatActive = false;
    this.actionHistory = [];
    this.eventSystem.clearHistory();
  }
}

export default BattleState;