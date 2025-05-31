import {GameBoard} from "./Gameboard.js"

export class Player {
    constructor(player = true, name) {
        this.player = player;
        this.gameboard = new GameBoard();
        this.name = name;
        this.placeMultipleRandomShips();
    }
    //refactor
    placeMultipleRandomShips() {
        let shipLength = 5
        let validPlaced = 0
        const capacity = 5
        
        while (validPlaced < capacity) {
            const coords = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
            if (this.gameboard.placeShip(shipLength, coords, Math.random() < 0.5 ? 'x' : 'y')){
                shipLength--;
                validPlaced++;
            }
        }
    }
    
    makeMove(coords, opponentBoard = new GameBoard())  {
        return opponentBoard.receiveAttack(coords);
    }

    aiMove(opponentBoard) {
        while (true) {
            const coords = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
            const result = this.makeMove(coords, opponentBoard);
            
            if (result !== undefined) {
                return result
            }
        }   
    }

    getHiddenBoard() {
        return this.gameboard.board.map(row => {
            return row.map(col => {
                if (col.state === 'UD' || col.state === 'S') {
                    return {state: 'hidden'}
                } return {state: col.state}
            })
        })
    }


    isComputer() {
        return !this.player;
    }
}