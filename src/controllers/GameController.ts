import { GameState } from "../models/Enums";
import { Game } from "../models/Game";
import { Player } from "../models/Player";
import { WinningStrategy } from "../strategies/winningStrategies/WinningStrategy";

export class GameController {
    public startGame(dimension: number,players:Player[], winningStrategies:WinningStrategy[]) {
        //create a game;
        //since we need to do some sort of validation we can't create object from constructor only.
        //to do this process we need builder 
     return Game.getBuilder().setDimension(dimension)
        .setPlayers(players)
        .setWinningStrategies(winningStrategies)
        .build();

    }

    public async makeMove(game:Game) {
       return game.makeMove();
    }

    public displayBoard(game:Game) {
        return game.getBoard()?.displayBoard();
    }
    public getWinner(game:Game) {
        return game.getWinner();
    }

    public checkState(game:Game):GameState {
        return game.getGameState();
    }

    public undo() {

    }
}