function isValidWhitePawnMove(board, fromRow, fromCol, toRow, toCol){
    const isForwardOne = toRow === fromRow -1 && fromCol === toCol;

    const isForwardTwo = fromRow=== 6 && toRow === fromRow - 2 && fromCol === toCol;

    const isDiagonalCapture = toRow === fromRow-1 &&
                                (toCol === fromCol-1 || toCol === fromCol+1) &&
                                board[toRow][toCol]!=null && 
                                board[toRow][toCol].charCodeAt(0)>=9818;
    
    const isTargetEmpty = board[toRow][toCol] === null

    if ((isForwardOne || isForwardTwo) && isTargetEmpty) {
        if (isForwardTwo){
            const middleRow = toRow + 1
            return board[middleRow][toCol] === null
        }
        return true;
    }

    if (isDiagonalCapture) {
        return true;
    }

    return false;
}

function isValidBlackPawnMove(board, fromRow, fromCol, toRow, toCol){
    const isForwardOne = toRow === fromRow +1 && fromCol === toCol;

    const isForwardTwo = fromRow=== 1 && toRow === fromRow + 2 && fromCol === toCol;

    const isDiagonalCapture = toRow === fromRow+1 &&
                                (toCol === fromCol-1 || toCol === fromCol+1) &&
                                board[toRow][toCol]!=null && 
                                board[toRow][toCol].charCodeAt(0)<9818;
    
    const isTargetEmpty = board[toRow][toCol] === null

    if ((isForwardOne || isForwardTwo) && isTargetEmpty) {
        if (isForwardTwo){
            const middleRow = toRow - 1
            return board[middleRow][toCol] === null
        }
        return true;
    }

    if (isDiagonalCapture) {
        return true;
    }

    return false;
}

function isValidWhiteRookMove(board, fromRow, fromCol, toRow, toCol){
    let possibleMoves = [];
    
    if (fromRow === toRow) {
        for (let i = fromCol + 1; i<=7; i++) {
            if (board[fromRow][i]===null) {
                possibleMoves.push([fromRow, i]);
            }
            else if (board[fromRow][i].charCodeAt(0)>=9818) {
                possibleMoves.push([fromRow, i]);
                break;
            }
            else {
                break;
            }
        }
        for (let i = fromCol - 1; i>=0; i--){
            if (board[fromRow][i]===null) {
                possibleMoves.push([fromRow, i]);
            }
            else if (board[fromRow][i].charCodeAt(0)>=9818) {
                possibleMoves.push([fromRow, i]);
                break;
            }
            else {
                break;
            } 
        }
    }

    if (fromCol === toCol) {
        for (let i = fromRow + 1; i<=7; i++) {
            if (board[i][fromCol]===null) {
                possibleMoves.push([i, fromCol]);
            }
            else if (board[i][fromCol].charCodeAt(0)>=9818) {
                possibleMoves.push([i, fromCol]);
                break;
            }
            else {
                break;
            }
        }
        for (let i = fromRow - 1; i>=0; i--) {
            if (board[i][fromCol]===null) {
                possibleMoves.push([i, fromCol]);
            }
            else if (board[i][fromCol].charCodeAt(0)>=9818) {
                possibleMoves.push([i, fromCol]);
                break;
            }
            else {
                break;
            }
        }
    }

    const including = possibleMoves.some(([row, col]) => row === toRow && col === toCol);
    return including;
}

function isValidBlackRookMove(board, fromRow, fromCol, toRow, toCol){
    let possibleMoves = [];
    
    if (fromRow === toRow) {
        for (let i = fromCol + 1; i<=7; i++) {
            if (board[fromRow][i]===null) {
                possibleMoves.push([fromRow, i]);
            }
            else if (board[fromRow][i].charCodeAt(0)<9818) {
                possibleMoves.push([fromRow, i]);
                break;
            }
            else {
                break;
            }
        }
        for (let i = fromCol - 1; i>=0; i--){
            if (board[fromRow][i]===null) {
                possibleMoves.push([fromRow, i]);
            }
            else if (board[fromRow][i].charCodeAt(0)<9818) {
                possibleMoves.push([fromRow, i]);
                break;
            }
            else {
                break;
            } 
        }
    }

    if (fromCol === toCol) {
        for (let i = fromRow + 1; i<=7; i++) {
            if (board[i][fromCol]===null) {
                possibleMoves.push([i, fromCol]);
            }
            else if (board[i][fromCol].charCodeAt(0)<9818) {
                possibleMoves.push([i, fromCol]);
                break;
            }
            else {
                break;
            }
        }
        for (let i = fromRow - 1; i>=0; i--) {
            if (board[i][fromCol]===null) {
                possibleMoves.push([i, fromCol]);
            }
            else if (board[i][fromCol].charCodeAt(0)<9818) {
                possibleMoves.push([i, fromCol]);
                break;
            }
            else {
                break;
            }
        }
    }

    const including = possibleMoves.some(([row, col]) => row === toRow && col === toCol);
    return including;
}

function isValidWhiteBishMove (board, fromRow, fromCol, toRow, toCol) {
    let possibleMoves = [];

    let i = fromRow;
    let j = fromCol;
    while (i>=0 && j<=7) {
        if (board[i][j]==null) {
            possibleMoves.push([i, j]);
        }
        else if (board[i][j].charCodeAt(0)>=9818){
            possibleMoves.push([i, j]);
            break;
        }
        else if (board[i][j] != "♗" && board[i][j]!= "♕") {
            break
        }
        i--;
        j++;
    }

    i = fromRow;
    j = fromCol;
    while (i>=0 && j>=0) {
        if (board[i][j]==null) {
            possibleMoves.push([i, j]);
        }
        else if (board[i][j].charCodeAt(0)>=9818){
            possibleMoves.push([i, j]);
            break;
        }
        else if (board[i][j] != "♗" && board[i][j]!= "♕") {
            break
        }
        i--;
        j--;
    }

    i = fromRow;
    j = fromCol;
    while (i<=7 && j>=0) {
        if (board[i][j]==null) {
            possibleMoves.push([i, j]);
        }
        else if (board[i][j].charCodeAt(0)>=9818){
            possibleMoves.push([i, j]);
            break;
        }
        else if (board[i][j] != "♗" && board[i][j]!= "♕") {
            break
        }
        i++;
        j--;
    }

    i = fromRow;
    j = fromCol;
    while (i<=7 && j<=7) {
        if (board[i][j]==null) {
            possibleMoves.push([i, j]);
        }
        else if (board[i][j].charCodeAt(0)>=9818){
            possibleMoves.push([i, j]);
            break;
        }
        else if (board[i][j] != "♗" && board[i][j]!= "♕") {
            break
        }
        i++;
        j++;
    }

    const including = possibleMoves.some(([row, col]) => row === toRow && col === toCol);
    return including;
}

function isValidBlackBishMove (board, fromRow, fromCol, toRow, toCol) {
    let possibleMoves = [];

    let i = fromRow;
    let j = fromCol;
    while (i>=0 && j<=7) {
        if (board[i][j]==null) {
            possibleMoves.push([i, j]);
        }
        else if (board[i][j].charCodeAt(0)<9818){
            possibleMoves.push([i, j]);
            break;
        }
        else if (board[i][j] != "♝" && board[i][j]!= "♛") {
            break
        }
        i--;
        j++;
    }

    i = fromRow;
    j = fromCol;
    while (i>=0 && j>=0) {
        if (board[i][j]==null) {
            possibleMoves.push([i, j]);
        }
        else if (board[i][j].charCodeAt(0)<9818){
            possibleMoves.push([i, j]);
            break;
        }
        else if (board[i][j] != "♝" && board[i][j]!= "♛") {
            break
        }
        i--;
        j--;
    }

    i = fromRow;
    j = fromCol;
    while (i<=7 && j>=0) {
        if (board[i][j]==null) {
            possibleMoves.push([i, j]);
        }
        else if (board[i][j].charCodeAt(0)<9818){
            possibleMoves.push([i, j]);
            break;
        }
        else if (board[i][j] != "♝" && board[i][j]!= "♛") {
            break
        }
        i++;
        j--;
    }

    i = fromRow;
    j = fromCol;
    while (i<=7 && j<=7) {
        if (board[i][j]==null) {
            possibleMoves.push([i, j]);
        }
        else if (board[i][j].charCodeAt(0)<9818){
            possibleMoves.push([i, j]);
            break;
        }
        else if (board[i][j] != "♝" && board[i][j]!= "♛") {
            break
        }
        i++;
        j++;
    }

    const including = possibleMoves.some(([row, col]) => row === toRow && col === toCol);
    return including;
}

function isValidWhiteKnightMove (board, fromRow, fromCol, toRow, toCol) {
    let allKnightMoves = [];
    let i = fromRow;
    let j = fromCol;
    i-=2; j+=1; allKnightMoves.push([i, j]);
    i+=1; j+=1; allKnightMoves.push([i, j]);
    i+=2; j+=0; allKnightMoves.push([i, j]);
    i+=1; j-=1; allKnightMoves.push([i, j]);
    i+=0; j-=2; allKnightMoves.push([i, j]);
    i-=1; j-=1; allKnightMoves.push([i, j]);
    i-=2; j+=0; allKnightMoves.push([i, j]);
    i-=1; j+=1; allKnightMoves.push([i, j]);
    for (let k=0; k<8; k++) {
        if ((allKnightMoves[k][0]>=0 && allKnightMoves[k][0]<=7) && 
        (allKnightMoves[k][1]>=0 && allKnightMoves[k][1]<=7) &&
         (board[allKnightMoves[k][0]][allKnightMoves[k][1]]==null || board[allKnightMoves[k][0]][allKnightMoves[k][1]].charCodeAt(0)>=9818)) {
            if (allKnightMoves[k][0]==toRow && allKnightMoves[k][1]==toCol) {
                return true;
            }
        }
    }
    return false;   
}

function isValidBlackKnightMove (board, fromRow, fromCol, toRow, toCol) {
    let allKnightMoves = [];
    let i = fromRow;
    let j = fromCol;
    i-=2; j+=1; allKnightMoves.push([i, j]);
    i+=1; j+=1; allKnightMoves.push([i, j]);
    i+=2; j+=0; allKnightMoves.push([i, j]);
    i+=1; j-=1; allKnightMoves.push([i, j]);
    i+=0; j-=2; allKnightMoves.push([i, j]);
    i-=1; j-=1; allKnightMoves.push([i, j]);
    i-=2; j+=0; allKnightMoves.push([i, j]);
    i-=1; j+=1; allKnightMoves.push([i, j]);
    for (let k=0; k<8; k++) {
        if ((allKnightMoves[k][0]>=0 && allKnightMoves[k][0]<=7) && 
        (allKnightMoves[k][1]>=0 && allKnightMoves[k][1]<=7) &&
         (board[allKnightMoves[k][0]][allKnightMoves[k][1]]==null || board[allKnightMoves[k][0]][allKnightMoves[k][1]].charCodeAt(0)<9818)) {
            if (allKnightMoves[k][0]==toRow && allKnightMoves[k][1]==toCol) {
                return true;
            }
        }
    }
    return false;
}

function isValidWhiteKingMove (board, fromRow, fromCol, toRow, toCol) {
    if ((fromRow-1 == toRow || fromRow+1 == toRow || fromRow == toRow) && 
    (fromCol-1==toCol || fromCol+1 == toCol || fromCol == toCol) &&
    (board[toRow][toCol]==null || board[toRow][toCol].charCodeAt(0)>=9818)) {
        return true;
    }
    return false;
}

function isValidBlackKingMove (board, fromRow, fromCol, toRow, toCol) {
    if ((fromRow-1 == toRow || fromRow+1 == toRow || fromRow == toRow) && 
    (fromCol-1==toCol || fromCol+1 == toCol || fromCol == toCol) &&
    (board[toRow][toCol]==null || board[toRow][toCol].charCodeAt(0)<9818)) {
        return true;
    }
    return false;
}

function validWhiteaCastle (board) {
    if (board[7][1] == null && board[7][2] == null && board[7][3] == null) {
        return true;
    }
    return false;
}

function validWhitehCastle (board) {
    if (board[7][5] == null && board[7][6] == null) {
        return true;
    }
    return false;
}

function validBlackaCastle (board) {
    if (board[0][1] == null && board[0][2] == null && board[0][3] == null) {
        return true;
    }
    return false;
}

function validBlackhCastle (board) {
    if (board[0][5] == null && board[0][6] == null) {
        return true;
    }
    return false;
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

function getAllValidMoves(board, isWhiteTurn) {
    let moves = [];

    for (let fromRow = 0; fromRow <8; fromRow++) {
        for (let fromCol = 0; fromCol<8; fromCol++) {
            let piece = board[fromRow][fromCol];
            if (!piece) continue;

            let isWhitePiece = piece.charCodeAt(0)<9818;
            if (isWhitePiece != isWhiteTurn ) continue;

            for (let toRow = 0; toRow < 8; toRow++) {
                for (let toCol = 0; toCol < 8; toCol++) {
                    if (fromRow === toRow && fromCol === toCol) continue;

                    let isValidMove = false;
                    switch (piece) {
                        case '♟': isValidMove = isValidBlackPawnMove(board, fromRow, fromCol, toRow, toCol); break;
                        case '♜': isValidMove = isValidBlackRookMove(board, fromRow, fromCol, toRow, toCol); break;
                        case '♝': isValidMove = isValidBlackBishMove(board, fromRow, fromCol, toRow, toCol); break;
                        case '♞': isValidMove = isValidBlackKnightMove(board, fromRow, fromCol, toRow, toCol); break;
                        case '♛': isValidMove = isValidBlackRookMove(board, fromRow, fromCol, toRow, toCol) || isValidBlackBishMove(board, fromRow, fromCol, toRow, toCol); break;
                        case '♚': isValidMove = isValidBlackKingMove(board, fromRow, fromCol, toRow, toCol); break;
                    }

                    if (isValidMove && isLegalMove(board, fromRow, fromCol, toRow, toCol)) {
                        moves.push([fromRow, fromCol, toRow, toCol]);
                    }
                }
            }
        }
    }

    return moves;
}

export { isValidWhitePawnMove, isValidBlackPawnMove, isValidWhiteBishMove, isValidBlackBishMove, 
    isValidWhiteKnightMove, isValidBlackKnightMove, isValidWhiteRookMove, isValidBlackRookMove,
    isValidWhiteKingMove, isValidBlackKingMove, validWhiteaCastle, validWhitehCastle,
    validBlackaCastle, validBlackhCastle, getAllValidMoves
 };