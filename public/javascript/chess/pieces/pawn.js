var Pawn = function(config){
    this.type = 'pawn';
    this.constructor(config);
};



Pawn.prototype = new Piece({});

Pawn.prototype.isValidPosition = function(targetPosition, board){
    let rows = "12345678";
    let cols = "ABCDEFGH";

    let row = targetPosition.row;
    let col = targetPosition.col;

    let yDiff = rows.indexOf(row) - rows.indexOf(this.position[1]);
    let xDiff = cols.indexOf(col) - cols.indexOf(this.position[0]);

    let yDist = Math.abs(yDiff);
    let yDir = Math.sign(yDiff);

    let xDist = Math.abs(xDiff);

    if (yDir == 0) {
        return false;
    }

    if (this.isColor(COLOR.WHITE) && yDir < 0) {
        return false;
    }

    if (this.isColor(COLOR.BLACK) && yDir > 0) {
        return false;
    }

    if (yDist > 2) {
        return false;
    }

    if (this.isColor(COLOR.WHITE) && this.position[1] != "2" && yDist >= 2) {
        return false;
    }

    if (this.isColor(COLOR.BLACK) && this.position[1] != "7" && yDist >= 2) {
        return false;
    }

    let blockingPiece = board.getPieceAt({
        row: row,
        col: col
    });

    if (xDist == 0 && !blockingPiece) {
        let cellPosition = {
            row: (Number(row) + yDir) + '',
            col: col
        };

        if (yDist == 2 && this.isValidPosition(cellPosition)) {
            return false;
        }

        return true;
    }

    if (xDist == 1 && yDist == 1 && blockingPiece && !blockingPiece.isColor(this.color)) {
        return true;
    }

    return false;
}

Pawn.prototype.moveTo = function(targetPosition, board){    
    if(!this.isValidPosition(targetPosition, board)){
        console.warn("Invalid move for pawn");
        return;
    }

    this.position = targetPosition.col + targetPosition.row;
    this.render();
}