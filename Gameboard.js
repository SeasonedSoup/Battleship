import {Ship} from "./Ship.js"

export class GameBoard {
    constructor(rows = 10, cols = 10) {
        this.rows = rows
        this.cols = cols
        this.board = [];
        this.ships = [];

        this.missedAttacks = new Set();
        this.attacks = new Set();
        this.loadBoard();
    }
    
    loadBoard() {
        //creates 10x10 grid
        for (let i = 0; i < this.rows; i++) {
            this.board[i] = [];
            for(let j = 0; j < this.cols; j++) {
                this.board[i].push({state: "UD", shipRef: null});
            }
        }
    }
    
    getBoard() {
        return this.board;
    }
    //refactor
    placeShip(size, coords, direction) {
        const ship = new Ship(size);
        const [row, col] = coords;
        const shipLocations = [];

        for (let i = 0; i < size; i++) {
            const r = direction === 'x' ? row + i : row;
            const c = direction === 'y' ? col + i : col;
            if(!this.isInBounds([r, c]) || this.board[r][c].state === "S") {
                return false;
            } 
            shipLocations.push([r, c])
        } 
        
        for (const [r, c] of shipLocations) {
            this.board[r][c] = {state: "S", shipRef: ship};
        }
        this.ships.push(ship);
        return true
    }

    receiveAttack(coords) {
        if (!this.isInBounds(coords) || this.isAlreadyAttacked(coords)) {
            return;
        }
        const [row, col] = coords
        const ship = this.board[row][col];

        if (ship.state === "S" && ship.shipRef !== null) {
            ship.state = 'H';
            ship.shipRef.hit();
            this.addSuccessfulAttack(coords)
            return true;
        } else if (ship.state === "UD"){
            ship.state = 'M';
            this.addMissedAttack(coords);
            return false;
        }
    }

    areAllShipsSunk() {
        for (const ship of this.ships) {
            if (!ship.isSunk()) return false;
        } return true;
    }
    //Sets that prevent attacking the same coord.
    addSuccessfulAttack(coords) {
        const mark = coords.join(',')
        this.attacks.add(mark);
    }

    addMissedAttack(coords) {
        const mark = coords.join(',')
        this.missedAttacks.add(mark);
    }

    isAlreadyAttacked(coords) {
        const mark = coords.join(',');
        return this.attacks.has(mark) || this.missedAttacks.has(mark);
    }
    //bounds checker;
    isInBounds(coords) {
        const [row, col] = coords;
        return row >= 0 && col >= 0 && row <= 9 && col <= 9;
    }
}