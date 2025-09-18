import React, { useState } from "react";

const Player = ({name, symbol,isActive,onNameChange}) => {
  const [isEditing,setIsEditing] = useState(false);
  const [playerName,setPlayerName] = useState(name)
  function handleClick(){
    setIsEditing((editing)=>!editing);
    if(isEditing){
      onNameChange(playerName);
    }
  }
  function handleChange(event){
    setPlayerName(event.target.value)
  }
  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {isEditing ? (
        <input className="player-name" value={playerName} onChange={handleChange} required/>
        ) : (
        <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
};

export default Player;
