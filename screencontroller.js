import { GameController } from "./battleShipLogic.js";


ScreenController();

function ScreenController() {
    let game = GameController();

    const firstBoardDiv = document.querySelector('.gameBoard1')
    const secondBoardDiv = document.querySelector('.gameBoard2')
    const firstBoard = game.getAttackingPlayer().gameboard.getBoard();
    const secondBoard = game.getReceivingPlayer().gameboard.getBoard();

    const updateDOM = () => {
        [[firstBoard, firstBoardDiv], [secondBoard, secondBoardDiv]].map(
            ([board, boardDiv]) => {
                boardDiv.textContent = '';
                renderBoard(board, boardDiv)
        })
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
        updateDOM();
    }

    secondBoardDiv.addEventListener('click', clickHandlerCells)
}
//gets the board and the div and renders it with class cell
function renderBoard(board, boardDiv) {
    board.forEach((row, rowIndex) => {
        row.forEach((col ,columnIndex) => {
            const cellButton = document.createElement('button');
            cellButton.classList.add('cell');
            //add case TO DO
            switch (col.state) {
                case 'S':
                    cellButton.classList.add('ship');
                    break;

                case 'M':
                    cellButton.classList.add('miss');
                    break;
                
                case 'H':
                    cellButton.classList.add('hit');
                    break;

            }
           
            cellButton.dataset.coords = JSON.stringify([rowIndex, columnIndex]);

            boardDiv.appendChild(cellButton);
        })
    });
};


  