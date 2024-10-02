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

Bishop.prototype.isValidPosition = function(targetPosition, board) {
    var currentRow = parseInt(this.position[1], 10);
    var targetRow = parseInt(targetPosition.row, 10);
    var currentCol = this.position[0].toUpperCase();
    var targetCol = targetPosition.col.toUpperCase();

    console.log(`Checking move from ${currentCol}${currentRow} to ${targetCol}${targetRow}`);

    if (Math.abs(currentRow - targetRow) !== Math.abs(currentCol.charCodeAt(0) - targetCol.charCodeAt(0))) {
        console.log("Invalid move: Bishop must move diagonally");
        return false;
    }
    
    var rowStep = targetRow > currentRow ? 1 : -1;
    var colStep = targetCol.charCodeAt(0) > currentCol.charCodeAt(0) ? 1 : -1;
    
    var currentCheckRow = currentRow + rowStep;
    var currentCheckCol = currentCol.charCodeAt(0) + colStep;

    while (currentCheckRow !== targetRow && currentCheckCol !== targetCol.charCodeAt(0)) {
        var intermediatePosition = {
            row: currentCheckRow.toString(),
            col: String.fromCharCode(currentCheckCol)
        };

        if (board.getPieceAt(intermediatePosition)) {
            console.log(`Path blocked at ${intermediatePosition.col}${intermediatePosition.row}`);
            return false;
        }

        currentCheckRow += rowStep;
        currentCheckCol += colStep;
    }
    
    console.log("Move is valid");
    return true;
};

