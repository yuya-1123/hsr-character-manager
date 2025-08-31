import React, { useState } from 'react';
import { characterData } from './data/characters';
import CharacterSelector from './components/CharacterSelector';
import StatsDisplay from './components/StatsDisplay';
import EquipmentDisplay from './components/EquipmentDisplay';
import TeamComposition from './components/TeamComposition';
import './App.css';

function App() {
  const [selectedCharacter, setSelectedCharacter] = useState('firefly');
  const [activeTab, setActiveTab] = useState('stats');

  const character = characterData[selectedCharacter];

  const renderContent = () => {
    switch (activeTab) {
      case 'stats':
        return <StatsDisplay character={character} />;
      case 'equipment':
        return <EquipmentDisplay character={character} />;
      case 'team':
        return <TeamComposition character={character} />;
      default:
        return <StatsDisplay character={character} />;
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>崩壊スターレイル</h1>
        <h2>キャラクター管理システム</h2>
      </div>

      <CharacterSelector
        characters={characterData}
        selectedCharacter={selectedCharacter}
        onSelect={setSelectedCharacter}
      />

      {/* タブ */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          ステータス
        </button>
        <button 
          className={`tab ${activeTab === 'equipment' ? 'active' : ''}`}
          onClick={() => setActiveTab('equipment')}
        >
          装備・遺物
        </button>
        <button 
          className={`tab ${activeTab === 'team' ? 'active' : ''}`}
          onClick={() => setActiveTab('team')}
        >
          編成・運用
        </button>
      </div>

      {/* メインコンテンツ */}
      <div className="content-card">
        <div className="character-info">
          <div className="character-avatar">
            {character.name}
          </div>
          <div className="character-details">
            <h3>{character.name}</h3>
            <p>タイプ: {character.type}</p>
            <p>属性: {character.element} | 運命: {character.path} | ★{character.rarity}</p>
            <p>声優: {character.voiceActor}</p>
          </div>
        </div>
        
        {renderContent()}
      </div>
    </div>
  );
}

export default App;