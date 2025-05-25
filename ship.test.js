import {Ship} from "./Ship.js";

test('Test Ships Hit', () => {
    const testShip = new Ship()
    expect(testShip.hits).toBe(0); 
})

test('Test Ships Length', () => {
    const testShip = new Ship(4)
    expect(testShip.length).toBe(4); 
})

test('Test Ships Sunk State', () => {
    const testShip = new Ship()
    expect(testShip.isSunk()).toBe(false); 
})

test('Test Ships Hit Amount', () => {
    const testShip = new Ship(3)

    for(let i = 0; i < testShip.length; i++) {
        testShip.hit();
    }

    expect(testShip.hits).toBe(3); 
})


