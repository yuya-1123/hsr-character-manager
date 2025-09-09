import React, { useState } from 'react';
import MainMenu from './components/MainMenu';
import CharacterLibrary from './components/CharacterLibrary';
import BattleSimulator from './components/BattleSimulator';
import './App.css';

function App() {
  const [activeMenu, setActiveMenu] = useState('character-library');

  const renderMainContent = () => {
    switch (activeMenu) {
      case 'character-library':
        return <CharacterLibrary />;
      case 'battle-simulator':
        return <BattleSimulator />;
      case 'material-calculator':
      case 'achievement-guide':
      case 'other-tools':
        return (
          <div className="coming-soon">
            <h2>準備中</h2>
            <p>この機能は現在開発中です。</p>
          </div>
        );
      default:
        return <CharacterLibrary />;
    }
  };

  return (
    <div className="app-container">
      <MainMenu activeMenu={activeMenu} onMenuChange={setActiveMenu} />
      <div className="main-content">
        {renderMainContent()}
      </div>
    </div>
  );
}

export default App;