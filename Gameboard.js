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
                this.board[i].push([])
            }
        }
    }

    placeShip(size, coords) {
        const ship = new Ship(size);
        const [row, cols] = coords;

        for (let i = 0; i < size; i++) {
            this.board[row][cols + i] = ship;
        }
    }

    receiveAttack(coords) {
        const ship = [coords[0]][coords[1]];
        const mark = coords.join(',')
        if (ship instanceof Ship) {
            ship.hit()
            return true
        } else {
            //then mark it as a already hitted coordinate, make sure no repeats through the hashset
            this.missedAttacks.add()
            return false
        }
    }

    missedAttacks() {
        
    }


}