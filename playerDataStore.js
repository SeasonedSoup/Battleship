//Storage for vs player
import { Player } from "./Player.js";

export function storageFunc() {
    let player1 = null;
    let player2 = null;

    const storePlayer = (player, playerName, board) => {
        if (player === 'firstPlayer') {
            player1 = new Player(true, playerName, board, true)
        } else {
            player2 = new Player(true, playerName, board, true)
        }
    }

    const getPlayer = (player) => {
        if (player = 'firstPlayer') {
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