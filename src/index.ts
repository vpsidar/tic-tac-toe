import { GameController } from "./controllers/GameController";
import { Board } from "./models/Board";
import { BotDifficultyLevel, GameState, PlayerType } from "./models/Enums";
import { Game } from "./models/Game";
import * as readline from "readline"
import { Player } from "./models/Player";
import { OrderOneWinningStrategy } from "./strategies/winningStrategies/OrderOneWinningStrategy";
import { Bot } from "./models/Bot";

const question = (query:any) => new Promise(resolve => rl.question(query, resolve));
const gameController = new GameController();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const main = async () => {
    const dimension = await question('Give board size');
    const players = [
        new Player(1,"Vijay","0",PlayerType.HUMAN),
        new Bot(BotDifficultyLevel.EASY)
    ]
    // if(typeof(dimension) === 'string'){
    //     for(let i = 1; i<parseInt(dimension); i++) {
    //         const name = await question('What is your name? ');
    //         const symbol = await question('What is your symbol? ');
    //         if(typeof(name) === 'string' && typeof(symbol) === 'string'){
    //             const player = new Player(i,name,symbol,PlayerType.HUMAN);
    //             players.push(player)
    //         }
            
    //     }
    // }
    rl.close();
    console.log('Dimension ', dimension)
    console.log(players);
    const winningStrategies = [new OrderOneWinningStrategy(dimension as number)]
    const game = gameController.startGame(dimension as number,players,winningStrategies)
    console.log('Game is starting');
    // gameController.displayBoard(game);
    // gameController.makeMove(game);
    while(gameController.checkState(game) === GameState.IN_PROGRESS){
        gameController.displayBoard(game);
        console.log('Please make your move')
        await gameController.makeMove(game);
    }
    if(gameController.checkState(game) === GameState.SUCCESS) {
        const player = gameController.getWinner(game);
        if(player) {
            console.log(`Winner is ${player.getName()}`)
        }
    } else if(gameController.checkState(game) === GameState.DRAM) {
        console.log('Game is draw')
    }

  };

main();


// switch (gameController.checkState(game)) {
//     case GameState.DRAM:
//         console.log('Game is draw');
//         break;
//     case GameState.PAUSE:
//         console.log('Game is pause');
//         break;
//     case GameState.SUCCESS:
//         console.log('Game is sucess and winneer is ', gameController.getWinner(game))
//     default:
//         break;
// }

// const board = new Board(3);
// console.log(board);