import React from 'react';
import CharacterIcon from './UI/CharacterIcon';
import './CSS/CharacterSelector.css';

const CharacterSelector = ({ characters, selectedCharacter, onSelect }) => {
  return (
    <div className="character-selector">
      <div className="character-grid">
        {Object.values(characters).map(character => (
          <div 
            key={character.id}
            className={`character-card ${character.id} ${selectedCharacter === character.id ? 'active' : ''}`}
            onClick={() => onSelect(character.id)}
          >
            <CharacterIcon 
              character={character} 
              size="medium"
              showElement={true}
              onClick={() => onSelect(character.id)}
            />
            <div className="character-info">
              <div className="character-name">{character.name}</div>
              <div className="character-type">{character.type}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterSelector;