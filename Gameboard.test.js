import {GameBoard} from "./Gameboard.js"

//defaulted to horizontal for now
test('Put 2 length ship to 0, 0', () => {
    const testBoard = new GameBoard();
    testBoard.placeShip(2, [0, 0], 'x')
 
    const cell1 = testBoard.board[0][0]
    const cell2 = testBoard.board[1][0]

    expect(cell1.state).toBe(cell2.state);
})

test('put colliding ships at a coordinate', () => {
    const testBoard = new GameBoard();
    testBoard.placeShip(4, [0, 0], 'x')
    testBoard.placeShip(5, [0,])
})
//added vertical
test('Attack 2 length ship located at 0, 0 vertical', () => {
    const testBoard = new GameBoard();
    testBoard.placeShip(2, [0, 0], 'y')

    expect(testBoard.receiveAttack([0, 1])).toBe(true);
})
//testing if all ships are actually sunk
test('Attack 3 length ship located at 5, 0 vertical', () => {
    const testBoard = new GameBoard();
    testBoard.placeShip(4, [5, 0], 'y')

    testBoard.receiveAttack([5, 0])
    testBoard.receiveAttack([5, 1])
    testBoard.receiveAttack([5, 2])
    testBoard.receiveAttack([5, 3])
    expect(testBoard.areAllShipsSunk()).toBe(true);
})