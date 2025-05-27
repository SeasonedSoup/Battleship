import {Player} from "./Player.js"

const playerOne = new Player(true, "Human");
const playerTwo = new Player(false, "Computer");

test('makeMove Function', () => {
    const player2board = playerTwo.gameboard;

    expect(playerOne.makeMove([0, 0], player2board)).toBe(false)
})


test('PlaceAllShips mock function', () => {
    const playerBoard = playerOne.gameboard
    playerBoard.placeShip = jest.fn()

    playerOne.placeMultipleRandomShips();

    expect(playerBoard.placeShip).toHaveBeenCalledTimes(4);
})

