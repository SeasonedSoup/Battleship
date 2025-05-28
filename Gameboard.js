import {Ship} from "./Ship.js"

export class GameBoard {
    constructor() {
        this.rows = 10;
        this.cols = 10;
        this.board = [];
        this.missedAttacks = new Set();
        this.attacks = new Set();
        this.loadBoard();
    }
    
    loadBoard() {
        //creates 10x10 grid
        for (let i = 0; i < this.rows; i++) {
            this.board[i] = [];
            for(let j = 0; j < this.cols; j++) {
                this.board[i].push('undiscovered');
            }
        }
    }

    reloadBoard() {
        return this.board;
    }

    placeShip(size, coords, direction) {
        const ship = new Ship(size);
        const [row, cols] = coords;

        for (let i = 0; i < size; i++) {
            const r = direction === 'x' ? row + i : row;
            const c = direction === 'y' ? cols + i : cols;
            if(!this.isInBounds([r, c])) {
                throw new Error('Out of Bounds');
            } else {
                this.board[r][c] = ship;
            }

        }
    }

    receiveAttack(coords) {
        if (!this.isInBounds(coords) || this.isAlreadyAttacked(coords)) {
            return;
        }
        const ship = this.board[coords[0]][coords[1]];

        if (ship instanceof Ship) {
            ship.hit()
            this.addSuccessfulAttack(coords)
            return true;
        } else {
            this.addMissedAttack(coords);
            return false;
        }
    }

    areAllShipsSunk() {
        for (let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                if (this.board[i][j] instanceof Ship) {
                    if (!this.board[i][j].isSunk()) {
                        return false;
                    }
                }
            }
        }
        return true;
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