
var cvs = document.getElementById("game-board");
var ctx = cvs.getContext("2d");
var scoreElement = document.getElementById("score");
var score = 0;
var VACANT = "white";
var gridSq = 20;

var globalGameBoard = undefined;

var requestAnimationFrame = window.requestAnimationFrame || 
                            window.webkitRequestAnimationFrame ||
                            window.mozRequestAnimationFrame || 
                            window.msRequestAnimationFrame;

var pieces = [
                this.i,
                this.j,
                this.l,
                this.o,
                this.s,
                this.t,
                this.z];

/**
 * setting canvas parameters
 */
var setCanvasParameters = function(){
    this.cvs.width = 200;
    this.cvs.height = 400;
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = "black";
}

var randomPieceGenerator = function(){
    var next = this.pieces[Math.round(Math.random(0, this.pieces.length-1))];
    var piece = new Piece(this.ctx, next, 3, next.start);
    return piece;
};

var frame = function() {
    var next = undefined;

    if(!this.globalGameBoard.isGameOver) {
        debugger;
        if(this.globalGameBoard.piece == undefined) {
            next = this.pieces[Math.round(Math.random(0, this.pieces.length-1))];
            var nextPiece = new Piece(this.ctx, next, 3, next.start);
            this.globalGameBoard.activatePiece(nextPiece);
        }
        
        this.globalGameBoard.pieceMovement(40);
        setTimeout(function(){
            this.requestAnimationFrame(this.frame);
        }, 1000);
    } else {
        alert("Game Over");
    }
}


var init = function() {

    this.setCanvasParameters();
    var gb = new GameBoard(this.ctx, this.scoreElement);
    gb.drawBoard();

    gb.activatePiece(this.randomPieceGenerator());

    document.addEventListener("keydown", function(e){
        gb.pieceUserEvent(e);
    });

    this.globalGameBoard = gb;

    this.frame();

};

init();

