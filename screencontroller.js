import { GameController } from "./battleShipLogic";

function ScreenController() {
    let game = GameController; 

    const firstBoardDiv = document.querySelector('.gameBoard1')
    const secondBoardDiv = document.querySelector('.gameBoard2')

    const updateDOM = () => {
        firstBoardDiv.textContent = '';
        secondBoardDiv.textContent = '';
    }
}