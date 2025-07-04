export class Ship {
    constructor(length, hits = 0, sunk = false, positions = []) {
        this.length = length;
        this.hits = hits;
        this.sunk = sunk;
    }

    hit() {
        this.hits += 1;
    }

    isSunk() {
        return this.hits === this.length;
    }
}