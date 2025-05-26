import {GameController} from "./battleship.js"

test('Active Player must be player two', () => {
    const gameController = GameController();

    gameController.togglePlayerTurns()
    expect(gameController.activePlayer.name).toBe("Computer")
})