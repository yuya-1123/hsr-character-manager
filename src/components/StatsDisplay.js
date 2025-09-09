import React, { useState } from 'react';
import './CSS/StatsDisplay.css';

const StatsDisplay = ({ character }) => {
  const [activeTab, setActiveTab] = useState('recommended'); // 'base' or 'recommended'

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high':
        return '最重要';
      case 'medium':
        return '重要';
      case 'low':
        return '低優先';
      default:
        return '';
    }
  };

  const getStatDisplayName = (statKey) => {
    const statNames = {
      hp: 'HP',
      atk: '攻撃力',
      def: '防御力',
      speed: '速度',
      critRate: '会心率',
      critDmg: '会心ダメージ',
      breakEffect: '撃破特効',
      outgoingHealing: '治癒量',
      fireDmg: '炎属性ダメージ',
      iceDmg: '氷属性ダメージ',
      windDmg: '風属性ダメージ',
      lightningDmg: '雷属性ダメージ',
      physicalDmg: '物理ダメージ',
      quantumDmg: '量子ダメージ',
      imaginaryDmg: '虚数ダメージ',
      energyRegenRate: 'EP回復効率'
    };
    return statNames[statKey] || statKey;
  };

  const formatTargetValue = (target) => {
    if (target === 'ignore') return '不要';
    if (target === 'any') return '任意';
    if (typeof target === 'number') {
      // 会心率、会心ダメージ、各種ダメージボーナスはパーセント表示
      if (target < 100 && ['critRate', 'critDmg', 'fireDmg', 'iceDmg', 'windDmg', 
          'lightningDmg', 'physicalDmg', 'quantumDmg', 'imaginaryDmg', 'energyRegenRate']
          .some(stat => stat === target)) {
        return `${target}%`;
      }
      return target.toString();
    }
    return target;
  };

  // 基本ステータスの存在確認
  const hasBaseStats = character.baseStats && character.baseStats.level80;
  const baseStats = hasBaseStats ? character.baseStats.level80 : null;

  // 推奨ステータスの存在確認（新形式）
  const hasRecommendedStats = character.recommendedStats;
  
  // 旧形式のstatsプロパティの存在確認（後方互換性）
  const hasOldStats = character.stats && !hasRecommendedStats;

  return (
    <div className="stats-display-container">
      {/* タブ切り替え（基本ステータスがある場合のみ表示） */}
      {hasBaseStats && (
        <div className="stats-tabs">
          <button 
            className={`stats-tab ${activeTab === 'base' ? 'active' : ''}`}
            onClick={() => setActiveTab('base')}
          >
            基本ステータス
          </button>
          <button 
            className={`stats-tab ${activeTab === 'recommended' ? 'active' : ''}`}
            onClick={() => setActiveTab('recommended')}
          >
            推奨ステータス
          </button>
        </div>
      )}

      {/* 基本ステータス表示 */}
      {activeTab === 'base' && hasBaseStats && (
        <div className="base-stats-section">
          <div className="base-stats-info">
            <p className="base-stats-note">
              ※ レベル80昇格済み、装備・光円錐なしの素のステータス
            </p>
          </div>
          <div className="base-stats-grid">
            <div className="base-stat-item">
              <span className="base-stat-label">HP</span>
              <span className="base-stat-value">{baseStats.hp}</span>
            </div>
            <div className="base-stat-item">
              <span className="base-stat-label">攻撃力</span>
              <span className="base-stat-value">{baseStats.atk}</span>
            </div>
            <div className="base-stat-item">
              <span className="base-stat-label">防御力</span>
              <span className="base-stat-value">{baseStats.def}</span>
            </div>
            <div className="base-stat-item">
              <span className="base-stat-label">速度</span>
              <span className="base-stat-value">{baseStats.speed}</span>
            </div>
          </div>
        </div>
      )}

      {/* 推奨ステータス表示（新形式） */}
      {activeTab === 'recommended' && hasRecommendedStats && (
        <div className="recommended-stats-section">
          <div className="stats-info">
            <p className="stats-note">
              遺物厳選で優先すべきステータスと目標値
            </p>
          </div>
          <div className="stats-grid">
            {Object.entries(character.recommendedStats).map(([key, stat]) => (
              <div key={key} className={`stat-item priority-${stat.priority}`}>
                <div className="stat-header">
                  <div className="stat-label">{getStatDisplayName(key)}</div>
                  <span className={`priority-badge ${stat.priority}`}>
                    {getPriorityText(stat.priority)}
                  </span>
                </div>
                <div className="stat-value">
                  目標: {formatTargetValue(stat.target)}
                </div>
                <div className="stat-note">{stat.note}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 旧形式のステータス表示（後方互換性） */}
      {hasOldStats && !hasRecommendedStats && (
        <div className="stats-grid">
          {Object.entries(character.stats).map(([key, stat]) => (
            <div key={key} className={`stat-item priority-${stat.priority}`}>
              <div className="stat-header">
                <div className="stat-label">{key}</div>
                <span className={`priority-badge ${stat.priority}`}>
                  {getPriorityText(stat.priority)}
                </span>
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-note">{stat.note}</div>
            </div>
          ))}
        </div>
      )}
      
      {/* 運用方法 */}
      {character.playstyle && (
        <div className="playstyle-section">
          <h4 className="playstyle-title">🎯 運用方法</h4>
          <div className="playstyle-content">
            {character.playstyle.rotation && (
              <>
                <h5>基本ローテーション</h5>
                <ol className="rotation-steps">
                  {character.playstyle.rotation.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </>
            )}
            {character.playstyle.tips && (
              <>
                <h5>重要なコツ</h5>
                <ul className="tips-list">
                  {character.playstyle.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsDisplay;