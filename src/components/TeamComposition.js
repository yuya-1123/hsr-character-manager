import React, { useState } from 'react';
import DamageSimulator from './DamageSimulator';
import './CSS/TeamComposition.css';

const TeamComposition = ({ character }) => {
  const [showSimulator, setShowSimulator] = useState(false);

  return (
    <div>
      {/* コア編成 */}
      <h4 className="team-section-title">🌟 コア編成（必須）</h4>
      <div className="team-composition">
        {character.team.core.map((member, index) => (
          <div key={index} className="team-member core">
            <h4>{member.name}</h4>
            <div className="team-role">{member.role}</div>
            <div className="team-note">{member.note}</div>
          </div>
        ))}
      </div>
      
      {/* サポート編成 */}
      <h4 className="team-section-title support">🔧 推奨サポート</h4>
      <div className="team-composition">
        {character.team.supports.map((member, index) => (
          <div key={index} className="team-member">
            <h4>{member.name}</h4>
            <div className="team-role">{member.role}</div>
            <div className="team-note">{member.note}</div>
          </div>
        ))}
      </div>

      {/* 運用方法セクション */}
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

      {/* シミュレーショントグル */}
      <div className="simulator-toggle">
        <button 
          className="simulator-button"
          onClick={() => setShowSimulator(!showSimulator)}
        >
          {showSimulator ? '🔽 シミュレーションを閉じる' : '⚔️ ダメージシミュレーション'}
        </button>
      </div>

      {/* ダメージシミュレーター */}
      {showSimulator && (
        <DamageSimulator character={character} />
      )}
    </div>
  );
};

export default TeamComposition;