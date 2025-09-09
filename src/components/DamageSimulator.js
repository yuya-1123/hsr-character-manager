import React, { useState, useEffect } from 'react';
import { simulateCharacterDamage } from '../utils/damageCalculator';
import './CSS/DamageSimulator.css';

const DamageSimulator = ({ character }) => {
  const [simulationResults, setSimulationResults] = useState(null);
  const [enemySettings, setEnemySettings] = useState({
    level: 80,
    def: 1000,
    resistance: 0,
    maxHp: 100000
  });

  useEffect(() => {
    if (character) {
      runSimulation();
    }
  }, [character, enemySettings]);

  const runSimulation = () => {
    const results = simulateCharacterDamage(character, {}, enemySettings);
    setSimulationResults(results);
  };

  const formatDamage = (damage) => {
    if (damage >= 1000000) {
      return `${(damage / 1000000).toFixed(2)}M`;
    } else if (damage >= 1000) {
      return `${(damage / 1000).toFixed(1)}K`;
    }
    return Math.round(damage).toString();
  };

  const getDamageTypeColor = (type) => {
    switch (type) {
      case 'super_break': return '#ff6b6b';
      case 'aoe': return '#4ecdc4';
      case 'single': return '#ffd93d';
      default: return '#95e1d3';
    }
  };

  if (!simulationResults) {
    return <div className="simulator-loading">シミュレーション準備中...</div>;
  }

  return (
    <div className="damage-simulator">
      <h3 className="simulator-title">⚔️ ダメージシミュレーション</h3>
      
      {/* 敵設定 */}
      <div className="enemy-settings">
        <h4>敵設定</h4>
        <div className="settings-grid">
          <div className="setting-item">
            <label>レベル:</label>
            <input 
              type="number" 
              value={enemySettings.level}
              onChange={(e) => setEnemySettings({...enemySettings, level: parseInt(e.target.value)})}
              min="1"
              max="100"
            />
          </div>
          <div className="setting-item">
            <label>防御力:</label>
            <input 
              type="number" 
              value={enemySettings.def}
              onChange={(e) => setEnemySettings({...enemySettings, def: parseInt(e.target.value)})}
              min="0"
              max="5000"
            />
          </div>
          <div className="setting-item">
            <label>耐性(%):</label>
            <input 
              type="number" 
              value={enemySettings.resistance}
              onChange={(e) => setEnemySettings({...enemySettings, resistance: parseInt(e.target.value)})}
              min="-100"
              max="90"
            />
          </div>
          <div className="setting-item">
            <label>最大HP:</label>
            <input 
              type="number" 
              value={enemySettings.maxHp}
              onChange={(e) => setEnemySettings({...enemySettings, maxHp: parseInt(e.target.value)})}
              min="1000"
              max="10000000"
            />
          </div>
        </div>
      </div>

      {/* ダメージ結果 */}
      <div className="damage-results">
        <h4>ダメージ計算結果</h4>
        <div className="results-grid">
          {simulationResults.damages.map((result, index) => (
            <div key={index} className="damage-card">
              <div className="damage-header">
                <span className="skill-name">{result.skill}</span>
                <span 
                  className="damage-type" 
                  style={{ backgroundColor: getDamageTypeColor(result.type) }}
                >
                  {result.type === 'aoe' ? '全体' : 
                   result.type === 'single' ? '単体' :
                   result.type === 'super_break' ? '超撃破' : ''}
                </span>
              </div>
              
              <div className="damage-value">
                {formatDamage(result.damage)}
              </div>
              
              {result.critInfo && (
                <div className="crit-info">
                  <span>会心率: {result.critInfo.critChance.toFixed(1)}%</span>
                  <span>最大: {formatDamage(result.critInfo.max)}</span>
                </div>
              )}
              
              {result.note && (
                <div className="damage-note">{result.note}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 総ダメージ */}
      <div className="total-damage">
        <h4>ローテーション総ダメージ（概算）</h4>
        <div className="total-value">
          {formatDamage(
            simulationResults.damages.reduce((sum, d) => {
              // 超撃破や複数回攻撃を考慮
              let multiplier = 1;
              if (d.note && d.note.includes('最大4回')) multiplier = 4;
              return sum + d.damage * multiplier;
            }, 0)
          )}
        </div>
      </div>
    </div>
  );
};

export default DamageSimulator;