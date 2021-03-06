/**
 * @author Prajyot Walali
 * @date 6th September, 2018
 * GITHUB :: github.com/prajyot-w
 */

class GameBoard {
    constructor(ctx, scoreElement) {
        this.ctx = ctx;
        this.scoreElement = scoreElement;
        this.gridSq = 20;
        this.VACANT = 'white';
        this.score = 0;
        this.isGameOver = false;
        this.piece = undefined;

        this.initiateCellStat();
        this.scoreElement.innerHTML = this.score;
    }

    drawRect(x, y, w, h, color) {
        this.ctx.fillStyle=color;
        this.ctx.fillRect(x,y,w,h);
        this.ctx.strokeRect(x,y,w,h);
    }

    drawBoard() {
        var rows = 20; var cols = 10;
    
        for(var i=0; i< cols; i++ ) {
            for(var j=0; j < rows; j++) {
                var color = this.cellStat[j][i].color;
                this.drawRect(this.gridSq*i, this.gridSq*j, this.gridSq, this.gridSq, color);
            }
        }
    }

    activatePiece(piece) {
        this.piece = piece;
    }

    initiateCellStat() {
        this.cellStat = [];

        for(i=0;i<20;i++) {
            var row = [];
            for(j=0;j<10;j++){
                row.push({locked:false, color: 'white'});
            }
            this.cellStat.push(row);
        }
    }

    updateScore() {
        this.score += 10;
        this.scoreElement.innerHTML = this.score;
    }

    checkIfRowFilled() {
        var row = undefined;
        var isFilled = false;
        
        for(i = 0; i < this.cellStat.length; i++) {
            isFilled = (this.cellStat[i][0].locked && this.cellStat[i][0].color != 'white');
            for(j = 0; j < this.cellStat[i].length; j++) {
                isFilled = (isFilled && (this.cellStat[i][j].locked && this.cellStat[i][j].color != 'white'));
            }

            if(isFilled) {
                row = [];
                for(var k = 0; k < 10; k++) {
                    row.push({locked:false, color: 'white'});
                }

                this.cellStat.splice(i, 1);
                this.cellStat.unshift(JSON.parse(JSON.stringify(row)));

                this.drawBoard();
                this.updateScore();
            }
        }

    }

    checkIfGameOver() {
        var coordinates = this.piece.getPieceCoordinates();
        var isGameOver = (coordinates[0][1] < 0);

        for(i = 0; i < coordinates.length; i++) {
            isGameOver = (isGameOver && coordinates[i][1] < 0 );
        }
        
        this.isGameOver = isGameOver;

        return isGameOver;
    }


    lockPiece(coordinates, color) {
        if(!this.isGameOver) {
            for(i=0; i < coordinates.length; i++) {
                var x = coordinates[i][0];
                var y = coordinates[i][1];

                if(y >= 0) {
                    this.cellStat[y][x].locked = true;
                    this.cellStat[y][x].color = color;
                }

            }

            // Check if Game Over
            if(!this.checkIfGameOver()) {
                // Check if rows are filled
                this.checkIfRowFilled();
            }

            this.piece = undefined;
        }
    }

    hitLockedPiece(direction) {
        var coordinates = this.piece.getPieceMoveCoordinates(direction);

        for(i=0; i < coordinates.length; i++) {
            var x = coordinates[i][0];
            var y = coordinates[i][1];
            if(y >= 0 && this.cellStat[y][x].locked == true) {
                return true;
            }
        }

        return false;
    }

    hitLeftWall() {
        var coordinates = this.piece.getPieceCoordinates();

        for(var i = 0; i < coordinates.length; i++) {
            if(coordinates[i][0] == 0) {
                return true;
            }
        }

        return false;
    }

    hitRightWall() {
        var coordinates = this.piece.getPieceCoordinates();

        for(var i = 0; i < coordinates.length; i++) {
            if(coordinates[i][0] == 9) {
                return true;
            }
        }

        return false;
    }

    hitBottom() {
        var coordinates = this.piece.getPieceCoordinates();

        for(var i = 0; i < coordinates.length; i++) {
            if(coordinates[i][1] == 19) {
                return true;
            }
        }

        return false;
    }

    pieceMovement(keyCode) {
        if(this.piece != undefined) {
            if(keyCode == 37 && !this.hitLeftWall() && !this.hitLockedPiece('left')){
                this.piece.moveLeft();
            }else if(keyCode == 38 && !this.hitBottom() && !this.hitLockedPiece('rotate')) {
                this.piece.rotate();
            }else if(keyCode == 39 && !this.hitRightWall() && !this.hitLockedPiece('right')) {
                this.piece.moveRight();
            }else if(keyCode == 40 && !this.hitBottom() && !this.hitLockedPiece('down')) {
                this.piece.moveDown();
            } else if(this.hitBottom() || this.hitLockedPiece('down')) {
                this.lockPiece(this.piece.getPieceCoordinates(), this.piece.color);
            }
        }
    }

    pieceUserEvent(e) {
        this.pieceMovement(e.keyCode);
    }
}