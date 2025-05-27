import { GameController } from "./battleShipLogic.js"

test('Active Player is Player Two', () => {
    const controller = GameController();

    const first = controller.getAttackingPlayer();

    controller.togglePlayerTurns()
    const second = controller.getReceivingPlayer();
    
   

    expect(second).toBe(first)
})