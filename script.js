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
    document.getElementById('easy').addEventListener('click', () => {
        const minefield = new Minefield(8,9,10);
        const view = new MinesweeperView(minefield);
        view.renderMinefield();
        minefield.updateMineCounter();
        setupEventlistners();
    });
    document.getElementById('medium').addEventListener('click', () => {
        const minefield = new Minefield(16,16,40); 
        const view = new MinesweeperView(minefield);
        view.renderMinefield();
        minefield.updateMineCounter();
        setupEventlistners();
    }); 
    document.getElementById('hard').addEventListener('click', () => {
        const minefield = new Minefield(16,30,99); 
        const view = new MinesweeperView(minefield);
        view.renderMinefield();
        minefield.updateMineCounter();
        setupEventlistners();
    });

    
}