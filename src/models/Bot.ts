import { BotPlayingStrategyFactory } from "../factories/BotPlayingStrategyFactory";
import { EasyBotPlayingStrategy } from "../strategies/botPlayingStrategies/EasyBotPlayingStrategy";
import { Board } from "./Board";
import { BotDifficultyLevel, PlayerType } from "./Enums";
import { Move } from "./Move";
import { Player } from "./Player";

export class Bot extends Player{
    private botDifficultyLevel:BotDifficultyLevel;
    constructor (botDifficultyLevel: BotDifficultyLevel) {
        super(0,'Bot 1','B', PlayerType.BOT)
        this.botDifficultyLevel = botDifficultyLevel;
    }
    public async makeMove(board: Board) {
        const strategy = BotPlayingStrategyFactory.getStrategy(this.botDifficultyLevel);
        return strategy.makeMove(board,this);
    }
}