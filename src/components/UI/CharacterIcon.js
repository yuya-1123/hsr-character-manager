import React from 'react';
import './CharacterIcon.css';

const CharacterIcon = ({ 
  character, 
  size = 'medium', 
  showRarity = true, 
  onClick = null,
  isSelected = false 
}) => {
  const handleClick = () => {
    if (onClick) onClick(character.id);
  };

  const getElementColor = (element) => {
    const colors = {
      '炎': '#ff6b6b',
      '氷': '#74c0fc', 
      '雷': '#845ef7',
      '風': '#51cf66',
      '量子': '#7c3aed',
      '虚数': '#ffd43b',
      '物理': '#adb5bd'
    };
    return colors[element] || '#fff';
  };

  const getRarityStars = (rarity) => {
    return '★'.repeat(rarity);
  };

  return (
    <div 
      className={`character-icon ${size} ${isSelected ? 'selected' : ''} ${onClick ? 'clickable' : ''}`}
      onClick={handleClick}
      style={{ '--element-color': getElementColor(character.element) }}
    >
      {/* アイコン画像 */}
      <div className="icon-image">
        {character.icon ? (
          <img 
            src={character.icon} 
            alt={character.name}
            onError={(e) => {
              // 画像読み込み失敗時のフォールバック
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        {/* フォールバック（文字アイコン） */}
        <div className="fallback-icon">
          {character.name.charAt(0)}
        </div>
      </div>

      {/* 属性インジケーター */}
      <div className="element-indicator">
        <span className="element-symbol">{character.element.charAt(0)}</span>
      </div>

      {/* レアリティ表示 */}
      {showRarity && (
        <div className="rarity-display">
          <span className="stars">{getRarityStars(character.rarity)}</span>
        </div>
      )}

      {/* キャラクター名 */}
      <div className="character-name">
        {character.name}
      </div>
    </div>
  );
};

export default CharacterIcon;