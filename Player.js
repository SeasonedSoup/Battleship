import {GameBoard} from "./Gameboard.js"

export class Player {
    constructor(player = true, name) {
        this.player = player;
        this.gameboard = new GameBoard();
        this.name = name;
    }

    placeMultipleRandomShips() {
        for (let i = 1; i < 5; i ++) {
            try {

            } catch (e) {
                i--
            }
        }
    }
    
    makeMove(square, enemyBoard)  {
        return this.gameboard.receiveAttack(square, enemyBoard)
    }

    isComputer() {
        return !this.player;
    }
}