import { act, useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./GameOver";

const PLAYERS={
    X: "Player 1",
    O: "Player 2"
  }
const INITIAL_GAME_BOARD=[
  [null,null,null],
  [null,null,null],
  [null,null,null]
]
function deriveActivePlayer(gameTurns){
  let currentPlayer='X';
  if(gameTurns.length>0 && gameTurns[0].player==='X'){
    currentPlayer='O'
  }
  return currentPlayer;
}
function deriveWinner(gameBoard,playerNames){
  let winner;
  
  for(const combinations of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].col]
    const secondSquareSymbol= gameBoard[combinations[1].row][combinations[1].col]
    const thirdSquareSymbol= gameBoard[combinations[2].row][combinations[2].col]
    if(firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol===thirdSquareSymbol){
      // winner=firstSquareSymbol;
      winner=playerNames[firstSquareSymbol];
    }
  }
  return winner;
}
function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(array=>[...array])];
  for(const turn of gameTurns){
    const {square, player} = turn;
    const {row,col} = square;

    gameBoard[row][col]=player;
  }
  return gameBoard;
}
function App() {
  const [gameTurns,setGameTurns]=useState([]);
  const [playerNames,setPlayerNames]=useState(PLAYERS)
  // const [activePlayer,setActivePlayer]=useState('X');
  const activePlayer = deriveActivePlayer(gameTurns);
  // console.log(activePlayer)

  const gameBoard = deriveGameBoard(gameTurns);
  const winner=deriveWinner(gameBoard,playerNames);
  const hasDraw = gameTurns.length===9 && !winner;

  function handleSelectSquare(rowIndex,colIndex){
    // setActivePlayer((curActivePlayer)=>curActivePlayer==='X' ? 'O' : 'X');
    setGameTurns(prevTurns=>{
      const currentPlayer=deriveActivePlayer(prevTurns)
      const updatedTurns=[
        { square: {row:rowIndex, col:colIndex }, 
        player: currentPlayer},...prevTurns];
      // console.log(updatedTurns)
      return updatedTurns;
    })
  }
  function handleRestart(){
    setGameTurns([]);
  }
  function handleNameChange(symbol, newName) {
  setPlayerNames((prev) => ({ ...prev, [symbol]: newName }));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={playerNames.X} symbol="X" isActive={activePlayer==='X'}
          onNameChange={(newName)=>
            handleNameChange('X',newName)
          }
          />
          <Player name={playerNames.O} symbol={"O"} isActive={activePlayer==='O'}
          onNameChange={(newName)=>
            handleNameChange('O',newName)
          }
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} 
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
