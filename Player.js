import {GameBoard} from "./Gameboard.js"

export class Player {
    constructor(player = true, name) {
        this.player = player;
        this.gameboard = new GameBoard();
        this.name = name;
    }

    placeMultipleRandomShips() {
        let shipLength = 5
        for (let i = 1; i < 5; i ++) {
            try {
                const coords = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
                this.gameboard.placeShip(shipLength, coords, Math.random() < 0.5 ? 'x' : 'y');
                shipLength--;
            } catch (e) {
                i--
            }
        }
        return this.gameboard
    }
    
    makeMove(coords, bruh)  {
        return this.gameboard.receiveAttack(coords)
    }

    isComputer() {
        return !this.player;
    }
}