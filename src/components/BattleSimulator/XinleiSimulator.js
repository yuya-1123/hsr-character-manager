import React, { useState, useEffect } from 'react';
import BattleState from '../../utils/systems/BattleState.js';
import { characterData } from '../../data/characters';
import './CSS/XinleiSimulator.css';

/**
 * キャストリスの新蕾システムデモンストレーター
 * 実際の動作を確認できるシミュレーター
 */
const XinleiSimulator = () => {
  const [battleState, setBattleState] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(['castorice', 'hyacine', 'tribbie']);
  const [actionLog, setActionLog] = useState([]);
  const [debugMode, setDebugMode] = useState(true);

  // 戦闘状態を初期化
  useEffect(() => {
    const newBattleState = new BattleState();
    newBattleState.setDebugMode(debugMode);
    setBattleState(newBattleState);
  }, [debugMode]);

  // チーム設定
  const setupTeam = () => {
    if (!battleState) return;

    const team = selectedTeam.map(charId => {
      const char = { ...characterData[charId] };
      // 初期HP設定
      char.maxHp = char.baseStats.level80.hp;
      char.currentHp = char.maxHp;
      
      // 新蕾システムの初期化
      if (char.ultimateSystem) {
        char.ultimateSystem.currentValue = 0;
      }
      
      return char;
    });

    battleState.setTeam(team);
    addToLog('チーム設定完了', 'system');
    forceUpdate();
  };

  // HPダメージをシミュレート
  const simulateHpDamage = (characterId, amount) => {
    if (!battleState) return;

    const result = battleState.changeHP(characterId, -amount, 'simulation');
    if (result) {
      addToLog(`${characterId}に${amount}ダメージ → 新蕾チャージ反応`, 'damage');
      
      // 新蕾チャージの結果を表示
      if (result.eventResults && result.eventResults.length > 0) {
        result.eventResults.forEach(eventResult => {
          if (eventResult.result?.type === 'xinlei_charge') {
            addToLog(`新蕾+${eventResult.result.gainAmount} (${eventResult.result.oldValue}→${eventResult.result.newValue})`, 'xinlei');
          }
        });
      }
    }
    forceUpdate();
  };

  // 死竜召喚をシミュレート
  const summonDragon = () => {
    if (!battleState) return;

    const castorice = battleState.team.find(char => char.id === 'castorice');
    if (!castorice) return;

    // 死竜データ
    const dragonData = {
      type: 'dragon',
      name: 'ボリュクス',
      ownerId: 'castorice',
      maxHp: castorice.ultimateSystem.maxValue,
      currentHp: castorice.ultimateSystem.maxValue,
      stats: castorice.spiritSystem.stats
    };

    const result = battleState.summonSpirit(dragonData);
    if (result) {
      addToLog(`死竜ボリュクス召喚！HP: ${dragonData.currentHp}`, 'summon');
    }
    forceUpdate();
  };

  // 必殺技使用
  const useUltimate = (characterId) => {
    if (!battleState) return;

    const result = battleState.useUltimate(characterId);
    if (result.success) {
      addToLog(`${characterId}の必殺技発動！`, 'ultimate');
      if (result.effectType === 'dragon_summon') {
        setTimeout(() => summonDragon(), 500);
      }
    } else {
      addToLog(`必殺技使用失敗: ${result.reason}`, 'error');
    }
    forceUpdate();
  };

  // ログ追加
  const addToLog = (message, type) => {
    const newEntry = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toLocaleTimeString()
    };
    setActionLog(prev => [...prev.slice(-20), newEntry]);
  };

  // 強制更新用
  const [updateCounter, setUpdateCounter] = useState(0);
  const forceUpdate = () => setUpdateCounter(prev => prev + 1);

  // 戦闘開始
  const startCombat = () => {
    if (!battleState) return;
    battleState.startCombat({ secretTechniqueUsed: true, secretTechniqueUser: 'castorice' });
    addToLog('戦闘開始 - キャストリス秘技使用', 'system');
    forceUpdate();
  };

  // リセット
  const resetSimulation = () => {
    if (!battleState) return;
    battleState.reset();
    setActionLog([]);
    addToLog('シミュレーションリセット', 'system');
    forceUpdate();
  };

  // キャストリスの新蕾情報を取得
  const getCastoriceXinleiInfo = () => {
    if (!battleState || !battleState.team) return null;
    
    const castorice = battleState.team.find(char => char.id === 'castorice');
    if (!castorice || !castorice.ultimateSystem) return null;

    const xinleiSystem = battleState.ultimateManager.systemHandlers.get('xinlei');
    if (xinleiSystem && xinleiSystem.getSystemInfo) {
      return xinleiSystem.getSystemInfo(castorice, battleState);
    }

    return {
      currentXinlei: castorice.ultimateSystem.currentValue,
      maxXinlei: castorice.ultimateSystem.maxValue,
      progressPercentage: (castorice.ultimateSystem.currentValue / castorice.ultimateSystem.maxValue) * 100
    };
  };

  const xinleiInfo = getCastoriceXinleiInfo();

  return (
    <div className="xinlei-simulator">
      <div className="simulator-header">
        <h2>🐉 キャストリス新蕾システム シミュレーター</h2>
        <div className="debug-toggle">
          <label>
            <input 
              type="checkbox" 
              checked={debugMode} 
              onChange={(e) => setDebugMode(e.target.checked)}
            />
            デバッグモード
          </label>
        </div>
      </div>

      <div className="simulator-content">
        <div className="control-panel">
          <div className="team-setup">
            <h3>チーム設定</h3>
            <button onClick={setupTeam} className="btn-primary">
              チーム初期化
            </button>
            <button onClick={startCombat} className="btn-secondary">
              戦闘開始
            </button>
            <button onClick={resetSimulation} className="btn-danger">
              リセット
            </button>
          </div>

          <div className="action-controls">
            <h3>アクション</h3>
            <div className="damage-controls">
              <h4>HPダメージシミュレート</h4>
              {battleState?.team?.map(char => (
                <div key={char.id} className="character-damage-control">
                  <span>{char.name}</span>
                  <button onClick={() => simulateHpDamage(char.id, 500)}>
                    -500HP
                  </button>
                  <button onClick={() => simulateHpDamage(char.id, 1000)}>
                    -1000HP
                  </button>
                </div>
              ))}
            </div>

            <div className="ultimate-controls">
              <h4>必殺技</h4>
              <button 
                onClick={() => useUltimate('castorice')}
                disabled={!xinleiInfo || xinleiInfo.progressPercentage < 100}
                className="btn-ultimate"
              >
                キャストリス必殺技
              </button>
            </div>
          </div>
        </div>

        <div className="status-panel">
          {/* 新蕾ゲージ */}
          {xinleiInfo && (
            <div className="xinlei-gauge">
              <h3>新蕾ゲージ</h3>
              <div className="gauge-container">
                <div 
                  className="gauge-fill" 
                  style={{ width: `${xinleiInfo.progressPercentage}%` }}
                ></div>
                <div className="gauge-text">
                  {xinleiInfo.currentXinlei} / {xinleiInfo.maxXinlei} 
                  ({xinleiInfo.progressPercentage.toFixed(1)}%)
                </div>
              </div>
              <div className="xinlei-mode">
                モード: {xinleiInfo.dragonActive ? '死竜HP回復' : '新蕾チャージ'}
              </div>
            </div>
          )}

          {/* チーム状態 */}
          <div className="team-status">
            <h3>チーム状態</h3>
            {battleState?.team?.map(char => (
              <div key={char.id} className="character-status">
                <div className="char-name">{char.name}</div>
                <div className="char-hp">
                  HP: {char.currentHp} / {char.maxHp}
                </div>
                <div className="char-ultimate">
                  必殺技: {battleState.ultimateManager.canUseUltimate(char) ? '✓' : '✗'}
                </div>
              </div>
            ))}
          </div>

          {/* 召喚物状態 */}
          {battleState?.spirits?.length > 0 && (
            <div className="spirits-status">
              <h3>召喚物</h3>
              {battleState.spirits.map(spirit => (
                <div key={spirit.id} className="spirit-status">
                  <div className="spirit-name">{spirit.name}</div>
                  <div className="spirit-hp">
                    HP: {spirit.currentHp} / {spirit.maxHp}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* アクションログ */}
      <div className="action-log">
        <h3>アクションログ</h3>
        <div className="log-container">
          {actionLog.map(entry => (
            <div key={entry.id} className={`log-entry log-${entry.type}`}>
              <span className="log-time">{entry.timestamp}</span>
              <span className="log-message">{entry.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default XinleiSimulator;