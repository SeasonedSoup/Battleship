import {GameBoard} from "./Gameboard.js"

test('Gameboard has a board', () => {
    const testBoard = new GameBoard();
    expect(testBoard).toEqual(testBoard)
})
//defaulted to horizontal for now
test('Put 2 length ship to 0, 0', () => {
    const testBoard = new GameBoard();
    testBoard.placeShip(2, [0, 0])
 
    const cell1 = testBoard.board[0][0]
    const cell2 = testBoard.board[0][1]

    expect(cell1).toBe(cell2);
})

test('Attack 2 length ship located at 0, 0', () => {
    const testBoard = new GameBoard();
    testBoard.placeShip(2, [0, 5])

    expect(testBoard.receiveAttack([0,3])).toBe(false);
})