import { Board } from "../../models/Board";
import { Move } from "../../models/Move";

export interface WinningStrategy {
    checkWinner(move:Move, board:Board):boolean
}