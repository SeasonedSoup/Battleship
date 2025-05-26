import {Player} from "./Player.js"


export function GameController(playerOne = new Player(true , "Real"), playerTwo = new Player(false, "Computer")) {
    const firstBoard = playerOne.gameboard;
    const secondBoard = playerTwo.gameboard;

    let activePlayer = playerOne

    const togglePlayerTurns = () => {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
    }

    let rounds = 0
    const roundCounter = () => {
        rounds++;
        return rounds;
    }
    return {
        togglePlayerTurns,
        roundCounter,
        get activePlayer() {
            return activePlayer; 
        },
    }
}