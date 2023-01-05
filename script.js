function GameVsHuman(){
    const player1 = 'X';
    const player2 = 'O';
    let player1Score = 0;
    let player2Score = 0;
    let board =   [['', '', ''], 
                    ['', '', ''], 
                    ['', '', '']];
    let turn = 0;

    const gameOver = () => {
        for (let i = 0; i < 3; i++){
            if(board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][1] != ''){
                return true;
            }
            if(board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[1][i] != ''){
                return true;
            }
        }
        if(board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ''){
            return true;
        }
        if(board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[1][1] != ''){
            return true;
        }
        for (let i = 0; i < 3; i++){
            for (let j =0; j < 3; j++){
                if (board[i][j] == ''){
                    return false;
                }
            }
        }
        return true;
    }

    const winner = () => {
        for (let i = 0; i < 3; i++){
            if(board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][1] != ''){
                return true;
            }
            if(board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[1][i] != ''){
                return true;
            }
        }
        if(board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ''){
            return true;
        }
        if(board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[1][1] != ''){
            return true;
        }
        return false;
    }

    const playTurn = (e) => {
        let id = e.target.getAttribute('id');
        let i = +id[1];
        let j = +id[3];
        if (!gameOver() && board[i][j] == ''){
            if (turn % 2 == 0){
                board[i][j] = player1;
            }
            else{
                board[i][j] = player2;
            }
            turn ++;
            displayGame();
        }
    }

    const startGame = () => {
        let boxes = document.querySelectorAll('.box');
        boxes.forEach((box, index) => {
            let x = Math.floor(index / 3);
            let y = index % 3;
            box.setAttribute('id', `[${x},${y}]`);
            box.addEventListener('click', playTurn);
        });
        let restart = document.querySelector('.restart');
        restart.onclick = restartGame;
        displayGame();
    }

    const restartGame = () => {
        board = [['', '', ''],
                ['', '', ''], 
                ['', '', '']];
        turn = 0;
        displayGame();
    }

    const displayGame = () => {
        // boxes display
        let boxes = document.querySelectorAll('.box');
        boxes.forEach((box, index) => {
            let x = Math.floor(index / 3);
            let y = index % 3;
            box.textContent = board[x][y];
            if (board[x][y] == player1){
                box.setAttribute('style', 'color: rgb(184, 109, 109)');
            }
            else{
                box.setAttribute('style', 'color: rgb(101, 104, 245)');
            }
        });
        // turn display
        let turnDisplay = document.querySelector('.turn');
        if(gameOver()){
            if (!winner()){
                turnDisplay.setAttribute('style', 'color: silver');
                turnDisplay.textContent = 'Tied!'
            }
            else if (turn % 2 == 0){
                turnDisplay.setAttribute('style', 'color: gold');
                turnDisplay.textContent = 'Player 2 wins';
                player2Score++;
            }
            else{
                turnDisplay.setAttribute('style', 'color: gold');
                turnDisplay.textContent = 'Player 1 wins';
                player1Score++;
            }
        }
        else{
            turnDisplay.setAttribute('style', 'color: silver');
            if (turn % 2 == 0){
                turnDisplay.textContent = 'Player 1 turn';
            }
            else{
                turnDisplay.textContent = 'Player 2 turn';
            }
        }
        // score display
        let player1Display = document.querySelector('.player1.score');
        let player2Display = document.querySelector('.player2.score');
        player1Display.textContent = player1Score;
        player2Display.textContent = player2Score;
        let player1Name = document.querySelector('.player1.name');
        let player2Name = document.querySelector('.player2.name');
        player1Name.textContent = 'Player 1';
        player2Name.textContent = 'Player 2';
    }
    return {startGame}
}

// let game = Game();
// game.startGame();

function GameVsBot(playerchoice){
    let player = playerchoice;
    let computer = (player == 'X')? 'O':'X';
    let playerScore = 0;
    let computerScore = 0;
    let turn = 0;
    let board =   [['', '', ''], 
                    ['', '', ''], 
                    ['', '', '']];

    const playerTurn = () => {
        if(gameOver()[0]){
            return false;
        }
        let currPlayer = (turn % 2 == 0)? 'X':'O';
        if (currPlayer == player){
            return true;
        }
        return false;
    };

    const playTurn = (e) => {
        if (playerTurn()){
            let id = e.target.getAttribute('id');
            let i = +id[1];
            let j = +id[3];
            if (!gameOver()[0] && board[i][j] == ''){
                board[i][j] = player;
                turn++;
            }
            displayGame();
            computerTurn();
        }
    }

    const gameOver = () => {
        for (let i = 0; i < 3; i++){
            if(board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][1] != ''){
                return [true, board[i][0]];
            }
            if(board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[1][i] != ''){
                return [true, board[0][i]];
            }
        }
        if(board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ''){
            return [true, board[0][0]];
        }
        if(board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[1][1] != ''){
            return [true, board[1][1]];
        }
        for (let i = 0; i < 3; i++){
            for (let j =0; j < 3; j++){
                if (board[i][j] == ''){
                    return [false, null];
                }
            }
        }
        return [true, null];
    }

    const winner = (state) => {
        for (let i = 0; i < 3; i++){
            if(state[i][0] == state[i][1] && state[i][1] == state[i][2] && state[i][1] != ''){
                return [true, state[i][0]];
            }
            if(state[0][i] == state[1][i] && state[1][i] == state[2][i] && state[1][i] != ''){
                return [true, state[0][i]];
            }
        }
        if(state[0][0] == state[1][1] && state[1][1] == state[2][2] && state[0][0] != ''){
            return [true, state[0][0]];
        }
        if(state[0][2] == state[1][1] && state[1][1] == state[2][0] && state[1][1] != ''){
            return [true, state[1][1]];
        }
        for (let i = 0; i < 3; i++){
            for (let j =0; j < 3; j++){
                if (state[i][j] == ''){
                    return [false, null];
                }
            }
        }
        return [true, null];
    }

    const startGame = () => {
        let boxes = document.querySelectorAll('.box');
        boxes.forEach((box, index) => {
            let x = Math.floor(index / 3);
            let y = index % 3;
            box.setAttribute('id', `[${x},${y}]`);
            box.addEventListener('click', playTurn);
        });
        let restart = document.querySelector('.restart');
        restart.onclick = restartGame;
        displayGame();
        if(!playerTurn()){
            computerTurn();
        }
    }

    const restartGame = () => {
        board = [['', '', ''],
                ['', '', ''], 
                ['', '', '']];
        turn = 0;
        displayGame();
        if(!playerTurn()){
            computerTurn();
        }
    }

    const displayGame = () => {
        // boxes display
        let boxes = document.querySelectorAll('.box');
        boxes.forEach((box, index) => {
            let x = Math.floor(index / 3);
            let y = index % 3;
            box.textContent = board[x][y];
            if (board[x][y] == player){
                box.setAttribute('style', 'color: rgb(184, 109, 109)');
            }
            else{
                box.setAttribute('style', 'color: rgb(101, 104, 245)');
            }
        });
        // turn display
        let turnDisplay = document.querySelector('.turn');
        if(gameOver()[0]){
            if (!gameOver()[1]){
                turnDisplay.setAttribute('style', 'color: silver');
                turnDisplay.textContent = 'Tied!'
            }
            else if (gameOver()[1] == player){
                turnDisplay.setAttribute('style', 'color: gold');
                turnDisplay.textContent = 'Player wins';
                playerScore++;
            }
            else{
                turnDisplay.setAttribute('style', 'color: gold');
                turnDisplay.textContent = 'Computer wins';
                computerScore++;
            }
        }
        else{
            turnDisplay.setAttribute('style', 'color: silver');
            if (playerTurn()){
                turnDisplay.textContent = 'Player turn';
            }
            else{
                turnDisplay.textContent = 'Computer turn';
            }
        }
        // score display
        let playerDisplay = document.querySelector('.player1.score');
        let computerDisplay = document.querySelector('.player2.score');
        let playerName = document.querySelector('.player1.name');
        let computerName = document.querySelector('.player2.name');
        playerName.textContent = 'Player';
        computerName.textContent = 'Computer';
        playerDisplay.textContent = playerScore;
        computerDisplay.textContent = computerScore;
    }

    const computerTurn = () => {
        if (!playerTurn() && !gameOver()[0]){
            if (computer == 'X'){
                let move = max(board)[1];
                board[move[0]][move[1]] = 'X';
            }
            else{
                let move = min(board)[1];
                board[move[0]][move[1]] = 'O';
            }
            turn++;
            displayGame();
        }
    }



    const actions = (state) => {
        moves = [];
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if(state[i][j] == ''){
                    moves.push([i, j]);
                }
            }
        }
        return moves;
    }

    const max = (state) => {
        let moves = actions(state);
        let results = [];
        moves.forEach((move) => {
            newState = JSON.parse(JSON.stringify(state));
            newState[move[0]][move[1]] = 'X';
            let [over, victor] = winner(newState);
            if(over){
                if(victor == 'X'){
                    results.push(1);
                }
                else if(victor == 'O'){
                    results.push(-1);
                }
                else{
                    results.push(0);
                }
            }
            else{
                results.push(min(newState)[0]);
            }
        });
        let bestResult = Math.max(...results);
        let bestMove = moves[results.indexOf(bestResult)];
        return [bestResult, bestMove];
    }

    const min = (state) => {
        let moves = actions(state);
        let results = [];
        moves.forEach((move) => {
            newState = JSON.parse(JSON.stringify(state));
            newState[move[0]][move[1]] = 'O';
            let [over, victor] = winner(newState);
            if(over){
                if(victor == 'X'){
                    results.push(1);
                }
                else if(victor == 'O'){
                    results.push(-1);
                }
                else{
                    results.push(0);
                }
            }
            else{
                results.push(max(newState)[0]);
            }
        });
        let bestResult = Math.min(...results);
        let bestMove = moves[results.indexOf(bestResult)];
        return [bestResult, bestMove];
    }
    return {startGame};
}

let modeHuman = document.querySelector('.human');
let mainGame = document.querySelector('.main');
let menu1 = document.querySelector('.menu1');
let menu2 = document.querySelector('.menu2');
let playX = document.querySelector('.X');
let playO = document.querySelector('.O');
let home = document.querySelector('.home');

modeHuman.addEventListener('click', () => {
    let game = GameVsHuman();
    menu1.setAttribute('style', 'display: none');
    mainGame.setAttribute('style', 'display: flex');
    game.startGame();
});

let modeComputer = document.querySelector('.computer');
modeComputer.addEventListener('click', () => {
    menu1.setAttribute('style', 'display: none');
    menu2.setAttribute('style', 'display: flex');
});

playX.addEventListener('click', () => {
    let game = GameVsBot('X');
    menu2.setAttribute('style', 'display: none');
    mainGame.setAttribute('style', 'display: flex');
    game.startGame();
});

playO.addEventListener('click', () => {
    let game = GameVsBot('O');
    menu2.setAttribute('style', 'display: none');
    mainGame.setAttribute('style', 'display: flex');
    game.startGame();
});

home.addEventListener('click', () => {
    menu2.setAttribute('style', 'display: none');
    mainGame.setAttribute('style', 'display: none');
    menu1.setAttribute('style', 'display: flex');
})