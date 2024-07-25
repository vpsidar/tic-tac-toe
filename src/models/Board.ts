import Cell from "./Cell";
import { CELL_STATE } from "./Enums";

export class Board {
    private size:number;
    private cells: Cell[][] = [];
    constructor(size:number) {
        this.size = size;
        this.createCells()
    }

    private createCells() {
        for(let i = 0; i < this.size; i++) {
            this.cells.push([]);
            for(let j= 0; j< this.size; j++){
                this.cells[i][j] = new Cell(i, j,CELL_STATE.EMPTY);
            }
        }
    }
    public displayBoard() {
        for(let i=0; i<this.size; i++) {
            let str = "";
            for(let j=0; j<this.size; j++){
                if(this.cells[i][j].getCellState() === CELL_STATE.EMPTY) {
                    str = str + " ";
                } else {
                    str = str + this.cells[i][j].getCellPlayer()?.getSymbol();
                }
                if(j != this.size-1) {
                    str = str + "|";
                }
            }
            console.log(str);
            console.log("_".repeat(this.size*2))
        }
    }

    public getCell(row:number, col:number) {
        return this.cells[row][col]
    }
    public getSize() {
        return this.size;
    }
}