import { isValidWhitePawnMove, isValidBlackPawnMove, isValidWhiteBishMove, isValidBlackBishMove, 
    isValidWhiteKnightMove, isValidBlackKnightMove, isValidWhiteRookMove, isValidBlackRookMove,
    isValidWhiteKingMove, isValidBlackKingMove, validWhiteaCastle, validWhitehCastle,
    validBlackaCastle, validBlackhCastle, getAllValidMoves
} from "./moveValidations.js";

import { evaluation } from "./evaluate.js";


let board = [
    ['\u265C', '\u265E', '\u265D', '\u265B', '\u265A', '\u265D', '\u265E', '\u265C'], 
    ['\u265F', '\u265F', '\u265F', '\u265F', '\u265F', '\u265F', '\u265F', '\u265F'], 
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['\u2659', '\u2659', '\u2659', '\u2659', '\u2659', '\u2659', '\u2659', '\u2659'],
    ['\u2656', '\u2658', '\u2657', '\u2655', '\u2654', '\u2657', '\u2658', '\u2656'] 
];


let whiteHaveCaptured = [];
let blackHaveCaptured = [];

function evaluateBoard(whiteCapturedPieces, blackCapturedPieces) {
    const pieceValues = {
        "♙": 1, "♟": 1,
        "♘": 3, "♞": 3,
        "♗": 3, "♝": 3,
        "♖": 5, "♜": 5,
        "♕": 9, "♛": 9
    };

    let whiteScore = 0, blackScore = 0;

    whiteCapturedPieces.forEach(piece => {
        if (piece in pieceValues) {
            whiteScore += pieceValues[piece];
        }
    });

    blackCapturedPieces.forEach(piece => {
        if (piece in pieceValues) {
            blackScore += pieceValues[piece];
        }
    });

    let scoreDifference = whiteScore - blackScore;

    return scoreDifference;
}

function setCapturedDisplay () {
    const whiteCaptured = document.getElementById("white-capture");
    const blackCaptured = document.getElementById("black-capture");

    whiteCaptured.innerHTML = "";
    blackCaptured.innerHTML = "";
    whiteHaveCaptured.sort().reverse();
    blackHaveCaptured.sort().reverse();

    whiteHaveCaptured.forEach ( pieceOfArray => {
        const pieceElement = document.createElement("span");
        pieceElement.innerText = pieceOfArray;
        whiteCaptured.appendChild(pieceElement);
    });

    blackHaveCaptured.forEach ( pieceOfArray => {
        const pieceElement = document.createElement("span");
        pieceElement.innerText = pieceOfArray;
        blackCaptured.appendChild(pieceElement);
    });

    let evaluation = evaluateBoard(whiteHaveCaptured, blackHaveCaptured);
    let difference = evaluation;

    if (difference > 0) {
        const whiteDiffElement = document.createElement("span");
        let string = " +" + JSON.stringify(difference);
        whiteDiffElement.innerText = string;
        whiteCaptured.appendChild(whiteDiffElement);
    }
    else if (difference < 0) {
        const blackDiffElement = document.createElement("span");
        let string = " +" + JSON.stringify(-1*difference);
        blackDiffElement.innerText = string;
        blackCaptured.appendChild(blackDiffElement);
    }
}

document.getElementById("back-home").addEventListener("click", () => {
    const overlay = document.getElementById("overlay");
    overlay.classList.remove("active");
    const modal = document.getElementById("modal-popup");
    modal.classList.add("hidden"); 
    window.location.href= "index.html";
});

async function popUp(state, color) {
    await new Promise(r => setTimeout(r, 500));
    const overlay = document.getElementById("overlay");
    overlay.classList.add("active");
    const modal = document.getElementById("modal-popup");
    modal.classList.remove("hidden");
    const textContent = document.getElementById("text-content");
    if (state == "draw") {
        textContent.innerHTML = "Döntetlen!"
    }
    else if (state == "mate" && color == "white") {
        textContent.innerHTML = "Gratulálok, nyertél!"
    }
    else if (state == "mate" && color == "black") {
        textContent.innerHTML = "Sajnos vesztettél!"
    }
    
}

async function checkAppears() {
    const chessboard = document.getElementById("chessboard");
    chessboard.classList.add("appearing");
    await new Promise(r => setTimeout(r, 1200));
    chessboard.classList.remove("appearing");
}

async function invalidMove() {
    const chessboard = document.getElementById("chessboard");
    chessboard.classList.add("invalid");
    await new Promise(r => setTimeout(r, 1200));
    chessboard.classList.remove("invalid");
}

const chessboard = document.getElementById("chessboard");

let draggedPiece = null;
let fromRow = null;
let fromCol = null;


function renderBoard() {
    
    const chessboard = document.getElementById("chessboard");

    chessboard.innerHTML = ""; 

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++ ){
            const square = document.createElement("div");
    
            if ((row+col)%2==0) {
                square.className = "light-square";
            }
            else {
                square.className = "dark-square";
            }
            square.dataset.row = row;
            square.dataset.col = col;
               
            const piece = board[row][col]
            if (piece){
                square.textContent = piece;
                square.classList.add(piece.charCodeAt(0) < 9818 ? "white" : "black");
                square.draggable = true;    
            }
            
            chessboard.appendChild(square);
        }
    }  
}



function findKing(board, isWhite) {
    const kingSymbol = isWhite ? "♔" : "♚";
    for (let i=0; i<8 ; i++) {
        for (let j=0; j<8; j++) {
            if (board[i][j]===kingSymbol) {
                return [i, j];
            }
        }
    }
    return null;
}

function isSquareUnderAttack(board, row, col, byWhite) {
    // Pawn

    if (byWhite) {
        if (row<7) {
            if (col>0 && board[row+1][col-1] === "♙" ) return true;
            if (col<7 && board[row+1][col+1] === "♙" ) return true;
        }
    }
    else {
        if (row>0) {
            if (col>0 && board[row-1][col-1] === "♟" ) return true;
            if (col<7 && board[row-1][col+1] === "♟" ) return true;
        }
    }

    // Knight 

    const knightMoves = [
        [2,1] , [1, 2] , [-1, 2], [-2, 1] ,
        [-2, -1] , [-1, -2] , [1, -2] , [2, -1]
    ];
    const knightSymbol = byWhite ? "♘" : "♞";
    for (const [arow, acol] of knightMoves ) {
        const newRow = row + arow;
        const newCol = col + acol;
        if ((newRow >=0 && newRow <=7) && (newCol >=0 && newCol <=7)) {
            if (board[newRow][newCol] === knightSymbol ) {
                return true;
            }
        }
    }

    // Rook

    const rookSymbols = byWhite ? ["♖" , "♕"] : ["♜" , "♛"];
    for (let i = row + 1; i<=7 ; i++) {
        if (!rookSymbols.includes(board[i][col]) && board[i][col] == null) {
            continue;
        } 
        else if (!rookSymbols.includes(board[i][col])){
            break;
        }
        else {
            return true;
        }
    }
    for (let i = row - 1; i>=0 ; i--) {
        if (!rookSymbols.includes(board[i][col]) && board[i][col] == null) {
            continue;
        } 
        else if (!rookSymbols.includes(board[i][col])){
            break;
        }
        else {
            return true;
        }
    }
    for (let i = col + 1; i<=7 ; i++) {
        if (!rookSymbols.includes(board[row][i]) && board[row][i] == null) {
            continue;
        } 
        else if (!rookSymbols.includes(board[row][i])){
            break;
        }
        else {
            return true;
        }
    }
    for (let i = col-1; i>=0 ; i--) {
        if (!rookSymbols.includes(board[row][i]) && board[row][i] == null) {
            continue;
        } 
        else if (!rookSymbols.includes(board[row][i])){
            break;
        }
        else {
            return true;
        }
    }

    // Bishop

    const bishopSymbols = byWhite ? ["♗","♕"]:["♝","♛"];
    const directions = [[1,1], [1,-1], [-1, 1], [-1,-1]];
    for (const [arow, acol] of directions) {
        let newRow = row + arow;
        let newCol = col + acol;
        while (newRow>=0 && newRow<=7 && newCol>=0 && newCol<=7){
            if (board[newRow][newCol]==null) {
                newRow += arow;
                newCol += acol;
                continue;
            }
            if (bishopSymbols.includes(board[newRow][newCol])) return true;
            break;
        }
    }

    // King

    const kingSymbol = byWhite ? "♔" : "♚";
    for (let drow = -1; drow<=1 ; drow++) {
        for (let dcol = -1; dcol<=1; dcol ++) {
            if (drow==0 && dcol==0) continue;
            const newRow = row+drow;
            const newCol = row+dcol;
            if (newRow>=0 && newRow<=7 && newCol>=0 && newCol<=7) {
                if (kingSymbol == board[newRow][newCol]) return true;
            }
        }
    }
    return false;
}

function isInCheck(board, isWhiteKing) {
    let kingPos = findKing(board, isWhiteKing);
    if (!kingPos) return false;

    return isSquareUnderAttack(board, kingPos[0], kingPos[1], !isWhiteKing);
}

function isLegalMove(board, fromRow, fromCol, toRow, toCol) {
    const piece = board[fromRow][fromCol];
    if (!piece) return false;
    
    const tempBoard = board.map(row => [...row]);

    tempBoard[toRow][toCol] = piece;
    tempBoard[fromRow][fromCol] = null;

    const isWhitePiece = piece.charCodeAt(0) < 9818;
    return !isInCheck(tempBoard, isWhitePiece);
    
}

function isCheckMate(board, isWhiteKing) {
    if (!isInCheck(board, isWhiteKing)) return false;
    
    for (let fromRow = 0; fromRow < 8; fromRow++) {
        for (let fromCol = 0; fromCol < 8; fromCol++) {
            const piece = board[fromRow][fromCol];
            if (!piece) continue;
            
            const isWhitePiece = piece.charCodeAt(0) < 9818;
            if (isWhitePiece !== isWhiteKing) continue;
            
            for (let toRow = 0; toRow < 8; toRow++) {
                for (let toCol = 0; toCol < 8; toCol++) {
                    if (fromRow === toRow && fromCol === toCol) continue;
                    
                    let isValidMove = false;
                    
                    switch(piece) {
                        case '♙': isValidMove = isValidWhitePawnMove(board, fromRow, fromCol, toRow, toCol); break;
                        case '♖': isValidMove = isValidWhiteRookMove(board, fromRow, fromCol, toRow, toCol); break;
                        case '♗': isValidMove = isValidWhiteBishMove(board, fromRow, fromCol, toRow, toCol); break;
                        case '♘': isValidMove = isValidWhiteKnightMove(board, fromRow, fromCol, toRow, toCol); break;
                        case '♕': isValidMove = isValidWhiteRookMove(board, fromRow, fromCol, toRow, toCol) || 
                                               isValidWhiteBishMove(board, fromRow, fromCol, toRow, toCol); break;
                        case '♔': isValidMove = isValidWhiteKingMove(board, fromRow, fromCol, toRow, toCol); break;
                        case '♟': isValidMove = isValidBlackPawnMove(board, fromRow, fromCol, toRow, toCol); break;
                        case '♜': isValidMove = isValidBlackRookMove(board, fromRow, fromCol, toRow, toCol); break;
                        case '♝': isValidMove = isValidBlackBishMove(board, fromRow, fromCol, toRow, toCol); break;
                        case '♞': isValidMove = isValidBlackKnightMove(board, fromRow, fromCol, toRow, toCol); break;
                        case '♛': isValidMove = isValidBlackRookMove(board, fromRow, fromCol, toRow, toCol) || 
                                               isValidBlackBishMove(board, fromRow, fromCol, toRow, toCol); break;
                        case '♚': isValidMove = isValidBlackKingMove(board, fromRow, fromCol, toRow, toCol); break;
                    }
                    
                    if (isValidMove) {
                        const tempBoard = board.map(row => [...row]);
                        tempBoard[toRow][toCol] = piece;
                        tempBoard[fromRow][fromCol] = null;
                        
                        if (!isInCheck(tempBoard, isWhiteKing)) {
                            return false;
                        }
                    }
                }
            }
        }
    }
    return true;
}

function isStaleMate(board, isWhiteTurn) {
    if (isInCheck(board, isWhiteTurn)) {
        return false;
    }
    for (let fromRow = 0; fromRow < 8; fromRow++) {
        for (let fromCol = 0; fromCol < 8 ; fromCol++) {
            let piece = board[fromRow][fromCol];
            if (!piece) continue;

            
            const isWhitePiece = piece.charCodeAt(0) < 9818;
            if (isWhitePiece != isWhiteTurn) continue;

            for (let toRow= 0; toRow <8; toRow++) {
                for (let toCol = 0; toCol<8; toCol++) {
                    if (fromRow === toRow && fromCol === toCol) continue;
                    
                    let isValidMove = false;
                    
                    switch(piece) {
                        case '♙': isValidMove = isValidWhitePawnMove(board, fromRow, fromCol, toRow, toCol); break;
                        case '♖': isValidMove = isValidWhiteRookMove(board, fromRow, fromCol, toRow, toCol); break;
                        case '♗': isValidMove = isValidWhiteBishMove(board, fromRow, fromCol, toRow, toCol); break;
                        case '♘': isValidMove = isValidWhiteKnightMove(board, fromRow, fromCol, toRow, toCol); break;
                        case '♕': isValidMove = isValidWhiteRookMove(board, fromRow, fromCol, toRow, toCol) || 
                                               isValidWhiteBishMove(board, fromRow, fromCol, toRow, toCol); break;
                        case '♔': isValidMove = isValidWhiteKingMove(board, fromRow, fromCol, toRow, toCol); break;
                        case '♟': isValidMove = isValidBlackPawnMove(board, fromRow, fromCol, toRow, toCol); break;
                        case '♜': isValidMove = isValidBlackRookMove(board, fromRow, fromCol, toRow, toCol); break;
                        case '♝': isValidMove = isValidBlackBishMove(board, fromRow, fromCol, toRow, toCol); break;
                        case '♞': isValidMove = isValidBlackKnightMove(board, fromRow, fromCol, toRow, toCol); break;
                        case '♛': isValidMove = isValidBlackRookMove(board, fromRow, fromCol, toRow, toCol) || 
                                               isValidBlackBishMove(board, fromRow, fromCol, toRow, toCol); break;
                        case '♚': isValidMove = isValidBlackKingMove(board, fromRow, fromCol, toRow, toCol); break;
                    }

                    if (isValidMove) {
                        const tempBoard = board.map(row => [...row]);
                        tempBoard[toRow][toCol] = piece;
                        tempBoard[fromRow][fromCol] = null;

                        if (!isInCheck(tempBoard, isWhiteTurn)) {
                            return false;
                        }

                    }

                }
            }

        }
    }
    return true;
}


function choosePromotionPiece(isWhite, row, col) {
    const promotionPieces = isWhite ? document.getElementById("whitePromotionPieces") : document.getElementById("blackPromotionPieces");
    if (promotionPieces) {
        promotionPieces.classList.remove("hidden");  
        promotionPieces.style.top = isWhite ? 86 + "px" : 400 + "px";
        promotionPieces.style.left = 220+(col * 75) + "px";
    }
}

async function getBestMove(fen) {
    const url = `https://stockfish.online/api/s/v2.php?fen=${encodeURIComponent(fen)}&depth=12`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Legjobb lépés:", data.bestmove); 
        const array = data.bestmove.split(" ");
        let bestMove = array[1];
        return bestMove;
    } catch (error) {
        console.error("Hiba történt:", error);
    }
}

function boardToFEN(board) {
    let fen = "";
    
    for (let i = 0; i < 8; i++) {
        let emptyCount = 0;
        
        for (let j = 0; j < 8; j++) {
            let piece = board[i][j];
            
            if (!piece) {
                emptyCount++;
            } else {
                if (emptyCount > 0) {
                    fen += emptyCount;
                    emptyCount = 0;
                }

                switch (piece) {
                    case "♔": fen += "K"; break;
                    case "♕": fen += "Q"; break;
                    case "♖": fen += "R"; break;
                    case "♗": fen += "B"; break;
                    case "♘": fen += "N"; break;
                    case "♙": fen += "P"; break;
                    case "♚": fen += "k"; break;
                    case "♛": fen += "q"; break;
                    case "♜": fen += "r"; break;
                    case "♝": fen += "b"; break;
                    case "♞": fen += "n"; break;
                    case "♟": fen += "p"; break;
                }
            }
        }
        
        if (emptyCount > 0) fen += emptyCount;
        if (i < 7) fen += "/";
    }
    return fen + " b KQkq - 0 1";
}

function algebraToMatrix(move) {
    if (move.length !== 4) {
        return null;
    }

    let fromCol = move.charCodeAt(0) - 'a'.charCodeAt(0); 
    let fromRow = 8 - parseInt(move[1]);
    let toCol = move.charCodeAt(2) - 'a'.charCodeAt(0);
    let toRow = 8 - parseInt(move[3]);

    return [fromRow, fromCol, toRow, toCol];
}

async function botMove() {
    const tempBoard = board.map(row => [...row]); 

    await new Promise(r => setTimeout(r, 1000));
    let fen = boardToFEN(board);
    let bestMove = await getBestMove(fen);

    
    let allMoves = getAllValidMoves(board, false); 
    
    if (allMoves.length === 0) {
        if (isInCheck(board, false)) {
            popUp("mate", "white");    
        }
        else if (isStaleMate(board, false)) {
            popUp("draw", null);
        }
        return;
    }

    if (bestMove) {
        let bestFromRow = algebraToMatrix(bestMove)[0];
        let bestFromCol = algebraToMatrix(bestMove)[1];
        let bestToRow = algebraToMatrix(bestMove)[2];
        let bestToCol = algebraToMatrix(bestMove)[3];

        let capturedPiece = tempBoard[bestToRow][bestToCol];
        
        if (capturedPiece!==null && capturedPiece.charCodeAt(0)<9818) {
            blackHaveCaptured.push(capturedPiece);    
        }

        if (bestToRow == 7 && tempBoard[bestFromRow][bestFromCol] === "♟") {
            board[bestToRow][bestToCol] = "♛";
        }
        else {
            if (bestMove=="e8g8" || bestMove=="e8c8" ) {
                if (bestToCol==6) {
                    board[0][5] = "♜";
                    board[0][6] = "♚";
                    board[0][7] = null;
                }
                
                if (bestToCol==2) {
                    board[0][3] = "♜";
                    board[0][2] = "♚";
                    board[0][0] = null;
                }
            }
            else {
                board[bestToRow][bestToCol] = board[bestFromRow][bestFromCol];
            }
        }
        board[bestFromRow][bestFromCol] = null;
    }
    setCapturedDisplay();
    renderBoard();

    isWhiteTurn = true;

    if (isInCheck(board, true)) {
        if (isCheckMate(board, true)){
            if (true) {
                popUp("mate", "black");    
            }
        }
        else {
            checkAppears();
        }
    }
    else if (isStaleMate(board, isWhiteTurn)) {
        popUp("draw", null);
    }
}

chessboard.addEventListener("dragstart", (e) => {
    draggedPiece = e.target.textContent;
    fromRow = parseInt(e.target.dataset.row);
    fromCol = parseInt(e.target.dataset.col);

    e.target.classList.add("dragging");
});

// Dragover esemény (engedélyezi a drop-ot)
chessboard.addEventListener("dragover", (e) => {
    e.preventDefault();
});

let whiteKingMoved = false;
let whiteaRookMoved = false;
let whitehRookMoved = false;
let blackKingMoved = false;
let blackaRookMoved = false;
let blackhRookMoved = false;
let whiteaCastle = false;
let whitehCastle = false;
let blackaCastle = false;
let blackhCastle = false;
let whitePromotion = false;
let blackPromotion = false;




let isWhiteTurn = true;

function boardToString(board) {
    return JSON.stringify(board);
}

const dict = new Map();


chessboard.addEventListener("drop", (e) => {
    const tempBoard = board.map(row => [...row]);

    e.preventDefault();

    const toRow = parseInt(e.target.dataset.row);
    const toCol = parseInt(e.target.dataset.col);

    const isWhitePiece = draggedPiece.charCodeAt(0) < 9818;
    if (isWhitePiece !== isWhiteTurn) {
        invalidMove();
        return;
    }

    let isValidMove = false;    

    if (!isLegalMove(board, fromRow, fromCol, toRow, toCol)) {
        invalidMove();
        return;
    }

    if (draggedPiece === "♙") { 
        isValidMove = isValidWhitePawnMove(board, fromRow, fromCol, toRow, toCol);
        if (isValidWhitePawnMove(board, fromRow, fromCol, toRow, toCol) && toRow == 0) {
            whitePromotion = true;
        }
    } 
    else if (draggedPiece === "♟") {
        isValidMove = isValidBlackPawnMove(board, fromRow, fromCol, toRow, toCol);
        if (isValidBlackPawnMove(board, fromRow, fromCol, toRow, toCol) && toRow == 7) {
            blackPromotion = true;
        }
    }
    else if (draggedPiece === "♖") {
        isValidMove = isValidWhiteRookMove(board, fromRow, fromCol, toRow, toCol);
    }
    else if (draggedPiece === "♜") {
        isValidMove = isValidBlackRookMove(board, fromRow, fromCol, toRow, toCol);
    }
    else if (draggedPiece === "♗") {
        isValidMove = isValidWhiteBishMove(board, fromRow, fromCol, toRow, toCol);
    }
    else if (draggedPiece === "♝") {
        isValidMove = isValidBlackBishMove(board, fromRow, fromCol, toRow, toCol);
    }
    else if (draggedPiece === "♕") {
        isValidMove = (isValidWhiteBishMove(board, fromRow, fromCol, toRow, toCol) || isValidWhiteRookMove(board, fromRow, fromCol, toRow, toCol));
    }
    else if (draggedPiece === "♛") {
        isValidMove = (isValidBlackBishMove(board, fromRow, fromCol, toRow, toCol) || isValidBlackRookMove(board, fromRow, fromCol, toRow, toCol));  
    }
    else if (draggedPiece === "♘") {
        isValidMove = isValidWhiteKnightMove(board, fromRow, fromCol, toRow, toCol);
    }
    else if (draggedPiece === "♞") {
        isValidMove = isValidBlackKnightMove(board, fromRow, fromCol, toRow, toCol);
    }
    else if (draggedPiece === "♔") {
        if (whiteKingMoved == false && whiteaRookMoved == false && validWhiteaCastle(board) && toCol==2) {
            whiteaCastle = true;
            isValidMove = true;
        }
        else if (whiteKingMoved == false && whitehRookMoved == false && validWhitehCastle(board) && toCol==6) {
            whitehCastle = true;
            isValidMove = true;
        }
        else {
            isValidMove = isValidWhiteKingMove (board, fromRow, fromCol, toRow, toCol);    
        }
    }    
    else if (draggedPiece === "♚") {
        if (blackKingMoved == false && blackaRookMoved == false && validBlackaCastle(board) && toCol==2 ) {
            blackaCastle = true;
            isValidMove = true;
        }
        else if (blackKingMoved == false && blackhRookMoved == false && validBlackhCastle(board) && toCol==6) {
            blackhCastle = true;
            isValidMove = true;
        }
        else {
            isValidMove = isValidBlackKingMove (board, fromRow, fromCol, toRow, toCol);    
        }
    }


    if (isValidMove) {


        if (whiteaCastle) {
            board[toRow][toCol] = draggedPiece;
            board[7][3] = "♖"
            board[7][0] = null;
            board[fromRow][fromCol] = null;
            whiteaRookMoved = true;
            whiteKingMoved = true;
            whiteaCastle = false;
        }
    
        else if (whitehCastle) {
            board[toRow][toCol] = draggedPiece;
            board[7][5] = "♖";
            board[7][7] = null;
            board[fromRow][fromCol] = null;
            whitehRookMoved = true;
            whiteKingMoved = true;
            whitehCastle = false;

        }
        else if (blackaCastle) {
            board[toRow][toCol] = draggedPiece;
            board[0][3] = "♜"
            board[0][0] = null;
            board[fromRow][fromCol] = null;
            blackaRookMoved = true;
            blackKingMoved = true;
            blackaCastle = false;
        }
        else if (blackhCastle) {
            board[toRow][toCol] = draggedPiece;
            board[0][5] = "♜"
            board[0][7] = null;
            board[fromRow][fromCol] = null;
            blackhRookMoved = true;
            blackKingMoved = true;
            blackhCastle = false;
        }
        else if (whitePromotion) {
            choosePromotionPiece(true, toRow, toCol);
            document.getElementById("w_bishop").onclick = () => {
                board[toRow][toCol] = "♗";
                whitePromotion = false;
                document.getElementById("whitePromotionPieces").classList.add("hidden");
                renderBoard();

                if (!isWhiteTurn) {
                    botMove();
                }
            }
            document.getElementById("w_knight").onclick = () => {
                board[toRow][toCol] = "♘";
                whitePromotion = false;
                document.getElementById("whitePromotionPieces").classList.add("hidden");
                renderBoard();
                if (!isWhiteTurn) {
                    botMove();
                }
            }
            document.getElementById("w_rook").onclick = () => {
                board[toRow][toCol] = "♖";
                whitePromotion = false;
                document.getElementById("whitePromotionPieces").classList.add("hidden");
                renderBoard();
                if (!isWhiteTurn) {
                    botMove();
                }
            }
            document.getElementById("w_queen").onclick = () => {
                board[toRow][toCol] = "♕";
                whitePromotion = false;
                document.getElementById("whitePromotionPieces").classList.add("hidden");
                renderBoard();
                if (!isWhiteTurn) {
                    botMove();
                }
            }
            board[fromRow][fromCol] = null;
        }
        
        else if (blackPromotion) {
            choosePromotionPiece(false, toRow, toCol);
            document.getElementById("b_bishop").onclick = () => {
                board[toRow][toCol] = "♝";
                blackPromotion = false;
                document.getElementById("blackPromotionPieces").classList.add("hidden");
                renderBoard();
            }
            document.getElementById("b_knight").onclick = () => {
                board[toRow][toCol] = "♞";
                blackPromotion = false;
                document.getElementById("blackPromotionPieces").classList.add("hidden");
                renderBoard();
            }
            document.getElementById("b_rook").onclick = () => {
                board[toRow][toCol] = "♜";
                blackPromotion = false;
                document.getElementById("blackPromotionPieces").classList.add("hidden");
                renderBoard();
            }
            document.getElementById("b_queen").onclick = () => {
                board[toRow][toCol] = "♛";
                blackPromotion = false;
                document.getElementById("blackPromotionPieces").classList.add("hidden");
                renderBoard();
            }
            board[fromRow][fromCol] = null;
        }

        else {
            board[toRow][toCol] = draggedPiece;
            board[fromRow][fromCol] = null;

            if (fromRow == 7 && fromCol == 0) {
                whiteaRookMoved = true;
            }
            else if (fromRow == 7 && fromCol == 7) {
                whitehRookMoved = true;
            }
            else if (fromRow == 7 && fromCol == 4) {
                whiteKingMoved = true;
            }
            else if (fromRow == 0 && fromCol == 0) {
                blackaRookMoved = true;
            }
            else if (fromRow == 0 && fromCol == 7) {
                blackhRookMoved = true;
            }
            else if (fromRow == 0 && fromCol == 4) {
                blackKingMoved = true;
            }
        }

        let capturedPiece = tempBoard[toRow][toCol];
        
        if (capturedPiece!==null && isWhiteTurn) {
            whiteHaveCaptured.push(capturedPiece);    
        }

        isWhiteTurn = !isWhiteTurn;
        

        renderBoard();

        if (!isWhiteTurn && !whitePromotion && !blackPromotion) {
            botMove();
        }
        
        setCapturedDisplay();

        if (isInCheck(board, isWhiteTurn)) {
            if (isCheckMate(board, isWhiteTurn)){
                if (!isWhiteTurn) {
                    popUp("mate", "white");    
                }
                else {
                    popUp("mate", "black");
                }
            }
            else {
                checkAppears();
            }
        }
        else if (isStaleMate(board, isWhiteTurn)) {
            popUp("draw", null);
        }

        const boardKey = boardToString(board);

        if (!dict.has(boardKey)) {
            dict.set(boardKey, 1);
        }
        else {
            if (dict.get(boardKey)==1){
                dict.set(boardKey, 2);
            }
            else if (dict.get(boardKey)==2){
                popUp("draw", null);
            }
        }

    }

    else {
        invalidMove();
    }
    
    draggedPiece = null;
    fromRow = null;
    fromCol = null;
});

chessboard.addEventListener("dragend", (e) => {
    e.target.classList.remove("dragging");
});

renderBoard();

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
    document.body.classList.toggle("light-mode");
    document.getElementById("modal-popup").classList.toggle("light-mode");
    document.getElementById("content").classList.toggle("light-mode");
    document.getElementById("white-capture-container").classList.toggle("light-mode");
    document.getElementById("black-capture-container").classList.toggle("light-mode");
};

