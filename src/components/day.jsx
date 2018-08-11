import React, { Component } from "react";
import Hour from "./hour";
//import Hours from "./hours";

class Day extends Component {
  //state = {};

  render() {
    const { id, date, day, mintemp, maxtemp, up, down, hours } = this.props.day;
    const { selected, onSelect } = this.props;
    return (
      <React.Fragment>
        <tr
          className={this.getDayClass(id, selected)}
          onClick={() => onSelect(id)}
        >
          <td>{date}</td>
          <td>{day}</td>
          <td>
            <span title="Dagens lägsta temperatur">{mintemp}</span>-
            <span title="Dagens högsta temperatur">{maxtemp}</span>℃
          </td>
          <td>
            <img className="sun" src={require("./img/icons/1.png")} alt="*" />
            <span title="När solen går upp">{up}</span>-
            <span title="När solen går ner">{down}</span>
          </td>
        </tr>
        {this.renderHours(id, selected, hours)}
      </React.Fragment>
    );
  }

  getDayClass(id, selected) {
    if (selected === id) return "day selected";
    return "day";
  }

  renderHours(id, selected, hours) {
    if (selected === id)
      return (
        <tr>
          <td colSpan="4">
            <table className="table">
              <thead>
                <tr className="headerrow">
                  <th>Tid</th>
                  <th>Temp</th>
                  <th>Ikon</th>
                  <th>Nederbörd</th>
                  <th>Vind</th>
                </tr>
              </thead>
              <tbody>
                {hours.map(hour => <Hour key={hour.id} hour={hour} />)}
              </tbody>
            </table>
          </td>
        </tr>
      );
  }
}

export default Day;
