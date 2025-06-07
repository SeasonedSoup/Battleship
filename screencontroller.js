import { GameController } from "./battleShipLogic.js";
//get the gamecontroller separately
function GameInstanceFunc() {
    let game = GameController(); 

    const getGameInstance = () => {
        return game;
    } 
    const newGameInstance = () => game = GameController();

    return {
        getGameInstance,
        newGameInstance
    }
}
export function setUpFlowController(currPlayer = 'firstPlayer') {
    let game = GameController();

    if (currPlayer === 'firstPlayer') {
        const firstBoardDiv = document.querySelector('.gameBoard');
        const randomSetUpButton = document.querySelector('.randomizeShips')
        const player = game.playerOne
        randomSetUpButton.addEventListener('click', () => {
            firstBoardDiv.textContent = '';
            game.randomizePlayerShips(player);
            renderBoard(player.getPlayerBoard(), firstBoardDiv);
        })

        renderBoard(player.getPlayerBoard(), firstBoardDiv);
    } 
}

//starting battle responsibility
export function ScreenController(ai = true, firstPlayer = null, secondPlayer = null) {
    let game;
    let gamephase = 'setup';

    const firstBoardDiv = document.querySelector('.gameBoard1');
    const secondBoardDiv = document.querySelector('.gameBoard2');
    const playerOneDiv = document.querySelector('.playerOne');
    const playerTwoDiv = document.querySelector('.playerTwo');
    const resultDiv = document.querySelector('.resultWinner');
    const shipToggle = document.querySelector('.shipToggle');
    const startButton = document.querySelector('.start');
    const prepareButton = document.querySelector('.ready');

    startButton.addEventListener('click', () => {
         //just for vs computer
         game = GameController();
        
        shipToggle.addEventListener('click', () => {
            game.randomizeShipsBoth();
            updateDOM();
        })
        secondBoardDiv.addEventListener('click', clickHandlerCells)
        updateDOM();

        //displays the gameplay
        shipToggle.classList.remove('none');
        prepareButton.classList.remove('none');
        prepareButton.addEventListener('click', () => {
            gamephase = 'battle';
            shipToggle.classList.add('none');
            prepareButton.classList.add('none');
        })
    })
    //mixed dynamic
    const updateDOM = () => {
        const firstPlayer =  game.playerOne;
        const secondPlayer = game.playerTwo;
        playerOneDiv.textContent = firstPlayer.name;
        playerTwoDiv.textContent = secondPlayer.name;
        [[firstPlayer.gameboard.getBoard(), firstBoardDiv], [secondPlayer.getHiddenBoard(), secondBoardDiv]].forEach(
            ([board, boardDiv]) => {
                boardDiv.textContent = '';
                renderBoard(board, boardDiv)
        })
        displayWinner();
    }
    //handles the event for calling the cells get the datacoords using parse with addEventListener
    function clickHandlerCells(e) {
        const target = e.target
        if(!target.classList.contains('cell') || gamephase === 'setup') {
            return;
        }

        const coords = JSON.parse(target.dataset.coords)
        game.playRound(coords)
        updateDOM();
    }
    
    function displayWinner() {
        const winnerText = game.getWinner();

        if(winnerText) {
            const message = document.createElement("p");
            message.textContent = `${winnerText} Wins!`;
            resultDiv.appendChild(message);
            resultDiv.textContent = `${winnerText} Wins!`;
        }
    }
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
                case 'hidden':
                    cellButton.classList.add('hidden');
                    break;

            }
           
            cellButton.dataset.coords = JSON.stringify([rowIndex, columnIndex]);

            boardDiv.appendChild(cellButton);
        })
    });
};


  