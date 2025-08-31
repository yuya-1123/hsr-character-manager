import React from 'react';
import './CSS/StatsDisplay.css';

const StatsDisplay = ({ character }) => {
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

  return (
    <div>
      {/* ステータス表示 */}
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
      
      {/* 運用方法 */}
      <div className="playstyle-section">
        <h4 className="playstyle-title">🎯 運用方法</h4>
        <div className="playstyle-content">
          <h5>基本ローテーション</h5>
          <ol className="rotation-steps">
            {character.playstyle.rotation.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
          <h5>重要なコツ</h5>
          <ul className="tips-list">
            {character.playstyle.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StatsDisplay;