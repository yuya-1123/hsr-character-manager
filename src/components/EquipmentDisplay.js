import React from 'react';
import './CSS/EquipmentDisplay.css';

const EquipmentDisplay = ({ character }) => {
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

  return (
    <div>
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
      
      {/* 特殊システム（キャストリスなど） */}
      {character.specialMechanics && (
        <div className="special-mechanics">
          <h4 className="special-title">⚡ 特殊システム</h4>
          {Object.entries(character.specialMechanics).map(([key, value]) => (
            <div key={key} className="equipment-item">
              <strong>{key}:</strong> {value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EquipmentDisplay;