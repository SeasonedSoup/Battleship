import { GameController } from "./battleShipLogic.js"
// test to see if the current player switch works
test('Active Player is Player Two', () => {
    const controller = GameController();

    const first = controller.getAttackingPlayer();

    controller.togglePlayerTurns()
    const second = controller.getReceivingPlayer();
    
    expect(second).toBe(first)
})

//test for getting the correct winner name
test('Player one is Winner', () => {
    const controller = GameController();

    const receivingPlayer = controller.getReceivingPlayer();
    controller.getAttackingPlayer().makeMove([0, 0], receivingPlayer.gameboard)

    expect(controller.getWinner()).toBe('Computer')
})