import { Board } from "../../models/Board";
import { Bot } from "../../models/Bot";
import { CELL_STATE } from "../../models/Enums";
import { Move } from "../../models/Move";
import { BotPlayingStrategy } from "./BotPlayingStrategy";

export class EasyBotPlayingStrategy implements BotPlayingStrategy {
    makeMove(board: Board,bot:Bot): Move {
        for(let i =0; i<board.getSize(); i++) {
            for(let j=0; j<board.getSize(); j++) {
                const cell = board.getCell(i,j);
                if(cell.getCellState() === CELL_STATE.EMPTY) {
                    cell.setCellState(CELL_STATE.FILLED);
                    cell.setCellPlayer(bot)
                    const move = new Move(cell,bot);
                    return move;
                }
            }
        }
        return new Move(board.getCell(0,0),bot); // just to satisfy
    }
    
}