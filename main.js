
var cvs = document.getElementById("game-board");
var ctx = cvs.getContext("2d");
var scoreElement = document.getElementById("score");
var score = 0;
var VACANT = "white";
var gridSq = 20;

/**
 * setting canvas parameters
 */
var setCanvasParameters = function(){
    this.cvs.width = 200;
    this.cvs.height = 400;
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = "black";
}

var drawRect = function(x, y, w, h, color) {
    this.ctx.fillStyle=color;
    this.ctx.fillRect(x,y,w,h);
    this.ctx.strokeRect(x,y,w,h);
};

var drawBoard = function() {
    this.ctx.strokeStyle = "black";
    var rows = 20; var cols = 10;

    for(var i=0; i< cols; i++ ) {
        for(var j=0; j < rows; j++) {
            this.drawRect(gridSq*i, gridSq*j, gridSq, gridSq, VACANT);
        }
    }
};

var updateScore = function() {
    this.scoreElement.innerHTML = score;
};


var init = function() {
    this.setCanvasParameters();
    this.updateScore();
    this.drawBoard();

    var piece = new Piece(this.ctx, this.z, 3, this.z.start);

    document.addEventListener("keydown", function(e){
        if(e.keyCode == 37){
            piece.moveLeft();
        }else if(e.keyCode == 38) {
            piece.rotate();
        }else if(e.keyCode == 39) {
            piece.moveRight();
        }else if(e.keyCode == 40) {
            piece.moveDown();
        }
    });

}

init();

class GameBoard {
    constructor(ctx) {
        this.ctx = ctx;
    }

    activatePiece(piece) {
        this.piece = piece;
    }

    hitLeftWall() {
        
    }
}