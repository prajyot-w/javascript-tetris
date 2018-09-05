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

    checkIfRowFilled(rowN) {
        var row = undefined;
        var isFilled = (this.cellStat[rowN][0].locked && this.cellStat[rowN][0].color != 'white');
        
        for(i=0; i < this.cellStat[rowN].length; i++) {
            isFilled = (isFilled && (this.cellStat[rowN][i].locked && this.cellStat[rowN][i].color != 'white') )
        }

        if(isFilled){
            row = []
            for(i=0; i < 10; i++) {
                row.push({locked:false, color: 'white'});
            }

            this.cellStat.splice(rowN,1);
            this.cellStat.unshift(row);

            this.drawBoard();
            this.updateScore();
        }

    }

    checkIfGameOver(yCoordinate) {
        if(yCoordinate<0) {
            this.isGameOver = true;
            return true;
        }

        return false;
    }


    lockPiece(coordinates, color) {
        var min = undefined;
        var max = undefined;

        for(i=0; i < coordinates.length; i++) {
            var x = coordinates[i][0];
            var y = coordinates[i][1];

            this.cellStat[y][x].locked = true;
            this.cellStat[y][x].color = color;

            if(min = undefined) {
                min = y;
            }

            if(max == undefined) {
                max = y;
            }

            min = min > y ? y : min;
            max = max < y ? y : max;
        }

        // Check if Game Over
        if(this.checkIfGameOver(min)) {
            // Check if rows are filled
            for(i=min; i<=max; i++) {
                this.checkIfRowFilled(i);
            }
        }

        this.piece = undefined;


        console.log("Locked Pieces");
        console.log(this.cellStat);

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
        if(keyCode == 37 && !this.hitLeftWall() && !this.hitLockedPiece('left')){
            this.piece.moveLeft();
        }else if(keyCode == 38 && !this.hitBottom() && !this.hitLockedPiece('rotate')) {
            this.piece.rotate();
        }else if(keyCode == 39 && !this.hitRightWall() && !this.hitLockedPiece('right')) {
            this.piece.moveRight();
        }else if(keyCode == 40 && !this.hitBottom() && !this.hitLockedPiece('down')) {
            this.piece.moveDown();
            if(this.hitBottom() || this.hitLockedPiece('down')) {
                this.lockPiece(this.piece.getPieceCoordinates(), this.piece.color);
            }
        }
    }

    pieceUserEvent(e) {
        this.pieceMovement(e.keyCode);
    }
}