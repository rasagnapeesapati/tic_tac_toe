let board = ["","","","","","","","",""];
let user = "";
let ai = "";
let gameOver = false;

const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

// Choose symbol from popup
function chooseSymbol(symbol){
    user = symbol;
    ai = (user === "X") ? "O" : "X";
    document.getElementById("symbolModal").style.display = "none";
    document.getElementById("status").innerText = `Your turn (${user})`;
}

// Player move
function playerMove(index){
    if(!user || gameOver) return;
    if(board[index] !== "") return;

    board[index] = user;
    updateCell(index, user);

    if(checkWinner(user)) return;

    setTimeout(aiMove, 400);
}

// AI move (win/block/random)
function aiMove(){
    if(gameOver) return;

    // 1. Try to win
    for(let i=0;i<9;i++){
        if(board[i]===""){
            board[i] = ai;
            if(isWinner(ai)){updateCell(i, ai); return;}
            board[i] = "";
        }
    }
    // 2. Block user
    for(let i=0;i<9;i++){
        if(board[i]===""){
            board[i] = user;
            if(isWinner(user)){ board[i]=ai; updateCell(i, ai); return;}
            board[i] = "";
        }
    }
    // 3. Else random
    let empty = board.map((v,i)=> v===""?i:null).filter(v=>v!==null);
    let move = empty[Math.floor(Math.random()*empty.length)];
    board[move] = ai;
    updateCell(move, ai);
}

// Update cell visually
function updateCell(i, symbol){
    document.getElementsByClassName("cell")[i].innerText = symbol;
    document.getElementById("clickSound").play();
    checkWinner(symbol);
}

// Check winner
function checkWinner(player){
    for(let p of winPatterns){
        if(p.every(i=>board[i]===player)){
            p.forEach(i=>document.getElementsByClassName("cell")[i].classList.add("win"));
            document.getElementById("status").innerText = player + " Wins!";
            document.getElementById("winSound").play();
            gameOver = true;
            return true;
        }
    }
    if(!board.includes("")){
        document.getElementById("status").innerText = "Draw!";
        gameOver = true;
        return true;
    }
    document.getElementById("status").innerText = `Your turn (${user})`;
    return false;
}

// Helper to simulate AI
function isWinner(player){
    return winPatterns.some(p=>p.every(i=>board[i]===player));
}

// Restart game
function resetGame(){
    board = ["","","","","","","","",""];
    gameOver = false;
    user = "";
    ai = "";
    document.getElementById("symbolModal").style.display = "block";
    let cells = document.getElementsByClassName("cell");
    for(let c of cells){
        c.innerText = "";
        c.classList.remove("win");
    }
    document.getElementById("status").innerText = "Choose your symbol to start";
}
