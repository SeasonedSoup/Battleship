import {Player} from "./Player.js"


export function GameController(playerOne = new Player(true , "Real"), playerTwo = new Player(false, "Computer")) {
    const firstBoard = playerOne.gameboard;
    const secondBoard = playerOne.gameboard;
    
    let activePlayer = playerOne;
    //let gameOverState = false;

    const togglePlayerTurns = () => {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
    }

    let rounds = 0

    const roundCounter = () => {
        rounds++;
        return rounds;
    }

    return {
        get activePlayer() {
            return activePlayer; 
        },
        togglePlayerTurns,
        roundCounter,
        makeMove,
        
    }
}