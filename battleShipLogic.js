import {Player} from "./Player.js"

export function GameController(playerOne = new Player(true , "Real"), playerTwo = new Player(false, "Computer")) {
    //variables
    let attackingPlayer = playerOne;
    let receivingPlayer = playerTwo;
  
    let gameOverState = false;

    const getAttackingPlayer = () => attackingPlayer;
    const getReceivingPlayer = () => receivingPlayer

    const togglePlayerTurns = () => {
        if(!gameOverState) {
            let tmp = attackingPlayer
            attackingPlayer = receivingPlayer;
            receivingPlayer = tmp;
        }
    }

    let rounds = 0;

    const roundCounter = () => {
        rounds++;
        return rounds;
    }

    const playRoundAi = () => {
        if (gameOverState) {
            return;
        }

        const enemyBoard = receivingPlayer.gameboard
        const attacker = getAttackingPlayer();

        const resultHit = attacker.aiMove(enemyBoard);
    
        if(!resultHit) {
            togglePlayerTurns();
        } else {
            if (enemyBoard.areAllShipsSunk()) {
                gameOverState = true;               
            }
            playRoundAi();
        }
    }

    const playRound = (coords) => {
        if (gameOverState) {
            console.log('The Game Has Ended')
            return;
        }

        const enemyBoard = receivingPlayer.gameboard
        const attacker = getAttackingPlayer();
       
        const resultHit = attacker.makeMove(coords, enemyBoard);
        if (resultHit === undefined) return;
        
        if (!resultHit) {
            togglePlayerTurns();
            playRoundAi();
            
        } else {
            if (enemyBoard.areAllShipsSunk()) {
                gameOverState = true;               
            }
        }
    }

    const getWinner = () => {
        const attacker = getAttackingPlayer();

        if (getReceivingPlayer().gameboard.areAllShipsSunk()) {
            gameOverState = true
            return attacker.name
        } else {
            return '';
        }
    }

    return {
        getAttackingPlayer,
        getReceivingPlayer,
        togglePlayerTurns,
        roundCounter,
        playRound,
        getWinner,
        gameOverState,
        playerOne,
        playerTwo
    }
}

