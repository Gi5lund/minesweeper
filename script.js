"use strict";
import { Minefield } from "./model/model.js";
import { MinesweeperView } from "./view/view.js";

window.addEventListener('DOMContentLoaded',start);
function start() {
    const minefield = new Minefield(8,9,3); // 10x15 minefield with 15 mines
   
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
   
}