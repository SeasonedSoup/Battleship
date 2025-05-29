import { GameController } from "./battleShipLogic.js";


ScreenController();

function ScreenController() {
    let game = GameController();

    const firstBoardDiv = document.querySelector('.gameBoard1')
    const secondBoardDiv = document.querySelector('.gameBoard2')
    const firstBoard = game.getAttackingPlayer().gameboard.reloadBoard();
    const secondBoard = game.getReceivingPlayer().gameboard.reloadBoard();

    const updateDOM = () => {
        firstBoardDiv.textContent = '';
        secondBoardDiv.textContent = '';
     
        renderBoard(firstBoard, firstBoardDiv);
        renderBoard(secondBoard, secondBoardDiv);
    }

    updateDOM(); 
    //handles the event for calling the cells get the datacoords using parse with addEventListener
    function clickHandlerCells(e) {
        const target = e.target
        console.log('clicked!')

        if(!target.classList.contains('cell')) {
            return;
        }
        const coords = JSON.parse(target.dataset.coords)
        game.playRound(coords)
    }

    secondBoardDiv.addEventListener('click', clickHandlerCells)
}
//gets the board and the div and renders it with class cell
function renderBoard(board, boardDiv) {
    board.forEach((row, rowIndex) => {
        row.forEach((column ,columnIndex) => {
            const cellButton = document.createElement('button');
            cellButton.classList.add('cell');
            if (column instanceof Ship) {
                cellButton.classList.add
            }
            cellButton.dataset.coords = JSON.stringify([rowIndex, columnIndex]);

            boardDiv.appendChild(cellButton);
        })
    });
};


  