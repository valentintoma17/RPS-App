import React from "react";
import axios from "axios";
import {GamePlayer} from "./GamePlayer";

export class DisplayPlayerGameHistory extends React.Component<{ inputValue: string, games: []}, any> {

    render() {
        console.log(this.props.games);
        return <div>{
            this.props.games.map((game: { gameId: string, t: number, playerA: any, playerB: any }) => {
                if (game.playerA.name.includes(this.props.inputValue) || game.playerB.name.includes(this.props.inputValue)){
                return <li key={game.gameId}>
                    <GamePlayer gameId={game.gameId}
                                time={game.t}
                                playerA={game.playerA}
                                playerB={game.playerB}/>
                </li>
            }})
            }</div>
    }}
