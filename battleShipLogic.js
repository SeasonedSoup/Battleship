import {Player} from "./Player.js"

export function GameController(playerOne = new Player(true , "Real"), playerTwo = new Player(false, "Computer")) {
    //variables
    let firstPlayer = playerOne;
    let secondPlayer = playerTwo;

    let attackingPlayer = playerOne;
    let receivingPlayer = playerTwo;

    let gameOverState = false;

    const setVsPlayers = (newPlayerOne, newPlayerTwo) => {
        attackingPlayer =  newPlayerOne
        receivingPlayer = newPlayerTwo      
    }

    const getFirstPlayer = () => firstPlayer 
    const getSecondPlayer = () => secondPlayer

    const getAttackingPlayer = () => attackingPlayer;
    const getReceivingPlayer = () => receivingPlayer;

    const getGameOverState = () => gameOverState;
   
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

        const enemyBoard = getReceivingPlayer().gameboard
        const attacker = getAttackingPlayer();
       
        const resultHit = attacker.makeMove(coords, enemyBoard);
        //result is not valid hit from ai
        if (resultHit === undefined) return;
        
        if (!resultHit) {
            togglePlayerTurns();
            if(playerTwo.isComputer()) {
                playRoundAi();
            }
        } else {
            if (enemyBoard.areAllShipsSunk()) {
                gameOverState = true;               
            }
        }
        return resultHit;
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
    //resets the board and reappends with new ships for vs ai
    const randomizeShipsBoth = () => {
        playerOne.resetPlayerBoard();
        playerTwo.resetPlayerBoard();

        playerOne.placeMultipleRandomShips();
        playerTwo.placeMultipleRandomShips();
    }

    const randomizePlayerShips = (player) => {
        player.resetPlayerBoard();
        player.placeMultipleRandomShips();
    }

    return {
        setVsPlayers,
        getFirstPlayer,
        getSecondPlayer,
        getAttackingPlayer,
        getReceivingPlayer,
        getGameOverState,
        togglePlayerTurns,
        roundCounter,
        playRound,
        getWinner,
        randomizeShipsBoth,
        randomizePlayerShips,
    }
}

