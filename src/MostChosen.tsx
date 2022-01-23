import React from "react";

export class MostChosen extends React.Component<{ totalRocks: any, totalPapers: any, totalScissors: any }> {
    calculateMostChosen(){
        if ( this.props.totalRocks > this.props.totalScissors && this.props.totalRocks > this.props.totalPapers){
            return "Has won the most (" + this.props.totalRocks + " times) by choosing rock. ";
        }
        if (this.props.totalScissors > this.props.totalRocks && this.props.totalScissors > this.props.totalPapers){
            return "Has won the most (" + this.props.totalScissors + " times) choosing scissors."
        } else if (this.props.totalPapers > this.props.totalRocks && this.props.totalPapers > this.props.totalScissors) {
            return "Has won the most (" + this.props.totalPapers + " times) by choosing paper. "
        }}
    render() {
        return <h3>{this.calculateMostChosen()}</h3>;
    }
}