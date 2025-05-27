import {Player} from "./Player.js"


export function GameController(playerOne = new Player(true , "Real"), playerTwo = new Player(false, "Computer")) {
    //variables
    let attackingPlayer = playerOne;
    let receivingPlayer = playerTwo;
  
    let gameOverState = false;

    const getAttackingPlayer = () => attackingPlayer;
    const getReceivingPlayer = () => receivingPlayer

    const togglePlayerTurns = () => {
        let tmp = attackingPlayer
        attackingPlayer = receivingPlayer;
        receivingPlayer = tmp;
    }

    let rounds = 0;

    const roundCounter = () => {
        rounds++;
        return rounds;
    }

    const playRound = (coords) => {
        if (gameOverState) {
            return;
        }

        const enemyBoard = receivingPlayer.gameboard
        const attacker = getAttackingPlayer();

        attacker.makeMove(coords, enemyBoard);

    }




    return {
        getAttackingPlayer,
        getReceivingPlayer,
        togglePlayerTurns,
        roundCounter,
    }
}

