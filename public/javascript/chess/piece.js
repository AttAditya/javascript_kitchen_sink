var livingStates = {
    ALIVE: "living",
    DEAD: "dead"
}

var Piece = function(config){
    this.position = config.position;
    this.color = config.color;
    this.livingState = livingStates.ALIVE;

    if(this.position){
        this.render();        
    }    
}
Piece.prototype.moveTo = function(targetPosition){
    console.log("Method not implemeted by: " + this.type);
}


Piece.prototype.attachListeners = function(){
    //To be implemented
}

Piece.prototype.clearGhost = function() {
    // Remove the existing piece element from the DOM if it exists
    if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
    }

    this.$el = null;
}

Piece.prototype.render = function(){
    this.clearGhost();

    if (this.livingState == livingStates.DEAD) {
        return;
    }

    var col = this.position[0];
    var row = this.position[1];

    // Find the li element with matching data-col and data-row attributes
    var element = document.querySelector(`[data-col="${col}"] [data-row="${row}"]`);
    if (!element) {
        console.warn(`Element not found for position: ${this.position}`);
    }

    // Create a new div element to represent the piece
    // Add classes to the new element for styling
    // Clear any existing content in the cell
    var pieceElement = document.createElement('div');
    pieceElement.classList.add('piece', this.color, this.type);
    element.innerHTML = '';
    
    // Append the new piece element to the cell
    element.appendChild(pieceElement);
    this.$el = pieceElement;
    this.attachListeners();
}

Piece.prototype.kill = function(targetPiece){
    console.log("Method not implemeted by: " + typeof(this));
}

Piece.prototype.isColor = function(checkColor) {
    return this.color == checkColor;
}

