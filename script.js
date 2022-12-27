function Game(){
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
        console.log('hi');
        let id = e.target.getAttribute('id');
        let i = +id[1];
        let j = +id[3];
        console.log({i, j});
        console.log(board, gameOver())
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
    }
    return {startGame}
}

let game = Game();
game.startGame();