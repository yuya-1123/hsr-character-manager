import React, { useState } from 'react';
import RelicEquipment from './RelicEquipment';
import './CSS/EquipmentDisplay.css';

const EquipmentDisplay = ({ character }) => {
  const [activeTab, setActiveTab] = useState('recommended'); // 'recommended' or 'custom'
  const [customEquipment, setCustomEquipment] = useState(null);

  const renderEquipmentItem = (category, equipment) => {
    // オブジェクト型で推奨装備がある場合
    if (typeof equipment === 'object' && equipment.recommended) {
      return (
        <>
          <div className="equipment-item recommended">
            <strong>推奨: </strong>{equipment.recommended}
            {equipment.effect && (
              <div className="equipment-effect">
                効果: {equipment.effect}
              </div>
            )}
          </div>
          {equipment.alternatives && equipment.alternatives.map((alt, index) => (
            <div key={index} className="equipment-item alternative">
              代替案: {alt}
            </div>
          ))}
        </>
      );
    }
    
    // オブジェクト型でモチーフ光円錐がある場合
    if (typeof equipment === 'object' && equipment.signature) {
      return (
        <>
          <div className="equipment-item recommended">
            <strong>モチーフ: </strong>{equipment.signature}
          </div>
          {equipment.alternatives && equipment.alternatives.map((alt, index) => (
            <div key={index} className="equipment-item alternative">
              代替案: {alt}
            </div>
          ))}
        </>
      );
    }
    
    // その他のオブジェクト型（メインステータスなど）
    if (typeof equipment === 'object') {
      return Object.entries(equipment).map(([key, value]) => (
        <div key={key} className="equipment-item">
          <strong>{key}:</strong> {value}
        </div>
      ));
    }
    
    // 文字列の場合
    return (
      <div className="equipment-item">
        {equipment}
      </div>
    );
  };

  const handleEquipmentChange = (equipment) => {
    setCustomEquipment(equipment);
    // ここで装備変更によるステータス計算を行う（将来的に実装）
    console.log('装備変更:', equipment);
  };

  return (
    <div className="equipment-display-container">
      {/* タブ切り替え */}
      <div className="equipment-display-tabs">
        <button 
          className={`equipment-display-tab ${activeTab === 'recommended' ? 'active' : ''}`}
          onClick={() => setActiveTab('recommended')}
        >
          推奨装備
        </button>
        <button 
          className={`equipment-display-tab ${activeTab === 'custom' ? 'active' : ''}`}
          onClick={() => setActiveTab('custom')}
        >
          カスタム装備
        </button>
      </div>

      {/* 推奨装備タブ */}
      {activeTab === 'recommended' && character.equipment && (
        <div className="recommended-equipment-section">
          {/* 装備セクション */}
          {Object.entries(character.equipment).map(([category, equipment]) => (
            <div key={category} className="equipment-section">
              <div className="equipment-category">
                <h4>
                  📦 {category}
                </h4>
                {renderEquipmentItem(category, equipment)}
              </div>
            </div>
          ))}
          
          {/* 特殊システム */}
          {character.specialMechanics && (
            <div className="special-mechanics">
              <h4 className="special-title">⚡ 特殊システム</h4>
              {Object.entries(character.specialMechanics).map(([key, mechanic]) => (
                <div key={key} className="mechanic-item">
                  <div className="mechanic-name">{mechanic.name || key}</div>
                  {mechanic.description && (
                    <div className="mechanic-description">{mechanic.description}</div>
                  )}
                  {mechanic.effects && (
                    <div className="mechanic-effects">
                      {Object.entries(mechanic.effects).map(([effectKey, effectValue]) => (
                        <span key={effectKey} className="effect-tag">
                          {effectKey}: {effectValue}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* カスタム装備タブ */}
      {activeTab === 'custom' && (
        <div className="custom-equipment-section">
          <RelicEquipment 
            character={character}
            onEquipmentChange={handleEquipmentChange}
          />
        </div>
      )}
    </div>
  );
};

export default EquipmentDisplay;