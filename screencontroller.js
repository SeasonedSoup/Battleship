import { GameController } from "./battleShipLogic";

function ScreenController() {
    try {
        let game = GameController();

    const firstBoardDiv = document.querySelector('.gameBoard1')
    const secondBoardDiv = document.querySelector('.gameBoard2')


    const updateDOM = () => {
        firstBoardDiv.textContent = '';
        secondBoardDiv.textContent = '';

        const firstBoard = game.getAttackingPlayer().gameboard.reloadBoard();
        const secondBoard = game.getReceivingPlayer().gameboard.reloadBoard();
     
        renderBoard(firstBoard, firstBoardDiv);
        renderBoard(secondBoard, secondBoardDiv);
    }
    
    updateDOM(); 
    } catch (e) {
        console.error("GameController failed:", e);
    }
}
//gets the board and the div and renders it with class cell
function renderBoard(board, boardDiv) {
    board.forEach((row, rowIndex) => {
        row.forEach((columnIndex) => {
            const cellButton = document.createElement('button');
            cellButton.classList.add('cell');
            cellButton.coords = [rowIndex, columnIndex];

            boardDiv.appendChild(cellButton);
        })
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('script')
    const board = document.querySelector('.gameBoard1');
    const hello = document.createElement('h1');
    hello.textContent = "HELLO WORLD!";
    board.appendChild(hello);
    ScreenController();
  });