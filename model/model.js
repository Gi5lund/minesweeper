export class Minefield{
    constructor(row,col){
        this.row = row;
        this.col = col;
        this.minefield = [];
        this.minefield = this.createMinefield();
    }
    createMinefield(){
        let minefield = [];
        for(let i=0;i<this.row;i++){
            minefield[i] = [];
            for(let j=0;j<this.col;j++){
                const cell = {mine: false, open: false, flag: false, value: 0};
                minefield[i].push(cell);
            }
        }
        return minefield;
    }
    placeMine(row,col){

        this.minefield[row][col].mine = true;
    }
    placeMines(numMines){
        let minesPlaced = 0;
        while(minesPlaced<numMines){
            let row = Math.floor(Math.random()*this.row);
            let col = Math.floor(Math.random()*this.col);
            if(!this.minefield[row][col].mine){
                this.placeMine(row,col);
                minesPlaced++;
            }
        }
    }
    setFlag(row,col){
        this.minefield[row][col].flag = !this.minefield[row][col].flag;
    }
    isOpen(row,col) {
        return this.minefield[row][col].open;
    }
    countSurroundingMines(row,col){
        let count = 0;
        for(let i=-1;i<=1;i++){
            for(let j=-1;j<=1;j++){
                if(row+i>=0 && row+i<this.row && col+j>=0 && col+j<this.col){
                    if(this.minefield[row+i][col+j].mine){
                        count++;
                    }
                }
            }
        }
        return count;
    }
    isValidPosition(row,col){
        return row>=0 && row<this.row && col>=0 && col<this.col;
    }
    printMinefield(){
        console.table(this.minefield);
    }
    //open cells in the minefield: if the cell is not a mine and not open, open it. If it's a mine, game over. if it's a cell with no surrounding mines, open all surrounding cells with no surrounding mines as well using a flood fill algorithm

    openCell(row,col){
        if(this.minefield[row][col].mine){
            console.log('Game Over');
        }else if(!this.minefield[row][col].open){
            this.minefield[row][col].open = true;
            if(this.countSurroundingMines(row,col)===0){
                this.openSurroundingCells(row,col);//flood fill algorithm to reveal all empty cells around the clicked
            }
        }
    }
    openSurroundingCells(row,col){
        for(let i=-1;i<=1;i++){
            for(let j=-1;j<=1;j++){
                if(this.isValidPosition(row+i,col+j) && !this.minefield[row+i][col+j].mine && !this.minefield[row+i][col+j].open){
                    this.minefield[row+i][col+j].open = true;
                    if(this.countSurroundingMines(row+i,col+j)===0){
                        this.openSurroundingCells(row+i,col+j);
                    }
                }
            }
        }
    }
}