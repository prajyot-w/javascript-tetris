
/**
 * @author Prajyot Walali
 * @date 6th September, 2018
 * GITHUB :: github.com/prajyot-w
 */

var cvs = document.getElementById("game-board");
var ctx = cvs.getContext("2d");
var scoreElement = document.getElementById("score");

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
                this.z
            ];

var tmpPieces = JSON.parse(JSON.stringify(pieces));

/**
 * Setting canvas parameters to draw perfect lines on 
 * canvas.
 */
var setCanvasParameters = function(){
    this.cvs.width = 200;
    this.cvs.height = 400;
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = "black";
}

/**
 * Generates random piece and make's sure
 * all types of pieces are generated at least once.
 */
var randomPieceGenerator = function(){
    var next = undefined;

    if(this.tmpPieces.length == 1) {
        next = this.tmpPieces[0];
        this.tmpPieces = JSON.parse(JSON.stringify(this.pieces));
    } else {
        var randomN = Math.round(Math.random(0, this.pieces.length-1));
        next = this.tmpPieces[randomN];
        this.tmpPieces.splice(randomN,1);
    }
    
    var piece = new Piece(this.ctx, next, 3, next.start);
    
    return piece;
};

/**
 * Game Loop
 */
var frame = function() {
    var next = undefined;

    if(!this.globalGameBoard.isGameOver) {
        if(this.globalGameBoard.piece == undefined) {
            var nextPiece = this.randomPieceGenerator();
            this.globalGameBoard.activatePiece(nextPiece);
        }
        
        this.globalGameBoard.pieceMovement(40);
        setTimeout(function(){
            this.requestAnimationFrame(this.frame);
        }, 700);
    } else {
        alert("Game Over");
    }
}

/**
 * Game initiator
 */
var startGame = function() {

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

startGame();

