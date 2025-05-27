import {Player} from "./Player.js"

const playerOne = new Player(true, "Human");
const playerTwo = new Player(false, "Computer");


test('MakeMove Function', () => {
    playerTwo.gameboard.placeShip(2, [0,0], 'y')
    expect(playerOne.makeMove([0,0])).toBe(false);
})

test('PlaceAllShips mock function', () => {
    const playerBoard = playerOne.gameboard
    playerBoard.placeShip = jest.fn()

    playerOne.placeMultipleRandomShips();

    expect(playerBoard.placeShip).toHaveBeenCalledTimes(4);
})
