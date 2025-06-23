import { GameController } from "./battleShipLogic.js";
import { playerStorage } from "./tabLogic.js";
//get the gamecontroller separately
function GameInstanceFunc() {
    let game = GameController(); 
    const getGameInstance = () => {
        return game;
    } 
    const newGameInstance = () => game = GameController();
    
    const convertToVsGameInstance = (player1, player2) => game = GameController(player1, player2)

    return {
        getGameInstance,
        newGameInstance,
        convertToVsGameInstance
    }
}

export const gameFunc = GameInstanceFunc();

export function setUpFlowController(currPlayer = 'firstPlayer') {
    let game = gameFunc.getGameInstance();

    if (currPlayer === 'firstPlayer') {
        const firstBoardDiv = document.querySelector('.gameBoard');
        const randomSetUpButton = document.querySelector('.randomizeShips');

        const player1 = game.getAttackingPlayer()
        //eventListeners
        randomSetUpButton.addEventListener('click', () => {
            firstBoardDiv.textContent = '';
            game.randomizePlayerShips(player1);
            renderBoard(player1.getPlayerBoard(), firstBoardDiv);
        })
      
        renderBoard(player1.getPlayerBoard(), firstBoardDiv);
    } if (currPlayer === 'secondPlayer') {
        const secondBoardDiv = document.querySelector('.gameBoard');
        const randomSetUpButton = document.querySelector('.randomizeShips');

        const player2 = game.getReceivingPlayer()

        randomSetUpButton.addEventListener('click', () => {
            secondBoardDiv.textContent = '';
            game.randomizePlayerShips(player2);
            renderBoard(player2.getPlayerBoard(), secondBoardDiv);
        })

        renderBoard(player2.getPlayerBoard(), secondBoardDiv);
    }
}
//for pvp
let toggledReverse = false;
//starting battle responsibility //defaulted to computer battle
//board receiver is the player currrently receiving the attack //converted means in gamefunc it has already been converted to a game instance so we just fetch it instead
//
export function ScreenController(vs = false, boardReceiver = null, converted = false) {
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
    const passButton = document.querySelector('.pass')

    startButton.addEventListener('click', () => {
        game = gameFunc.getGameInstance();
         //just for vs computer
         if (!vs) {        
            shipToggle.addEventListener('click', () => {
            game.randomizeShipsBoth();
            updateDOM();
            })
            
            secondBoardDiv.addEventListener('click', clickHandlerCells)
            updateDOM();

            //displays the buttons
            shipToggle.classList.remove('none');
            prepareButton.classList.remove('none');
            prepareButton.addEventListener('click', () => {
                gamephase = 'battle';
                shipToggle.classList.add('none');
                prepareButton.classList.add('none');
            })
         } else if (vs) { //vs is true
             // a new game instance basicallg lazy instantiation we pretend the initial boards given is real and second is ai but we slowly convert to the actual players
            if (!converted) {
                const [player1, player2] = playerStorage.getBothPlayers()
                console.log(player1)
                gameFunc.convertToVsGameInstance(player1, player2);
            }
            
            game = gameFunc.getGameInstance();
            //displays the buttons
            passButton.classList.remove('none');
            passButton.style.opacity = 0.7;
            let hasPlayed = false
            
            if (boardReceiver === 'secondPlayer') {
                secondBoardDiv.addEventListener('click', (e) => {
                console.log('secondPlayer is the receiver')
                    if (hasPlayed) {
                        console.log("you have already made your move")
                        return;
                    }

                    const success = clickHandlerCells(e, true);
                    if (success !== true) {
                        hasPlayed = true
                        updatePvp(false)
                    }
                })
            } else if (boardReceiver === 'firstPlayer') {
                firstBoardDiv.addEventListener('click', (e) => {
                    console.log("firstPlayer is the receiver")
                    if (hasPlayed) {
                        console.log("you have already made your move")
                        return;
                    }

                    const success = clickHandlerCells(e, true);
                    if (success !== true) {
                        hasPlayed = true
                        updatePvp(false)
                    } else {
                        updatePvp
                    }
                })
            }
            updatePvp();
         }
    })
    //let the attacking player atleast see the result before passing
    const updatePvp = (seeResultBeforePass = true) => {
        const firstPlayer = game.getFirstPlayer();
        const secondPlayer = game.getSecondPlayer();
        gamephase = 'battle'

        playerOneDiv.textContent = firstPlayer.name;
        playerTwoDiv.textContent = secondPlayer.name;
        
        if (!toggledReverse) {
            console.log("Toggled Reverse is false meaning were at first players pov");

            [[firstPlayer.getPlayerBoard(), firstBoardDiv], [secondPlayer.getHiddenBoard(), secondBoardDiv]].forEach(
                ([board, boardDiv]) => {
                    boardDiv.textContent = '';
                    renderBoard(board, boardDiv)
            })
        } else {
            console.log("Toggle Reverse is true meaning were at second players pov");
            [[firstPlayer.getHiddenBoard(), firstBoardDiv], [secondPlayer.getPlayerBoard(), secondBoardDiv]].forEach(
                ([board, boardDiv]) => {
                    boardDiv.textContent = '';
                    renderBoard(board, boardDiv)
            })
        }
        if(!seeResultBeforePass) {
            toggledReverse = !toggledReverse
        }

        displayWinner();
    }

    const updateDOM = () => {
        const attackingPlayer =  game.getAttackingPlayer();
        const defendingPlayer = game.getReceivingPlayer();

        playerOneDiv.textContent = attackingPlayer.name;
        playerTwoDiv.textContent = defendingPlayer.name;
        
        [[attackingPlayer.getPlayerBoard(), firstBoardDiv], [defendingPlayer.getHiddenBoard(), secondBoardDiv]].forEach(
            ([board, boardDiv]) => {
                boardDiv.textContent = '';
                renderBoard(board, boardDiv)
        })

            //now its second players turn to not see the first board
        displayWinner();
    }

    //handles the event for calling the cells get the datacoords using parse with addEventListener
    function clickHandlerCells(e, pvp = false) {
        const target = e.target
        if(!target.classList.contains('cell') || gamephase === 'setup' || game.getGameOverState()) {
            console.log("Either over or gamephase is not ready")
            return;
        }

        const coords = JSON.parse(target.dataset.coords)
        const result = game.playRound(coords)
        console.log(result);
        
        if (pvp) {
            console.log("Updating dom but not switching")
            if (result !== null && result === true) {
                return true;
            }
        }
        updateDOM();
    }
    
    function displayWinner() {
        const winnerText = game.getWinner();

        if(winnerText) {
            const message = document.createElement("p");
            message.textContent = `${winnerText} Wins!`;
            resultDiv.insertBefore(message, resultDiv.firstChild);

            const goBackToIntro = document.querySelector('.goBack')
            goBackToIntro.classList.remove('none');
            goBackToIntro.addEventListener('click', () => {
                gameFunc.newGameInstance();
            })
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


  