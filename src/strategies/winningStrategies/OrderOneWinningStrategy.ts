import { Board } from "../../models/Board";
import { Move } from "../../models/Move";
import { WinningStrategy } from "./WinningStrategy";

export class OrderOneWinningStrategy implements WinningStrategy {
    private rows:Map<string, number>[] = []
    private cols:Map<string, number>[] = []
    private diagonal;
    private reverseDiagonal;
    constructor(size:number) {
        this.rows = [];
        this.cols = [];
        this.diagonal = new Map()
        this.reverseDiagonal = new Map();
        for(let i = 0; i< size; i++){
            this.rows.push(new Map());
            this.cols.push(new Map());
        }
    }
    checkWinner(move: Move, board: Board): boolean {
        const cell = move.getCell();
        const player = move.getPlayer();
        const rowMap = this.rows[cell.getRow()];
        if(!rowMap.has(player.getSymbol())){
            rowMap.set(player.getSymbol(),0)
        }
        rowMap.set(player.getSymbol(),(rowMap.get(player.getSymbol()) || 0) +1)
        
        if(!this.cols[cell.getCol()].has(player.getSymbol())){
            this.cols[cell.getCol()].set(player.getSymbol(),0)
        }
        this.cols[cell.getCol()].set(player.getSymbol(),(this.cols[cell.getCol()].get(player.getSymbol()) || 0) +1)

        //diagonal
        if(cell.getRow() === cell.getCol()) {0
            if(!this.diagonal.has(player.getSymbol())){
                this.diagonal.set(player.getSymbol(),0)
            }
            this.diagonal.set(player.getSymbol(), this.diagonal.get(player.getSymbol()) + 1)
        }
        if(cell.getRow()+cell.getCol() === board.getSize()-1){
            if(!this.reverseDiagonal.has(player.getSymbol())){
                this.reverseDiagonal.set(player.getSymbol(),0)
            }
            this.reverseDiagonal.set(player.getSymbol(), this.reverseDiagonal.get(player.getSymbol()) + 1)
        }
        //check if the player is winning
        return this.rows[cell.getRow()].get(player.getSymbol()) == board.getSize() ||
                this.cols[cell.getCol()].get(player.getSymbol()) == board.getSize() ||
                this.diagonal.get(player.getSymbol()) == board.getSize() ||
                this.reverseDiagonal.get(player.getSymbol()) == board.getSize();
    }
    
}