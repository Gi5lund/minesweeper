export class MinesweeperView{
    constructor(model){
        this.model = model;
        this.minefielddiv=this.createMinefield(this.model);
        this.renderMinefield();
        this.bindEvents();
    }
    
    createMinefield(model){
        console.log('creating minefield');
        const cols= model.col;
        const rows = model.row;
        
        document.documentElement.style.setProperty('--COLS',cols);
        document.documentElement.style.setProperty('--ROWS',rows);
        console.log("COLS: ",cols," ROWS: ",rows)
        const minefield = model.minefield;
        const minefielddiv = document.querySelector('#minefield');
        if (!minefielddiv) {
            console.error("No element found with id 'minefield'");
            return;
        }
        else{console.log('found minefield');    }
        minefielddiv.innerHTML = '';
        for(let i=0;i<minefield.length;i++){
            // let row = document.createElement('div');
            // row.classList.add('row');
             
            for(let j=0;j<minefield[i].length;j++) {
                console.log('creating cell');
                 const cell = minefield[i][j];
                let celldiv = document.createElement('div');
                celldiv.classList.add('cell');
                if(cell.mine){
                    celldiv.classList.add('mine');
                }
                if(cell.open){
                    celldiv.classList.add('revealed');
                }
                if(cell.flag){
                    celldiv.classList.add('flagged');
                }
                celldiv.dataset.row = i;
                celldiv.dataset.col = j;
                
                minefielddiv.appendChild(celldiv);
            }
            
        }
        return minefielddiv;
    }
    renderMinefield(){
        let cells = document.querySelectorAll('.cell');
        cells.forEach(cell=>{
            let row = cell.dataset.row;
            let col = cell.dataset.col;
            let cellModel = this.model.minefield[row][col];
            cell.textContent = '';
             cell.classList.remove('revealed','flagged','mine');
            if(cellModel.open){
                cell.classList.add('revealed');
                if(cellModel.mine){
                    cell.classList.add('mine');
                }else{
                    cell.textContent = cellModel.value;
                    cell.classList.add('number-'+cellModel.value);
                }
            }else if(cellModel.flag){
                cell.classList.add('flagged');
                cell.textContent ="🚩";
            }
        });
    }
    bindEvents(){
        let cells = document.querySelectorAll('.cell');
        cells.forEach(cell=>{
            cell.addEventListener('click',()=>{
                let row = cell.dataset.row;
                let col = cell.dataset.col;
                this.model.openCell(row,col);
                console.log('click', row, col);
                this.renderMinefield();
            });
            cell.addEventListener('contextmenu',(e)=>{
                e.preventDefault();
                let row = cell.dataset.row;
                let col = cell.dataset.col;
                this.model.setFlag(row,col);
                console.log('right click', this.model.minefield[row][col].flag);
                this.renderMinefield();
            });
        });
    }
}