import React, { Component } from "react";
import axios from "axios";


export default class TimeButtoms extends Component {
    constructor(props){
        super(props);


        this.handleHourWorked = this.handleHourWorked.bind(this);
        this.handleMinutesWorked = this.handleMinutesWorked.bind(this);
    }

    handleHourWorked = () => {
        console.log("1 HR");
        
    }
    
    handleMinutesWorked = () => {
        console.log("15 Min");
    }

    
  
    render() {
    return (
      <div>
        <button className="project-btm" onClick={() => this.handleHourWorked()}>
        Hour Worked
        </button>
        <button className="project-btm" onClick={() => this.handleMinutesWorked()}>
        Minutes Worked
        </button>
      </div>
    );
  }
}