import React, { useState } from 'react'

const GameBoard = ({onSelectSquare,board}) => {
  
  // const [gameBoard,setGameBorad]=useState(initialGameBoard);
  // function handleSelectSquare(rowIndex,colIndex){
  //   setGameBorad((prevGameBoard)=>{
  //     const updatedGameBoard=[...prevGameBoard.map(innerArray=>[...innerArray])];
  //     updatedGameBoard[rowIndex][colIndex]=activePlayerSymbol;
  //     return updatedGameBoard;
  //   })
  //   onSelectSquare();
  // }

  return (
    <ol id='game-board'>
      {board.map((row,indexRow)=>
        (<li key={indexRow}>
          <ol>
            {row.map((playerSymbol,indexCol)=>(
              <li key={indexCol}>
                <button onClick={()=>onSelectSquare(indexRow,indexCol)}
                disabled={playerSymbol !==null}  
                >{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>))}
    </ol>
  )
}

export default GameBoard  