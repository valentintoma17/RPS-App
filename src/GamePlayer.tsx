import React from "react";

export class GamePlayer extends React.Component<{ gameId:string, time:number, playerA:any, playerB:any}, any>{
    calculateWinner() {
        const choiceA = this.props.playerA.played;
        const choiceB = this.props.playerB.played;
        if (choiceA === choiceB){
            return "It's a draw."
        } else if (
            (choiceA === "ROCK" && choiceB === "SCISSORS") ||
            (choiceA === "SCISSORS" && choiceB === "PAPER") ||
            (choiceA === "PAPER" && choiceB === "ROCK")) {
            return this.props.playerA.name + " has won."
        } else {
            return this.props.playerB.name + " has won."
        }
    }
    render() {
        // this.sendData();
        return <div>

            <h1>Game {this.props.gameId}</h1>
            <p>Time : {new Date(this.props.time).toLocaleDateString()}</p>
            <p>Player A: {this.props.playerA.name} played {this.props.playerA.played}</p>
            <p>Player B: {this.props.playerB.name} played {this.props.playerB.played}</p>
            <h3>{this.calculateWinner()}</h3>

        </div>
    }
}