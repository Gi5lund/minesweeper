"use strict";
import { Minefield } from "./model/model.js";
import { MinesweeperView } from "./view/view.js";

window.addEventListener('DOMContentLoaded',start);
function start() {
    const minefield = new Minefield(10,15);
    minefield.placeMines(20);
    console.log(minefield);
    const view = new MinesweeperView(minefield);
    view.renderMinefield();
}