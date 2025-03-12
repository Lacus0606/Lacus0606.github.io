function evaluation(board) {
    let whitePieces = {
        "♕" : 90,   "♖" : 50, 
        "♘" : 30,   "♗" : 30,
        "♙" : 10,   "♔" : 2000
    };
    let blackPieces = {
        "♛": 90,    "♜" : 50, 
        "♞": 30,    "♝" : 30,
        "♟": 10,    "♚" : 2000
    };

    let rookValues = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [5, 10, 10, 10, 10, 10, 10, 5],
        [-5, 0, 0, 0, 0, 0, 0, -5],
        [-5, 0, 0, 0, 0, 0, 0, -5],
        [-5, 0, 0, 0, 0, 0, 0, -5],
        [-5, 0, 0, 0, 0, 0, 0, -5],
        [-5, 0, 0, 0, 0, 0, 0, -5],
        [0, 0, 0, 5, 5, 0, 0, 0]
    ];

    let knightValues = [
        [-5, 0, 0, 0, 0, 0, 0, -5],
        [-5, 0, 0, 10, 10, 0, 0, -5],
        [-5, 5, 4, 8, 8, 4, 2, -5],
        [-5, 10, 20, 30, 30, 20, 10, -5],
        [-5, 10, 20, 30, 30, 20, 10, -5],
        [-5, 5, 20, 10, 10, 20, 5, -5],
        [-5, 0, 0, 0, 0, 0, 0, -5],
        [-5, -10, 0, 0, 0, 0, -10, -5],
    ];

    let bishopValues = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 10, 10, 0, 0, 0],
        [0, 0, 10, 20, 20, 10, 0, 0],
        [0, 0, 10, 20, 20, 10, 0, 0],
        [0, 10, 0, 0, 0, 0, 10, 0],
        [0, 10, 0, 0, 0, 0, 10, 0],
        [0, 0, -10, 0, 0, -10, 0, 0],
    ];

    let pawnValues = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [50, 50, 50, 50, 50, 50, 50, 50],
        [10, 10, 20, 30, 30, 20, 10, 10],
        [5, 5, 10, 25, 25, 10, 5, 5],
        [0, 0, 0, 20, 20, 0, 0, 0],
        [5, -5, -10, 0, 0, -10, -5, 5],
        [5, 10, 10, -20, -20, 10, 10, 5],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ];

    let whiteEval = 0;
    let blackEval = 0;

    for (let i = 0; i< 8; i++ ) {
        for (let j = 0; j<8; j++) {
            if (board[i][j]!=null) {
                if (board[i][j].charCodeAt(0) < 9818 ) {
                    if (board[i][j]== "♘") {
                        whiteEval += knightValues[i][j];
                    }
                    else if (board[i][j] == "♖") {
                        whiteEval += rookValues[i][j];
                    }
                    else if (board[i][j] == "♙") {
                        whiteEval += pawnValues[i][j];
                    }
                    else if (board[i][j] == "♗") {
                        whiteEval += bishopValues[i][j];
                    }
                    else if (board[i][j] == "♕") {
                        whiteEval += bishopValues[i][j];
                        whiteEval += rookValues[i][j];
                    }
                    whiteEval+= whitePieces[board[i][j]];
                }
                else {
                    if (board[i][j]== "♞") {
                        blackEval += knightValues[i][j];
                    }
                    else if (board[i][j] == "♜") {
                        blackEval += rookValues[7-i][j];
                    }
                    else if (board[i][j] == "♟") {
                        blackEval += pawnValues[7-i][j]; 
                    }
                    else if(board[i][j] == "♝") {
                        blackEval += bishopValues[7-i][j];
                    }
                    else if (board[i][j] == "♛") {
                        blackEval += bishopValues[7-i][j];
                        blackEval += rookValues[7-i][j];
                    }
                    blackEval+= blackPieces[board[i][j]];
                }
            }
        }
    }
    return blackEval - whiteEval;
}

export { evaluation };