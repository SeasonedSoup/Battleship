import { ScreenController, setUpFlowController, gameFunc } from "./screencontroller.js";
import { storageFunc } from "./playerDataStore.js";

export const playerStorage = storageFunc();

export function loadGameIntro() {
    const body = document.querySelector('body');
    body.textContent = ''

    const header = document.createElement('header')
    header.classList.add('gameTitle')
    header.textContent = 'Battle Ship!'

    const content = document.createElement('div');
    content.classList.add('content')

    const buttons = document.createElement('div');
    buttons.classList.add('buttons');

    const vsAiButton = document.createElement('button');
    vsAiButton.textContent = 'Vs Ai';
    vsAiButton.classList.add('vsAi');
    vsAiButton.addEventListener('click', () => loadBattle());

    const vsPlayerButton = document.createElement('button');
    vsPlayerButton.textContent = 'Vs Player';
    vsPlayerButton.classList.add('vsPlayer')
    vsPlayerButton.addEventListener('click', () => loadPlayerSetUp('firstPlayer'));

    const credits = document.createElement('button');
    credits.textContent = 'Credits';
    credits.classList.add('credits');

    const creditFooter = document.createElement('footer');

    const link = document.createElement('a');
    link.href = 'https://github.com/SeasonedSoup'; 
    link.textContent = 'Made By @SeasonedSoup';

    link.rel = 'noopener noreferrer';

    
    const removeReference = () => {
        requestAnimationFrame(() => {
            creditFooter.classList.remove('active');
        })
        credits.removeEventListener('click', removeReference);
        credits.addEventListener('click', addReference);
        document.removeChild('.reference');
    }
    const addReference = () => {
        creditFooter.classList.add('reference')
 // asked ai said this important for security 

        requestAnimationFrame(() => {
            creditFooter.classList.add('active');
        });

        credits.removeEventListener('click', addReference)
        credits.addEventListener('click', removeReference)
        creditFooter.appendChild(link);
        body.appendChild(creditFooter);
    }
    credits.addEventListener('click', addReference)

    const quickAppend = (element) => {
        buttons.appendChild(element);
    }

    quickAppend(vsAiButton);
    quickAppend(vsPlayerButton);
    quickAppend(credits);

    content.appendChild(buttons);
    body.appendChild(header);
    body.appendChild(content);
}
//converted means it hasnt yet been converted to a vsgame instance
function loadBattle(vs = false, boardReceiver = null, converted = false) {
    const addClass = ((element, ...className) => element.classList.add(...className));

    const body = document.querySelector('body');
    body.textContent = '';

    const aiGameplay = document.createElement('div');
    addClass(aiGameplay, 'mainContentGameplay');

    const boardWrapper1 = document.createElement('div');
    addClass(boardWrapper1, 'BoardWrapper');

    const subHeader = document.createElement('div');
    addClass(subHeader, 'subHeader');

    const playerOneName = document.createElement('div');
    addClass(playerOneName, 'playerOne', 'player');

    const playerOneBoard = document.createElement('div');
    addClass(playerOneBoard, 'gameBoard1', 'board');

    // build first BoardWrapper
    subHeader.appendChild(playerOneName);
    subHeader.appendChild(playerOneBoard);
    boardWrapper1.appendChild(subHeader);

    // second BoardWrapper
    const boardWrapper2 = document.createElement('div');
    addClass(boardWrapper2, 'BoardWrapper');

    const playerTwoName = document.createElement('div');
    addClass(playerTwoName, 'playerTwo', 'player');

    const playerTwoBoard = document.createElement('div');
    addClass(playerTwoBoard, 'gameBoard2', 'board');

    boardWrapper2.appendChild(playerTwoName);
    boardWrapper2.appendChild(playerTwoBoard);

    // append both board wrappers to main container
    aiGameplay.appendChild(boardWrapper1);
    aiGameplay.appendChild(boardWrapper2);

    // resultWinner div
    const resultWinner = document.createElement('div');
    addClass(resultWinner, 'resultWinner');

    const shipReadyButton = document.createElement('button');
    addClass(shipReadyButton, 'ready', 'none');
    shipReadyButton.textContent = 'Prepare Battle';

    const shipToggleBtn = document.createElement('button');
    addClass(shipToggleBtn, 'shipToggle', 'none');
    shipToggleBtn.textContent = 'Randomize Ships';

    const passButton = document.createElement('button')
    addClass(passButton, 'pass', 'none');
    passButton.textContent = 'Pass';

    passButton.addEventListener('click', () => {
        intermission('currentlyInBattle')
    })

    const goBackToIntroBtn = document.createElement('button');
    addClass(goBackToIntroBtn, 'goBack', 'none');
    goBackToIntroBtn.textContent = ' < Main Menu';
    goBackToIntroBtn.addEventListener('click', () => {
        loadGameIntro();
    })
    

    const startBtn = document.createElement('button');
    addClass(startBtn, 'start');
    startBtn.textContent = 'Start Battle';
    startBtn.addEventListener('click', () => {
        startBtn.classList.add('none')
    })
    resultWinner.appendChild(goBackToIntroBtn);
    resultWinner.appendChild(shipReadyButton);
    resultWinner.appendChild(shipToggleBtn);
    resultWinner.appendChild(startBtn);
    resultWinner.appendChild(passButton);
    

    // append main content and resultWinner to body
    body.appendChild(aiGameplay);
    body.appendChild(resultWinner);
    
    //call logic
    if (vs) {
        ScreenController(vs, boardReceiver, converted) //means its pvp
        return;
    }
    ScreenController();
}   

function loadPlayerSetUp(player) {
    
    const addClass = ((element, ...className) => element.classList.add(...className));

    const body = document.querySelector('body');
    body.textContent = '';

    const playerGamePlay = document.createElement('div');
    addClass(playerGamePlay, 'gameplay');

    const boardWrapper = document.createElement('div')
    addClass(boardWrapper, 'BoardWrapper');

    const subHeader = document.createElement('div');
    addClass(subHeader, 'subHeader');

    const playerLabel = document.createElement('label');
    addClass(playerLabel, 'playerLabel');
    playerLabel.textContent = 'Player Name Input: '

    const playerNameDiv = document.createElement('input');
    addClass(playerNameDiv, 'playerName', 'player');

    const playerBoard = document.createElement('div');
    addClass(playerBoard, 'gameBoard', 'board');

    const randomizeShipsButton = document.createElement('button');
    randomizeShipsButton.textContent = 'Randomize Placements'
    addClass(randomizeShipsButton, 'randomizeShips');

    const game = gameFunc.getGameInstance()
    
    const passButton = document.createElement('button');
    addClass(passButton, 'ready');
    passButton.addEventListener('click', () => {
        if (playerNameDiv.value === '') {
            alert('Enter a valid name')
            return;
        }
        if (player === 'firstPlayer' ) {
            playerStorage.storePlayer(player, playerNameDiv.value, game.getAttackingPlayer().getGameBoard()); 
            intermission('secondPlayer');
        } else if (player === 'secondPlayer') {
            playerStorage.storePlayer(player, playerNameDiv.value, game.getReceivingPlayer().getGameBoard());
            intermission('firstPlayerDone')
        }
    });
    passButton.textContent = 'Pass To Next Player'
    subHeader.appendChild(playerLabel);
    subHeader.appendChild(playerNameDiv);
    subHeader.appendChild(playerBoard);
    boardWrapper.appendChild(subHeader);
    playerGamePlay.appendChild(boardWrapper);
    body.appendChild(playerGamePlay);
    body.appendChild(randomizeShipsButton);
    body.appendChild(passButton);

    setUpFlowController(player);
}

//asks if the first player is receiving
let isFirstPlayer = false
function intermission(player) {
    const addClass = ((element, ...className) => element.classList.add(...className));
    console.log(player);
    const body = document.querySelector('body');
    body.textContent = '';

    const modalDiv = document.createElement('div');
    addClass(modalDiv, 'modalDiv');

    const informPass = document.createElement('h1');
    addClass(informPass, 'informPass');
    informPass.textContent = 'Pass it onto the next player! (click ready if you are the next player)';
    
    const readyButton = document.createElement('button')
    addClass(readyButton, 'readyButton');
    readyButton.textContent = 'Ready';
    //bad if statements lol
    if (player !== 'firstPlayerDone' && player !== 'currentlyInBattle') {
        readyButton.addEventListener('click', () => loadPlayerSetUp(player))
    } else if (player === 'firstPlayerDone') {
        readyButton.addEventListener('click', () => loadBattle(true, 'secondPlayer'))
        isFirstPlayer = !isFirstPlayer
    } else if (player === 'currentlyInBattle' ) {
        if (isFirstPlayer) {
            readyButton.addEventListener('click', () => loadBattle(true, 'firstPlayer', true))
            isFirstPlayer = !isFirstPlayer
        } else if (!isFirstPlayer) {
            readyButton.addEventListener('click', () => loadBattle(true, 'secondPlayer', true))
            isFirstPlayer = !isFirstPlayer
        }
    }

    modalDiv.appendChild(informPass);
    modalDiv.appendChild(readyButton);

    body.appendChild(modalDiv);
}
