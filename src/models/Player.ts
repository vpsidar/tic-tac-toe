import Cell from "./Cell";
import { CELL_STATE, PlayerType } from "./Enums";
import * as readline from "readline"
import { Move } from "./Move";
import { Board } from "./Board";
import { input } from '@inquirer/prompts';
function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export class Player {
    private id:number;
    private name;
    private symbol;
    private playerType:PlayerType;
    constructor (id:number,name:string, symbol:string, playerType: PlayerType) {
        this.name = name;
        this.symbol = symbol;
        this.playerType = playerType;
        this.id = id;

    }
    public getPlayerType() {
        return this.playerType;
    }
    public getSymbol() {
        return this.symbol;
    }
    public getName() {
        return this.name;
    }
    public async makeMove(board:Board) {
        console.log(`It's ${this.name}'s turn`)
        const row = await input({ message: 'Enter row ' });//getRandomInt(0,2);
        const col = await input({ message: 'Enter col ' })//getRandomInt(0,2);
        // rl.close();
        const cell = board.getCell(parseInt(row), parseInt(col));
        //TODO validate cell is already filled with some other player or not
        cell.setCellPlayer(this);
        cell.setCellState(CELL_STATE.FILLED)
        const move = new Move(cell,this);
        return move;
    }
}