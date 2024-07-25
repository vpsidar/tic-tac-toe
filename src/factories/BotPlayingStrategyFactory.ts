import { BotDifficultyLevel } from "../models/Enums";
import { EasyBotPlayingStrategy } from "../strategies/botPlayingStrategies/EasyBotPlayingStrategy";

export class BotPlayingStrategyFactory {
    public static getStrategy(difficultyLevel:BotDifficultyLevel){
        if(difficultyLevel === BotDifficultyLevel.EASY){
            return new EasyBotPlayingStrategy();
        }
        return new EasyBotPlayingStrategy();
    }

}