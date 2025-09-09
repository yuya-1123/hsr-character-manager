import React, { useState } from 'react';
import { relicSets, ornamentSets, mainStatOptions } from '../data/relics';
import './CSS/RelicEquipment.css';

const RelicEquipment = ({ character, onEquipmentChange }) => {
  const [equipment, setEquipment] = useState({
    relicSet: null,
    ornamentSet: null,
    mainStats: {
      body: null,
      feet: null,
      sphere: null,
      rope: null
    },
    subStats: {}
  });

  const [selectedTab, setSelectedTab] = useState('sets'); // 'sets' or 'mainstats'

  const handleRelicSetChange = (setId) => {
    const newEquipment = { ...equipment, relicSet: setId };
    setEquipment(newEquipment);
    onEquipmentChange?.(newEquipment);
  };

  const handleOrnamentSetChange = (setId) => {
    const newEquipment = { ...equipment, ornamentSet: setId };
    setEquipment(newEquipment);
    onEquipmentChange?.(newEquipment);
  };

  const handleMainStatChange = (slot, statId) => {
    const newEquipment = {
      ...equipment,
      mainStats: {
        ...equipment.mainStats,
        [slot]: statId
      }
    };
    setEquipment(newEquipment);
    onEquipmentChange?.(newEquipment);
  };

  // キャラクターの推奨装備を取得
  const getRecommendedEquipment = () => {
    if (!character.equipment) return null;
    return character.equipment;
  };

  const recommended = getRecommendedEquipment();

  return (
    <div className="relic-equipment">
      <h3 className="equipment-title">🎭 遺物装備設定</h3>
      
      {/* タブ切り替え */}
      <div className="equipment-tabs">
        <button 
          className={`equipment-tab ${selectedTab === 'sets' ? 'active' : ''}`}
          onClick={() => setSelectedTab('sets')}
        >
          セット効果
        </button>
        <button 
          className={`equipment-tab ${selectedTab === 'mainstats' ? 'active' : ''}`}
          onClick={() => setSelectedTab('mainstats')}
        >
          メインステータス
        </button>
      </div>

      {/* セット効果タブ */}
      {selectedTab === 'sets' && (
        <div className="sets-section">
          {/* 遺物セット選択 */}
          <div className="relic-set-section">
            <h4>遺物セット（4セット/2セット）</h4>
            {recommended && recommended['遺物セット'] && (
              <div className="recommended-note">
                推奨: {recommended['遺物セット'].recommended}
              </div>
            )}
            <div className="relic-options">
              {Object.values(relicSets).map(set => (
                <div 
                  key={set.id}
                  className={`relic-option ${equipment.relicSet === set.id ? 'selected' : ''}`}
                  onClick={() => handleRelicSetChange(set.id)}
                >
                  <div className="relic-name">{set.name}</div>
                  <div className="relic-effect">{set.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* オーナメント選択 */}
          <div className="ornament-section">
            <h4>プラナリアオーナメント（2セット）</h4>
            {recommended && recommended['オーナメント'] && (
              <div className="recommended-note">
                推奨: {recommended['オーナメント'].recommended}
              </div>
            )}
            <div className="ornament-options">
              {Object.values(ornamentSets).map(set => (
                <div 
                  key={set.id}
                  className={`ornament-option ${equipment.ornamentSet === set.id ? 'selected' : ''}`}
                  onClick={() => handleOrnamentSetChange(set.id)}
                >
                  <div className="ornament-name">{set.name}</div>
                  <div className="ornament-effect">{set.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* メインステータスタブ */}
      {selectedTab === 'mainstats' && (
        <div className="mainstats-section">
          {recommended && recommended['メインステータス'] && (
            <div className="recommended-mainstats">
              <h4>推奨メインステータス</h4>
              <div className="recommended-list">
                <div className="stat-slot">
                  <span className="slot-name">胴体:</span>
                  <span className="slot-value">{recommended['メインステータス']['胴体']}</span>
                </div>
                <div className="stat-slot">
                  <span className="slot-name">脚部:</span>
                  <span className="slot-value">{recommended['メインステータス']['脚部']}</span>
                </div>
                <div className="stat-slot">
                  <span className="slot-name">オーブ:</span>
                  <span className="slot-value">{recommended['メインステータス']['オーブ']}</span>
                </div>
                <div className="stat-slot">
                  <span className="slot-name">縄:</span>
                  <span className="slot-value">{recommended['メインステータス']['縄']}</span>
                </div>
              </div>
            </div>
          )}

          {/* 各部位のメインステータス選択 */}
          {['body', 'feet', 'sphere', 'rope'].map(slot => (
            <div key={slot} className="mainstat-slot">
              <h5>{
                slot === 'body' ? '胴体' :
                slot === 'feet' ? '脚部' :
                slot === 'sphere' ? 'オーブ' :
                '縄'
              }</h5>
              <div className="mainstat-options">
                {mainStatOptions[slot].map(stat => (
                  <button
                    key={stat.id}
                    className={`mainstat-option ${equipment.mainStats[slot] === stat.id ? 'selected' : ''}`}
                    onClick={() => handleMainStatChange(slot, stat.id)}
                  >
                    <div className="stat-name">{stat.name}</div>
                    <div className="stat-value">+{stat.value}</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 現在の装備サマリー */}
      <div className="equipment-summary">
        <h4>現在の装備構成</h4>
        <div className="summary-content">
          {equipment.relicSet && (
            <div className="summary-item">
              遺物: {relicSets[equipment.relicSet]?.name}
            </div>
          )}
          {equipment.ornamentSet && (
            <div className="summary-item">
              オーナメント: {ornamentSets[equipment.ornamentSet]?.name}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RelicEquipment;