import {GameController} from "./battleship.js"

const gameController = GameController();

test('Active Player must be player two', () => {
    gameController.togglePlayerTurns()
    expect(gameController.activePlayer.name).toBe("Computer")
})

test('Active player attacks player two', () => {
    gameController.togglePlayerTurns()

    gameController.makeMove([0, 1])
})