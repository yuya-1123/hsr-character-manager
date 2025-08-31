import React from 'react';
import './CSS/CharacterSelector.css';

const CharacterSelector = ({ characters, selectedCharacter, onSelect }) => {
  return (
    <div className="character-selector">
      {Object.values(characters).map(character => (
        <div 
          key={character.id}
          className={`character-card ${character.id} ${selectedCharacter === character.id ? 'active' : ''}`}
          onClick={() => onSelect(character.id)}
        >
          <div className="character-name">{character.name}</div>
          <div className="character-type">{character.type}</div>
          <div className="character-element">
            {character.element} • {character.path} • ★{character.rarity}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharacterSelector;