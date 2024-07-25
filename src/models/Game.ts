import { BotCountException } from "../exceptions/BotCountException";
import { PlayerCountAndDimensionMismatchException } from "../exceptions/PlayerCountAndDimensionMismatchException";
import { SymbolCountException } from "../exceptions/SymbolCountException";
import { WinningStrategy } from "../strategies/winningStrategies/WinningStrategy";
import { Board } from "./Board";
import { GameState, PlayerType } from "./Enums";
import { Move } from "./Move";
import { Player } from "./Player";

export class Game {
    private gameState:GameState = GameState.IN_PROGRESS;
    private players:Player[];
    private winner:Player|null;
    private currentPlayerIndex:number = 0;
    private board:Board;
    private winningStrategies:WinningStrategy[];
    private moves:Move[];
    constructor(dimension:number,players:Player[], winningStrategies:WinningStrategy[]) {
        this.players = players;
        this.winningStrategies = winningStrategies;
        this.moves = []
        this.currentPlayerIndex = 0;
        this.gameState = GameState.IN_PROGRESS;
        this.board = new Board(dimension);
        this.winner = null;
    }
    
    public getBoard() {
        return this.board;
    }
    public setBoard(board:Board) {
        this.board = board;
    }
    public getGameState():GameState {
        return this.gameState;
    }
    public setGameState(gameState:GameState) {
        this.gameState = gameState;
    }
    public getPlayers():Player[] {
        return this.players;
    }
    public setPlayers(players:Player[]) {
        this.players = players;
    }
    public setWinner(player:Player) {
        this.winner = player;
    }
    public getWinner():Player|null {
        return this.winner;
    }
    public setWinningStrategies(strategies:WinningStrategy[]) {
        this.winningStrategies = strategies;
    }
    public getWinningStrategies():WinningStrategy[] {
        return this.winningStrategies;
    }
    public static getBuilder() {
        return new GameBuilder();
    }
    public async makeMove() {
        // Figure out whos turn it is
        const currentPlayer = this.players[this.currentPlayerIndex];
        const move = await currentPlayer.makeMove(this.board);
        this.moves.push(move);
        if(this.winningStrategies.length > 0) {
            const orderOneWinStrategy = this.winningStrategies[0];
            if(orderOneWinStrategy.checkWinner(move,this.board)){
                this.setGameState(GameState.SUCCESS);
                this.setWinner(currentPlayer);
                return;
            }
            if(this.moves.length === this.board.getSize()*this.board.getSize()) {
                this.setGameState(GameState.DRAM);
                return;
            }
        }
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }
}

export class GameBuilder {
    // whatever that we need from the client that data only going to havbe a variable in the builder class
    private dimension:number = 3; // Setting min 3 s
    private players:Player[] = [];
    private winningStrategies:WinningStrategy[] = [];

    public setDimension(dimension:number):GameBuilder {
        this.dimension = dimension;
        return this;
    }

    public setPlayers(players:Player[]):GameBuilder {
        this.players = players;
        return this;
    }

    public setWinningStrategies(winningStrategies:WinningStrategy[]):GameBuilder {
        this.winningStrategies = winningStrategies;
        return this;
    }

    public addPlayer(player:Player):GameBuilder {
        this.players?.push(player)
        return this;
    }

    public addWinningStrategy(winningStrategy:WinningStrategy):GameBuilder {
        this.winningStrategies?.push(winningStrategy);
        return this;
    }
    private validate() {
        // validate single Bot player
        let botCount = 0;
        let map = new Map();
        for(const player of this.players) {
            if(player.getPlayerType() === PlayerType.BOT) {
                botCount++;
            }
            if(!map.has(player.getSymbol())){
                map.set(player.getSymbol(),0)
            }
            map.set(player.getSymbol(),map.get(player.getSymbol()) + 1);
            if(map.get(player.getSymbol()) > 1) {
                throw new SymbolCountException()
            }
        }
        if(botCount > 1) {
            throw new BotCountException('More than 1 bot is not allowed');
        }

        if(this.players.length != this.dimension -1) {
            throw new PlayerCountAndDimensionMismatchException('Player count and dimesion mismatch');
        }
        // validate no of player
        // validate diff symbol for every player

    }
    public build():Game {
        this.validate();
        return new Game(this.dimension,this.players,this.winningStrategies)
    }

}