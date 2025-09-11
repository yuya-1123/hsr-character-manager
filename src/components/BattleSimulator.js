import React, { useState } from 'react';
import { characterData } from '../data/characters';
import './CSS/BattleSimulator.css';

const BattleSimulator = () => {
  const [simulationPhase, setSimulationPhase] = useState('team-setup'); // team-setup, enemy-setup, simulation, results
  const [selectedTeam, setSelectedTeam] = useState([null, null, null, null]);
  const [showCharacterPicker, setShowCharacterPicker] = useState(false);
  const [pickingSlot, setPickingSlot] = useState(null);

  const renderContent = () => {
    switch (simulationPhase) {
      case 'team-setup':
        return (
          <div className="setup-content">
            <h3>チーム編成</h3>
            <div className="team-slots">
              {selectedTeam.map((charId, index) => {
                const character = charId ? characterData[charId] : null;
                return (
                  <div 
                    key={index}
                    className={`character-slot ${character ? 'filled' : 'empty'}`}
                    onClick={() => {
                      setPickingSlot(index);
                      setShowCharacterPicker(true);
                    }}
                  >
                    <div className="slot-number">{index + 1}</div>
                    {character ? (
                      <>
                        <div className="slot-character-name">{character.name}</div>
                        <div className="slot-character-info">
                          <span className="element">{character.element}</span>
                          <span className="path">{character.path}</span>
                        </div>
                        <button 
                          className="remove-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            const newTeam = [...selectedTeam];
                            newTeam[index] = null;
                            setSelectedTeam(newTeam);
                          }}
                        >
                          ×
                        </button>
                      </>
                    ) : (
                      <div className="slot-label">キャラクター選択</div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* キャラクター選択モーダル */}
            {showCharacterPicker && (
              <div className="modal-overlay" onClick={() => setShowCharacterPicker(false)}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                  <h3>キャラクター選択</h3>
                  <div className="character-grid">
                    {Object.entries(characterData).map(([id, char]) => {
                      const isInTeam = selectedTeam.includes(id);
                      return (
                        <div
                          key={id}
                          className={`character-card ${isInTeam ? 'disabled' : ''}`}
                          onClick={() => {
                            if (!isInTeam) {
                              const newTeam = [...selectedTeam];
                              newTeam[pickingSlot] = id;
                              setSelectedTeam(newTeam);
                              setShowCharacterPicker(false);
                            }
                          }}
                        >
                          <div className="character-card-name">{char.name}</div>
                          <div className="character-card-info">
                            <span>{char.element}</span>
                            <span>{char.path}</span>
                          </div>
                          {isInTeam && <div className="in-team-label">編成済み</div>}
                        </div>
                      );
                    })}
                  </div>
                  <button 
                    className="close-btn"
                    onClick={() => setShowCharacterPicker(false)}
                  >
                    閉じる
                  </button>
                </div>
              </div>
            )}
            
            <p className="phase-description">
              戦闘に参加するキャラクターを4体選択してください。
              各キャラクターの装備や星魂も設定できます。
            </p>
            
            {/* チーム構成情報 */}
            {selectedTeam.filter(Boolean).length > 0 && (
              <div className="team-summary">
                <h4>チーム構成</h4>
                <div className="team-stats">
                  <div>選択済み: {selectedTeam.filter(Boolean).length}/4</div>
                  {selectedTeam.filter(Boolean).length === 4 && (
                    <button 
                      className="proceed-btn"
                      onClick={() => setSimulationPhase('enemy-setup')}
                    >
                      次へ：敵設定
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      case 'enemy-setup':
        return (
          <div className="setup-content">
            <h3>敵設定</h3>
            <p className="phase-description">敵の設定（準備中）</p>
          </div>
        );
      case 'simulation':
        return (
          <div className="setup-content">
            <h3>シミュレーション実行</h3>
            <p className="phase-description">戦闘シミュレーション（準備中）</p>
          </div>
        );
      case 'results':
        return (
          <div className="setup-content">
            <h3>結果表示</h3>
            <p className="phase-description">シミュレーション結果（準備中）</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="battle-simulator">
      <div className="simulator-header">
        <h1>戦闘シミュレーション</h1>
        <p>チーム編成と戦闘計算システム</p>
      </div>

      {/* シミュレーション段階のナビゲーション */}
      <div className="phase-navigation">
        <button
          className={`phase-button ${simulationPhase === 'team-setup' ? 'active' : ''}`}
          onClick={() => setSimulationPhase('team-setup')}
        >
          <span className="phase-number">1</span>
          <span className="phase-label">チーム編成</span>
        </button>
        <button
          className={`phase-button ${simulationPhase === 'enemy-setup' ? 'active' : ''}`}
          onClick={() => setSimulationPhase('enemy-setup')}
          disabled
        >
          <span className="phase-number">2</span>
          <span className="phase-label">敵設定</span>
        </button>
        <button
          className={`phase-button ${simulationPhase === 'simulation' ? 'active' : ''}`}
          onClick={() => setSimulationPhase('simulation')}
          disabled
        >
          <span className="phase-number">3</span>
          <span className="phase-label">実行</span>
        </button>
        <button
          className={`phase-button ${simulationPhase === 'results' ? 'active' : ''}`}
          onClick={() => setSimulationPhase('results')}
          disabled
        >
          <span className="phase-number">4</span>
          <span className="phase-label">結果</span>
        </button>
      </div>

      {/* メインコンテンツ */}
      <div className="simulator-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default BattleSimulator;