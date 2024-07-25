import { CELL_STATE } from "./Enums";
import { Player } from "./Player";
class Cell {
    private row;
    private col;
    private state:CELL_STATE;
    private player:Player|null;
    constructor(row:number, col:number, cellState:CELL_STATE) {
        this.row = row;
        this.col = col;
        this.state = cellState;
        this.player = null;
    }

    public setCellPlayer(player:Player) {
        this.player = player;
        this.setCellState(CELL_STATE.FILLED);
    }

    public setCellState(state:CELL_STATE) {
        this.state = state;
    }

    public getCellState(){
        return this.state;
    }
    public getCellPlayer(){
        return this.player;
    }

    public getRow(){
        return this.row;
    }

    public getCol(){
        return this.col;
    }

}
export default Cell