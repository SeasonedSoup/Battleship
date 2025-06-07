import { ScreenController, setUpFlowController } from "./screencontroller.js";

export function loadGameIntro() {
    const body = document.querySelector('body');

    const content = document.createElement('div');
    content.classList.add('content')

    const buttons = document.createElement('div');
    buttons.classList.add('buttons');

    const vsAiButton = document.createElement('button');
    vsAiButton.textContent = 'Vs Ai';
    vsAiButton.classList.add('vsAi');
    vsAiButton.addEventListener('click', loadBattle);

    const vsPlayerButton = document.createElement('button');
    vsPlayerButton.textContent = 'Vs Player';
    vsPlayerButton.classList.add('vsPlayer')
    vsPlayerButton.addEventListener('click', () => loadPlayerSetUp('firstPlayer'));

    const credits = document.createElement('button');
    credits.textContent = 'Credits';
    credits.classList.add('credits');
    const addReference = () => {
        const creditFooter = document.createElement('footer');
        creditFooter.classList.add('reference')

        const link = document.createElement('a');
        link.href = 'https://github.com/SeasonedSoup'; 
        link.textContent = 'Made By @SeasonedSoups';

        link.rel = 'noopener noreferrer'; // asked ai said this important for security 

        requestAnimationFrame(() => {
            creditFooter.classList.add('active');
        });

        credits.removeEventListener('click', addReference)
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
    body.appendChild(content);
}

function loadBattle() {
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
    

    const startBtn = document.createElement('button');
    addClass(startBtn, 'start');
    startBtn.textContent = 'Start Battle';
    startBtn.addEventListener('click', () => {
        startBtn.classList.add('none')
    })

    resultWinner.appendChild(shipReadyButton);
    resultWinner.appendChild(shipToggleBtn);
    resultWinner.appendChild(startBtn);

    // append main content and resultWinner to body
    body.appendChild(aiGameplay);
    body.appendChild(resultWinner);
    
    //call logic
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

    const playerNameDiv = document.createElement('div');
    addClass(playerNameDiv, 'playerName', 'player');

    const playerBoard = document.createElement('div');
    addClass(playerBoard, 'gameBoard', 'board');

    const randomizeShipsButton = document.createElement('button');
    randomizeShipsButton.textContent = 'Randomize Placements'
    addClass(randomizeShipsButton, 'randomizeShips');

    const passButton = document.createElement('button');
    addClass(passButton, 'ready');
    passButton.addEventListener('click', intermission);
    passButton.textContent = 'Pass To Next Player'
    
    subHeader.appendChild(playerNameDiv);
    subHeader.appendChild(playerBoard);
    boardWrapper.appendChild(subHeader);
    playerGamePlay.appendChild(boardWrapper);
    body.appendChild(playerGamePlay);
    body.appendChild(randomizeShipsButton);
    body.appendChild(passButton);

    setUpFlowController(player);
}

function intermission(player) {
    const addClass = ((element, ...className) => element.classList.add(...className));

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
    readyButton.addEventListener('click', () => loadPlayerSetUp(player))

    modalDiv.appendChild(informPass);
    modalDiv.appendChild(readyButton);

    body.appendChild(modalDiv);
}