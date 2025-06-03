import { ScreenController } from "./screencontroller.js";

export function loadGameIntro() {
    const body = document.querySelector('body');

    const content = document.createElement('div');
    content.classList.add('content')

    const buttons = document.createElement('div');
    buttons.classList.add('buttons');

    const vsAiButton = document.createElement('button');
    vsAiButton.textContent = 'Vs Ai';
    vsAiButton.classList.add('vsAi');
    vsAiButton.addEventListener('click', loadVsAiBattle);

    const vsPlayerButton = document.createElement('button');
    vsPlayerButton.textContent = 'Vs Player';
    vsPlayerButton.classList.add('vsPlayer')

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

function loadVsAiBattle() {
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

  const shipToggleBtn = document.createElement('button');
  addClass(shipToggleBtn, 'shipToggle');
  shipToggleBtn.textContent = 'Randomize Ships';

  const startBtn = document.createElement('button');
  addClass(startBtn, 'start');
  startBtn.textContent = 'Start Battle';

  resultWinner.appendChild(shipToggleBtn);
  resultWinner.appendChild(startBtn);

  // append main content and resultWinner to body
  body.appendChild(aiGameplay);
  body.appendChild(resultWinner);
  
  //call logic
  ScreenController();
}

//loadGamePlay
/* <div class="mainContentGameplay">
        <div class="BoardWrapper">
            <div class="subHeader">
                <div class="playerOne player"></div>
                <div class="gameBoard1 board"></div>
            </div>
        </div>

        <div class="BoardWrapper">
            <div class="playerTwo player"></div>
            <div class="gameBoard2 board"></div>
        </div>
    </div>
    <div class="resultWinner">
        <button class="shipToggle">Randomize Ships</button>
        <button class="start">Start Battle</button>
    </div>
    <footer>By @SeasonedSoups</footer> */