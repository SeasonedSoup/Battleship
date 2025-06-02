import {Player} from "./Player.js"

const playerOne = new Player(true, "Human");
const playerTwo = new Player(false, "Computer");

//test whether it returns true or false when the attack worked
test('makeMove Function', () => {
    const player2board = playerTwo.gameboard;

    expect(playerOne.makeMove([0, 0], player2board)).toBe(false)
})

test('Check if hidden board and what object', () => {
    expect(playerOne.getHiddenBoard()).toBeInstanceOf(Object)
})


