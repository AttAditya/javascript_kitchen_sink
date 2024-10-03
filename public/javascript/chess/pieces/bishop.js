var Bishop = function(config){
    this.type = 'bishop';
    this.constructor(config);
};

Bishop.prototype = new Piece({});

Bishop.prototype.moveTo = function(targetPosition, board){
    console.log(`Attempting to move bishop from ${this.position} to ${targetPosition.col}${targetPosition.row}`);
    
    var isValidMove = this.isValidPosition(targetPosition, board);
    if (!isValidMove) {
        console.warn("Invalid move for bishop");
        return;
    }
    
    var newPos = targetPosition.col + targetPosition.row;
    
    this.position = newPos;
    this.render();

    console.log(`Bishop successfully moved to ${this.position}`);
}

Bishop.prototype.isValidPosition = function(targetPosition, board){
    let rows = "12345678";
    let cols = "ABCDEFGH";

    let row = targetPosition.row;
    let col = targetPosition.col;

    let yDiff = rows.indexOf(row) - rows.indexOf(this.position[1]);
    let xDiff = cols.indexOf(col) - cols.indexOf(this.position[0]);

    let yDist = Math.abs(yDiff);
    let yDir = Math.sign(yDiff);
    
    let xDist = Math.abs(xDiff);
    let xDir = Math.sign(xDiff);

    if (yDir == 0) {
        return false;
    }

    if (xDir == 0) {
        return false;
    }

    if (xDist != yDist) {
        return false;
    }

    let blockingPiece = board.getPieceAt({
        row: row,
        col: col
    });

    if (blockingPiece && blockingPiece.isColor(this.color)) {
        return false;
    }

    let previousRow = rows[rows.indexOf(row) - yDir];
    let previousCol = cols[cols.indexOf(col) - xDir];

    if (previousCol + previousRow == this.position) {
        return true;
    }

    let previousCellPos = {
        row: previousRow,
        col: previousCol
    }

    let previousPiece = board.getPieceAt(previousCellPos);

    if (previousPiece) {
        return false;
    }

    if (!this.isValidPosition(previousCellPos, board)) {
        return false;
    }

    return true;
}

