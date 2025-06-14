import {GameBoard} from "./Gameboard.js"

export class Player {
    constructor(player = true, name) {
        this.player = player;
        this.gameboard = new GameBoard();
        this.name = name;
        this.placeMultipleRandomShips();
        //for ai smart
        this.lasthit = null
    }

    //to be refactored to maybe just a button for now but dragging implementation
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
        //if theres a coord
        if (this.lasthit) {
            const adjacencyResult = this.aiMoveSmart(this.lasthit, opponentBoard);
            if (adjacencyResult !== undefined) {
                return adjacencyResult;
            } 
            this.lasthit = null;
        }
        while (true) {
            const coords = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
            const result = this.makeMove(coords, opponentBoard);
            if (result) {
                this.lasthit = coords;
            } else if (result === false) {
                this.lasthit = null; // clear last hit on miss
            }
            if (result !== undefined) {
                return result
            }

        }   
    }

    aiMoveSmart(coords, opponentBoard) {
        console.log('this runs!')
        const adjacencies = this.getAdjacentCoords(coords, opponentBoard)

        for (const adjacency of adjacencies) {
            const result = this.makeMove(adjacency, opponentBoard)
            if (result !== undefined) {
                if (result) this.lasthit = adjacency;
                else this.lasthit = null
                return result
            }
        }
    }
    //coords
    getAdjacentCoords([x, y], opponentBoard) {
        const directions = [
            [x + 1, y],
            [x - 1, y],
            [x, y + 1],
            [x, y - 1],
        ]
        //gets the only valid adjacent coordinates for the ai to try also gets the opponentboard if its not yet attacked at that coord in a set. strarts with down up right left
        return directions.filter(([dx, dy]) => dx >= 0 && dx < 10 && dy >= 0 && dy < 10 && !opponentBoard.isAlreadyAttacked([dx, dy]) )
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
    getPlayerBoard() {
        return this.gameboard.getBoard();
    }
    resetPlayerBoard() {
        this.gameboard.loadBoard();
    }


    isComputer() {
        return !this.player;
    }
}