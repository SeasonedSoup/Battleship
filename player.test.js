import {Player} from "./Player.js"

const playerOne = new Player(true, "Human");
const playerTwo = new Player(false, "Computer");


test('MakeMove Function', () => {
    playerTwo.gameboard.placeShip(2, [0,0], 'y')
    expect(playerOne.makeMove([0,0], playerTwo.gameboard)).toBe(true);
})
