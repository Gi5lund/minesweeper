"use strict";
import { Minefield } from "./model/model.js";
import { MinesweeperView } from "./view/view.js";

window.addEventListener('DOMContentLoaded',start);
function start() {
    const minefield = new Minefield(8,9,3); // 10x15 minefield with 15 mines
    // minefield.initMinefield(15); // 15 mines
    console.log(minefield);
    const view = new MinesweeperView(minefield);
    view.renderMinefield();
    minefield.updateMineCounter();

    setupEventlistners();
}
function setupEventlistners() {
    const smiley = document.getElementById('smileyButton');
    smiley.addEventListener('click',()=>{
        location.reload();
    });
    // document.querySelector('.reset').addEventListener('click',()=>{
    //     console.log('reset');
    // });
    // document.querySelector('.easy').addEventListener('click',()=>{
    //     console.log('easy');
    // });
    // document.querySelector('.medium').addEventListener('click',()=>{
    //     console.log('medium');
    // });
    // document.querySelector('.hard').addEventListener('click',()=>{
    //     console.log('hard');
    // });
    // let cells = document.querySelectorAll('.cell');
    //     cells.forEach(cell=>{
    //         cell.addEventListener('click',()=>{
    //             let row = cell.dataset.row;
    //             let col = cell.dataset.col;
    //             this.minefield.openCell(row,col);
    //             console.log('click', row, col);
    //             view.renderMinefield();
    //         });
    //         cell.addEventListener('contextmenu',(e)=>{
    //             e.preventDefault();
    //             let row = cell.dataset.row;
    //             let col = cell.dataset.col;
    //             this.model.setFlag(row,col);
    //             console.log('right click', this.model.minefield[row][col].flag);
    //             this.renderMinefield();
    //         });
    //     });

}