export class  Minefield{
    constructor(rows, cols){
        this.rows = rows;
        this.cols = cols;
        let cell={
            hasMine: false,
            neighorsWithMines: 0,
            isShown:false,
            isMarked:false
        };
        this.cells=this.createMatrix(rows, cols, cell);
    }
    
    createCell(row, col, cell){
        return Object.assign({ row: row, col: col }, cell);
    }
    
    createMatrix(rows, cols, cell){
        let matrix=[];
        for (let i=0;i<rows;i++){
            matrix.push([]);
            for (let j=0;j<cols;j++){
                matrix[i].push(this.createCell(i,j,cell));
            }
        }
        return matrix;
    }
    
    revealCell(row, col){
        if(!this.isValidCoords(row, col)){
            return;
        }
        
        let cell=this.getCell(row, col);
        if(cell.isShown){
            return;
        }
        
        cell.isShown=true;
        if(cell.hasMine){
            return; // game over    
        }
    }
    markCell(row, col){
        if(!this.isValidCoords(row, col)){
            return;
        }
        
        let cell=this.getCell(row, col);
        if(cell.isShown){
            return;
        }
        
        cell.isMarked=!cell.isMarked;
    }
    
    isValidCoords(row, col){
        return row>=0 && row<this.rows && col>=0 && col<this.cols;
    }
}

class Cell{
    constructor(row, col){
        this.row=row;
        this.col=col;
        this.hasMine=false;
        this.neighorWithMines=0;
        this.isShown=false;
        this.isMarked=false;
    }
    
    countNeighbors(){
        let count=0;
        for (let i=-1;i<=1;i++){
            for (let j=-1;j<=1;j++){
                if(i==0 && j==0){
                    continue;
                }
                if(this.hasMine){
                    count++;
                }
            }
        }
        this.neighorWithMines=count;
    }
}
}