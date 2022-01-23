import React from "react";
import axios from "axios";
import {GameResult} from "./GameResult";
import {MostChosen} from "./MostChosen"
import {DisplayPlayerGameHistory} from "./DisplayPlayerGameHistory"

class DisplayRpsInfo extends React.Component<{ }, any> {
    // API_URL = "http://localhost:3000";
    // API_HISTORY_URL = this.API_URL + '/api/history';

    constructor({props}: { props: any }) {
        super(props);
        this.state = {games: [], DataIsLoaded: false, nextPage: '', inputValue: '', filteredList: []};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.displayPlayerWins = this.displayPlayerWins.bind(this);
    }


    getRightCursorValue(currentValue:string){
        console.log(currentValue.indexOf("="));
        const correctValue = currentValue.substring(currentValue.indexOf("=")+1);
        console.log(correctValue);

        // const currentRoute= usePageViews();
        // console.log("tell me the location " + usePageViews());
        this.setState({nextPage: correctValue})
    }



    componentDidMount() {

        // console.log(uuid());

        axios.get("http://localhost:3000/api/history").then((response) => {

            this.getRightCursorValue(response.data.cursor);
            this.setState({games: response.data.data},
                     () => {
                    this.setState({DataIsLoaded: true})
            });

        });
    }

    nextPage() {
        axios.get("http://localhost:3000/api/history" + "?cursor=" + this.state.nextPage).then(res =>{
            this.setState({
                prevPage: this.state.nextPage,
                games: res.data.data
                })
            console.log("prevPage cursor is " + this.state.prevPage );
            this.getRightCursorValue(res.data.cursor);
        })
    }

    prevPage() {
        console.log("prev page cursor value" + this.state.prevPage);
        axios.get("http://localhost:3000/api/history" + "?cursor="  + this.state.prevPage).then(res =>{
            this.setState({
                prevPage: this.state.nextPage,
                games: res.data.data
            })
            this.getRightCursorValue(res.data.cursor);
        })
    }
    displayPlayerWins(inputValue: any) {
        var totalWins = 0;
        var draws = 0;
        var losses = 0;
        var rock = 0;
        var scissors = 0;
        var paper = 0;
        var rockWins = 0;
        var scissorsWins = 0;
        var paperWins = 0;
        this.state.games.forEach((game: { playerA: { name: string | any[]; played: any; }; playerB: { name: string | any[]; played: any; }; }) => {
            if (game.playerA.name.includes(inputValue) || game.playerB.name.includes(inputValue)) {
                var playerIs = game.playerA.name.includes(inputValue) ? 'player1' : 'player2';
                console.log("Found player in game as : " + playerIs);
                console.log("CheckWhoWins() value " + DisplayRpsInfo.checkWhoWins(game.playerA.played, game.playerB.played));
                if (playerIs.includes('player1')) {
                    if (DisplayRpsInfo.checkWhoWins(game.playerA.played, game.playerB.played) === 1) {
                        totalWins++;
                        if(game.playerA.played.includes("ROCK")){
                            rock++; rockWins++;
                        } else if(game.playerA.played.includes("SCISSORS")){
                            scissors++; scissorsWins++;
                        }else {
                            paper++; paperWins++;
                        }
                    }
                    if (DisplayRpsInfo.checkWhoWins(game.playerA.played, game.playerB.played) === 0) {
                        draws++;
                        if(game.playerA.played.includes("ROCK")){
                            rock++;
                        } else if(game.playerA.played.includes("SCISSORS")){
                            scissors++;
                        }else {
                            paper++;
                        }
                    } else {
                        losses++;
                        if(game.playerA.played.includes("ROCK")){
                            rock++;
                        } else if(game.playerA.played.includes("SCISSORS")){
                            scissors++;
                        }else {
                            paper++;
                        }
                    }
                } else {

                    if (DisplayRpsInfo.checkWhoWins(game.playerA.played, game.playerB.played) === -1) {
                        totalWins++;
                        if(game.playerA.played.includes("ROCK")){
                            rock++; rockWins++;
                        } else if(game.playerA.played.includes("SCISSORS")){
                            scissors++; scissorsWins++;
                        }else {
                            paper++; paperWins++;
                        }
                    }
                    if (DisplayRpsInfo.checkWhoWins(game.playerA.played, game.playerB.played) === 0) {
                        draws++;
                        if(game.playerA.played.includes("ROCK")){
                            rock++;
                        } else if(game.playerA.played.includes("SCISSORS")){
                            scissors++;
                        }else {
                            paper++;
                        }
                    } else {
                        losses++;
                        if(game.playerA.played.includes("ROCK")){
                            rock++;
                        } else if(game.playerA.played.includes("SCISSORS")){
                            scissors++;
                        }else {
                            paper++;
                        }
                         }
                }

            }

        });
        
        this.setState({totalPaperWins: paperWins, totalScissorsWins: scissorsWins, totalRockWins: rockWins, totalWins: totalWins, totalDraws: draws, totalLosses: losses, totalRocks: rock, totalScissors: scissors, totalPapers: paper})

    }

    private static checkWhoWins(playerOne: string | string[], playerTwo: string | string[]) {
        console.log("Player 1" + playerOne + " & Player 2 " + playerTwo);
        if (playerOne.includes("ROCK") && playerTwo.includes("ROCK")) {
            //DRAW
            return 0;
        }
        if (playerOne.includes("ROCK") && playerTwo.includes("SCISSORS")) {
            //PLAYER 1 WINS
            return 1;
        }
        if (playerOne.includes("ROCK") && playerTwo.includes("PAPER")) {
            //PLAYER 2 WINS
            return -1;
        }
        if (playerOne.includes("SCISSORS") && playerTwo.includes("SCISSORS")) {
            //DRAW
            return 0;
        }
        if (playerOne.includes("SCISSORS") && playerTwo.includes("PAPER")) {
            //    PLAYER 1 WINS;
            return 1;
        }
        if (playerOne.includes("SCISSORS") && playerTwo.includes("ROCK")) {
            // PLAYER 2 WINS;
            return -1;
        }
        if (playerOne.includes("PAPER") && playerTwo.includes("PAPER")) {
            // DRAW
            return 0;
        }
        if (playerOne.includes("PAPER") && playerTwo.includes("ROCK")) {
            //PLAYER 1 WINS
            return 1;
        }
        if (playerOne.includes("PAPER") && playerTwo.includes("SCISSORS")) {
            //PLAYER 2 WINS
            return -1;
        }
    }
    private handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log("changed... new value is " + event.target.value);
        this.setState({inputValue: event.target.value});
    }



    render () {
        if (!this.state.DataIsLoaded) {
            return <div>Waiting for data to load...</div>
        }



        return <div>
            <h1>Rock, Paper, Scissors Games Results</h1>
            <input value={this.state.inputValue} onChange={(event) => this.handleInputChange(event)} type="text"/>
            <button onClick={() => this.displayPlayerWins(this.state.inputValue)}>Search player</button>
            <br/><br/>
            <span>Player {this.state.inputValue} has {this.state.totalWins} wins , {this.state.totalDraws} draws and {this.state.totalLosses} loses!</span>
            <br/>
            <p>Has chosen {this.state.totalRocks} times rock, {this.state.totalScissors} times scissors
                and {this.state.totalPapers} times paper.</p>
            <MostChosen
                totalRocks={this.state.totalRockWins}
                totalPapers={this.state.totalPaperWins}
                totalScissors={this.state.totalScissorsWins}/>
            <br/>
            <DisplayPlayerGameHistory
                inputValue={this.state.inputValue}
                games= {this.state.games}
            />
            <button onClick={() => this.prevPage()}>Previous page</button>
            <button onClick={() => this.nextPage()}>Next page</button>
            {this.state.games.map((game: { gameId: string, t: number, playerA: any, playerB: any }) => {
                return <li key={game.gameId}>
                    <GameResult
                        gameId={game.gameId}
                        time={game.t}
                        playerA={game.playerA}
                        playerB={game.playerB}
                    />
                </li>
            })}
            <button onClick={() => this.prevPage()}>Previous page</button>
            <button onClick={() => this.nextPage()}>Next page</button>

        </div>
    }
}

export default DisplayRpsInfo;