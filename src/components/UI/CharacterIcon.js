import React from 'react';
import './CharacterIcon.css';

const CharacterIcon = ({ character, size = 'medium', showElement = true, onClick }) => {
  // サイズ設定
  const sizeClasses = {
    small: 'icon-small',
    medium: 'icon-medium',
    large: 'icon-large'
  };

  // 属性の色設定
  const elementColors = {
    '炎': '#ff6b6b',
    '氷': '#74c0fc',
    '風': '#51cf66',
    '雷': '#a855f7',
    '物理': '#e9ecef',
    '量子': '#7950f2',
    '虚数': '#ffd43b'
  };

  // 運命の道のシンボル
  const pathSymbols = {
    '壊滅': '⚔️',
    '巡狩': '🏹',
    '知恵': '📖',
    '調和': '🎵',
    '虚無': '🌀',
    '存護': '🛡️',
    '豊穣': '🌿',
    '記憶': '🔮'
  };

  // レアリティの背景色
  const rarityGradients = {
    5: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', // 金色
    4: 'linear-gradient(135deg, #9333ea 0%, #c084fc 100%)'  // 紫色
  };

  const elementColor = elementColors[character.element] || '#666';
  const pathSymbol = pathSymbols[character.path] || '❓';
  const rarityGradient = rarityGradients[character.rarity] || 'linear-gradient(135deg, #666 0%, #999 100%)';

  // キャラクター名の最初の2文字を取得（フォールバック表示用）
  const getInitials = (name) => {
    if (!name) return '？';
    // 日本語名の場合は最初の2文字
    if (name.match(/[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/)) {
      return name.slice(0, 2);
    }
    // 英語名の場合は頭文字
    return name.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase();
  };

  return (
    <div 
      className={`character-icon ${sizeClasses[size]} ${onClick ? 'clickable' : ''}`}
      onClick={onClick}
      style={{ background: rarityGradient }}
    >
      {/* アイコン画像がある場合 */}
      {character.icon ? (
        <img 
          src={character.icon} 
          alt={character.name}
          className="character-icon-image"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
      ) : null}
      
      {/* フォールバック表示（画像がない場合） */}
      <div 
        className="character-icon-fallback" 
        style={{ display: character.icon ? 'none' : 'flex' }}
      >
        <span className="character-initials">{getInitials(character.name)}</span>
      </div>

      {/* 属性アイコン */}
      {showElement && (
        <div 
          className="character-element" 
          style={{ backgroundColor: elementColor }}
          title={character.element}
        >
          <span className="element-text">{character.element[0]}</span>
        </div>
      )}

      {/* 運命の道アイコン */}
      <div className="character-path" title={character.path}>
        <span className="path-symbol">{pathSymbol}</span>
      </div>

      {/* レアリティ表示 */}
      <div className="character-rarity">
        {'★'.repeat(character.rarity)}
      </div>

      {/* キャラクター名（ホバー時表示） */}
      <div className="character-name-tooltip">
        {character.name}
      </div>
    </div>
  );
};

export default CharacterIcon;