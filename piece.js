class Piece {
    
    constructor(ctx, piece, x, y) {
        this.ctx = ctx;
        this.blocks = piece.blocks;
        this.color = piece.color;
        this.activeBlock = this.blocks[0];
        this.posX = x;
        this.posY = y;

        this.rotationN = 0;

        this.gridSq = 20;
    }

    calculateCoordinates(activeBlock, posX, posY) {
        var coordinates = [];

        for(var row=0; row < 4; row++ ) {
            for(var col=0; col < 4; col++ ) {
                if(activeBlock[row][col] == 1) {
                    coordinates.push([posX+col, posY+row]);
                }
            }
        }

        return coordinates;
    }

    getPieceCoordinates() {
        return this.calculateCoordinates(this.activeBlock, this.posX, this.posY);
    }

    getPieceMoveCoordinates(direction) {
        var activeBlock = this.activeBlock;
        var posX = this.posX;
        var posY = this.posY;

        switch(direction) {
            case 'left':
                posX -= 1;
                break;
            case 'right':
                posX += 1;
                break;
            case 'down':
                posY += 1;
                break;
            case 'rotate':
                activeBlock = this.blocks[((this.rotationN+1)%4)];
                break;
        }

        return this.calculateCoordinates(activeBlock, posX, posY);
    }

    setGridSq(gridSq) {
        this.gridSq = gridSq;
    }

    drawRect(x, y, w, h, color) {
        this.ctx.fillStyle=color;
        this.ctx.fillRect(x,y,w,h);
        this.ctx.strokeRect(x,y,w,h);
    }

    drawActiveBlockOnCanvas(color) {
        for(var row = 0; row < 4 ; row++ ) {
            for(var col = 0; col < 4; col++ ) {
                var x = this.posX+col;
                var y = this.posY+row;

                if(this.activeBlock[row][col] == 1) {
                    this.drawRect(x*this.gridSq, y*this.gridSq, this.gridSq, this.gridSq, color);
                } 
                // else {
                //     this.drawRect(x*this.gridSq, y*this.gridSq, this.gridSq, this.gridSq, "white");
                // }
            }
        }
    }

    drawPiece() {
        this.drawActiveBlockOnCanvas(this.color);
    }

    unDrawPiece() {
        this.drawActiveBlockOnCanvas("white");
    }

    redrawPiece() {
        this.unDrawPiece();
        this.drawPiece();
    }

    moveDown() {
        this.unDrawPiece();
        this.posY += 1;
        this.drawPiece();
    }

    moveRight() {
        this.unDrawPiece();
        this.posX += 1;
        this.drawPiece();
    }

    moveLeft() {
        this.unDrawPiece();
        this.posX -= 1;
        this.drawPiece();
    }

    rotate() {
        this.unDrawPiece();
        this.rotationN = (this.rotationN+1) % 4;
        this.activeBlock = this.blocks[this.rotationN];
        this.drawPiece();
    }
}


var z = {
    blocks : [
        [
            [0,0,0,0],
            [1,1,0,0],
            [0,1,1,0],
            [0,0,0,0]
        ],
        [
            [0,1,0,0],
            [1,1,0,0],
            [1,0,0,0],
            [0,0,0,0]
        ],
        [
            [1,1,0,0],
            [0,1,1,0],
            [0,0,0,0],
            [0,0,0,0]
        ],
        [
            [0,0,1,0],
            [0,1,1,0],
            [0,1,0,0],
            [0,0,0,0]
        ]
    ],
    color: "red",
    start: -3
};

var o = {
    blocks : [
        [
            [1,1,0,0],
            [1,1,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ],
        [
            [1,1,0,0],
            [1,1,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ],
        [
            [1,1,0,0],
            [1,1,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ],
        [
            [1,1,0,0],
            [1,1,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ]
    ],
    color: "green",
    start: -2
};

var s = {
    blocks : [
        [
            [0,0,0,0],
            [0,1,1,0],
            [1,1,0,0],
            [0,0,0,0]
        ],
        [
            [1,0,0,0],
            [1,1,0,0],
            [0,1,0,0],
            [0,0,0,0]
        ],
        [
            [0,1,1,0],
            [1,1,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ],
        [
            [0,1,0,0],
            [0,1,1,0],
            [0,0,1,0],
            [0,0,0,0]
        ]
    ],
    color: "orange",
    start: -3
};

var t = {
    blocks : [
        [
            [0,0,0,0],
            [1,1,1,0],
            [0,1,0,0],
            [0,0,0,0]
        ],
        [
            [0,1,0,0],
            [1,1,0,0],
            [0,1,0,0],
            [0,0,0,0]
        ],
        [
            [0,1,0,0],
            [1,1,1,0],
            [0,0,0,0],
            [0,0,0,0]
        ],
        [
            [0,1,0,0],
            [0,1,1,0],
            [0,1,0,0],
            [0,0,0,0]
        ]
    ],
    color: "blue",
    start: -3
};

var i = {
    blocks : [
        [
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0]
        ],
        [
            [0,0,0,0],
            [1,1,1,1],
            [0,0,0,0],
            [0,0,0,0]
        ],
        [
            [0,0,1,0],
            [0,0,1,0],
            [0,0,1,0],
            [0,0,1,0]
        ],
        [
            [0,0,0,0],
            [0,0,0,0],
            [1,1,1,1],
            [0,0,0,0]
        ]
    ],
    color: "purple",
    start: -4
};

var j = {
    blocks : [
        [
            [0,1,0,0],
            [0,1,0,0],
            [1,1,0,0],
            [0,0,0,0]
        ],
        [
            [1,0,0,0],
            [1,1,1,0],
            [0,0,0,0],
            [0,0,0,0]
        ],
        [
            [0,1,1,0],
            [0,1,0,0],
            [0,1,0,0],
            [0,0,0,0]
        ],
        [
            [0,0,0,0],
            [1,1,1,0],
            [0,0,1,0],
            [0,0,0,0]
        ]
    ],
    color: "cyan",
    start: -3
};

var l = {
    blocks : [
        [
            [0,1,0,0],
            [0,1,0,0],
            [0,1,1,0],
            [0,0,0,0]
        ],
        [
            [0,0,0,0],
            [1,1,1,0],
            [1,0,0,0],
            [0,0,0,0]
        ],
        [
            [1,1,0,0],
            [0,1,0,0],
            [0,1,0,0],
            [0,0,0,0]
        ],
        [
            [0,0,1,0],
            [1,1,1,0],
            [0,0,0,0],
            [0,0,0,0]
        ]
    ],
    color: "yellow",
    start: -3
};