//Storage for vs player
import { Player } from "./Player.js";

export function storageFunc() {
    const player1 = null;
    const player2 = null;

    const storePlayer = (player, playerName) => {
        if (player === 'firstPlayer') {
            player1 = new Player(true, playerName)
        } else {
            player2 = new Player(true, playerName)
        }
    }

    const getPlayer = (player) => {
        if (player = 'firstPlayer'){
            return player1
        } else {
            return player2
        }
    }

    const getBothPlayers = () => {
        return [player1, player2]
    }

    return {
        storePlayer,
        getPlayer,
        getBothPlayers
    }
}