import React from 'react';
import './CSS/MainMenu.css';

const MainMenu = ({ activeMenu, onMenuChange }) => {
  const menuItems = [
    {
      id: 'character-library',
      icon: '📖',
      label: 'キャラクター図鑑',
      description: 'キャラクター情報閲覧'
    },
    {
      id: 'battle-simulator',
      icon: '⚔️',
      label: '戦闘シミュレーション',
      description: 'チーム編成・戦闘計算'
    },
    {
      id: 'material-calculator',
      icon: '📊',
      label: '素材計算',
      description: '育成素材計算（準備中）',
      disabled: true
    },
    {
      id: 'achievement-guide',
      icon: '🏆',
      label: 'アチーブメント攻略',
      description: '攻略ガイド（準備中）',
      disabled: true
    },
    {
      id: 'other-tools',
      icon: '🔧',
      label: 'その他のツール',
      description: '便利ツール（準備中）',
      disabled: true
    }
  ];

  return (
    <div className="main-menu">
      <div className="menu-header">
        <h2>HSR Manager</h2>
        <div className="menu-subtitle">崩壊スターレイル</div>
      </div>
      
      <nav className="menu-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`menu-item ${activeMenu === item.id ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
            onClick={() => !item.disabled && onMenuChange(item.id)}
            disabled={item.disabled}
          >
            <div className="menu-icon">{item.icon}</div>
            <div className="menu-content">
              <div className="menu-label">{item.label}</div>
              <div className="menu-description">{item.description}</div>
            </div>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default MainMenu;