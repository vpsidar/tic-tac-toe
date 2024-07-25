import { Board } from "../../models/Board";
import { Bot } from "../../models/Bot";
import { Move } from "../../models/Move";

export interface BotPlayingStrategy {
    makeMove(board:Board,bot:Bot):Move|undefined
}