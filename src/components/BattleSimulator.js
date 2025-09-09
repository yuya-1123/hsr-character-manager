import React, { useState } from 'react';
import './CSS/BattleSimulator.css';

const BattleSimulator = () => {
  const [simulationPhase, setSimulationPhase] = useState('team-setup'); // team-setup, enemy-setup, simulation, results

  const renderContent = () => {
    switch (simulationPhase) {
      case 'team-setup':
        return (
          <div className="setup-content">
            <h3>チーム編成</h3>
            <div className="team-slots">
              <div className="character-slot empty">
                <div className="slot-number">1</div>
                <div className="slot-label">キャラクター選択</div>
              </div>
              <div className="character-slot empty">
                <div className="slot-number">2</div>
                <div className="slot-label">キャラクター選択</div>
              </div>
              <div className="character-slot empty">
                <div className="slot-number">3</div>
                <div className="slot-label">キャラクター選択</div>
              </div>
              <div className="character-slot empty">
                <div className="slot-number">4</div>
                <div className="slot-label">キャラクター選択</div>
              </div>
            </div>
            <p className="phase-description">
              戦闘に参加するキャラクターを4体選択してください。
              各キャラクターの装備や星魂も設定できます。
            </p>
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