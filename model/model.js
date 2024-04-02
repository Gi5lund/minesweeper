export class Minefield{
    constructor(row,col,numMines){
        this.row = row;
        this.col = col;
        this.minefield = [];
        this.minefield=this.initMinefield(numMines);
    }
    initMinefield(numMines){
        this.minefield = this.createMinefield();
        this.placeMines(numMines);
        this.setSurroundingMinesCount();
        return this.minefield;
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
        this.countSurroundingMines();
        return this.minefield;
    }
    setFlag(row,col){
        this.minefield[row][col].flag = !this.minefield[row][col].flag;
        return this.minefield;
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
        let cell = this.minefield[row][col];
        let testCell;
        cell.open = true;
        if(cell.mine){
            console.log('Game Over');
            return;
        } if(cell.value>0){
            return;
        } else{
            // this.minefield[row][col].open = true;
            // if(this.countSurroundingMines(row,col)===0){
            //     this.openSurroundingCells(row,col);//flood fill algorithm to reveal all empty cells around the clicked
            // }
            for(let i=row-1;i<=row+1;i++){
                for(let j=col-1;j<=col+1;j++){
                    if(i===row && j===col){continue;}
                    if(this.isValidPosition(i,j)){
                        testCell = this.minefield[i][j];
                        if(!testCell.open){
                            this.openCell(i,j);
                        }
                    }
                }
            }
        }
    }
    // openSurroundingCells(row,col){
    //     let cell=this.minefield[row][col];
    //     cell.open=true;
    //     if(cell.value>0){
    //         return ;
    //     }else{
    //         for(let i=-1;i<=1;i++){
    //             for(let j=-1;j<=1;j++){
    //                  let testCell=this.minefield[row+i][col+j];
    //                 if(this.isValidPosition(row+i,col+j) && !this.minefield[row+i][col+j].mine ){
    //                 this.minefield[row+i][col+j].open = true;
    //                 if(this.countSurroundingMines(row+i,col+j)===0){
    //                     console.log('opening surrounding cells');
    //                     this.openSurroundingCells(row+i,col+j);
                        
    //                     console.table(this.minefield);
    //                 }
    //             }
    //         }
    //         }
    //     }
    // }
    setSurroundingMinesCount(){
        for(let i=0;i<this.row;i++){
            for(let j=0;j<this.col;j++){
                if(!this.minefield[i][j].mine){
                    this.minefield[i][j].value = this.countSurroundingMines(i,j);
                }
            }
        }
        return this.minefield;
    }
}