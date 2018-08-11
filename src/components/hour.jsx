import React, { Component } from "react";

class Day extends Component {
  //state = {};

  render() {
    const {
      //id,
      time,
      temp,
      type,
      precip,
      direction,
      size,
      speed,
      gust
    } = this.props.hour;
    return (
      <React.Fragment>
        <tr className="hour">
          <td>
            <span title="Klockan">{time}</span>
          </td>
          <td>
            <span title="Temperatur">{temp} ℃</span>
          </td>
          <td>
            <img
              className="icon"
              src={require("./img/icons/" + type + ".png")}
              alt="Ikon"
              title={this.symbolToDescription(type)}
            />
          </td>
          <td>
            <span title="Nederbörd">{precip} mm</span>
          </td>
          <td>
            <img
              className="icon"
              src={require("./img/arrows/arrow" + size + ".png")}
              alt="Pil"
              style={{
                transform: "rotateZ(" + direction + "deg)",
                WebkitTransform: "rotate(" + direction + "deg)"
              }}
              title={direction + "° vind"}
            />
            <span title="Vindhastighet">{speed}</span>&nbsp;
            <span title="Byvindhastighet">{"(" + gust + ")"}</span>
          </td>
        </tr>
      </React.Fragment>
    );
  }

  symbolToDescription(symbol) {
    var description;
    switch (symbol) {
      case 1:
        description = "Klart";
        break;
      case 2:
        description = "Lätt molninghet";
        break;
      case 3:
        description = "Växlande molninghet";
        break;
      case 4:
        description = "Halvklart";
        break;
      case 5:
        description = "Molningt";
        break;
      case 6:
        description = "Mulet";
        break;
      case 7:
        description = "Dimma";
        break;
      case 8:
        description = "Lätta skurar";
        break;
      case 9:
        description = "Måttliga skurar";
        break;
      case 10:
        description = "Kraftiga skurar";
        break;
      case 11:
        description = "Kraftigt åskväder";
        break;
      case 12:
        description = "Lätta snöblandade skurar";
        break;
      case 13:
        description = "Måttliga snöblandade skurar";
        break;
      case 14:
        description = "Kraftiga snöblandade skurar";
        break;
      case 15:
        description = "Lätta snöbyar";
        break;
      case 16:
        description = "Måttliga snöbyar";
        break;
      case 17:
        description = "Kraftiga snöbyar";
        break;
      case 18:
        description = "Lätt regn";
        break;
      case 19:
        description = "Måttligt regn";
        break;
      case 20:
        description = "Kraftigt regn";
        break;
      case 21:
        description = "Åska";
        break;
      case 22:
        description = "Lätt snöblandat regn";
        break;
      case 23:
        description = "Måttligt snöblandat regn";
        break;
      case 24:
        description = "Kraftigt snöblandat regn";
        break;
      case 25:
        description = "Lätt snöfall";
        break;
      case 26:
        description = "Måttligt snöfall";
        break;
      case 27:
        description = "Kraftigt snöfall";
        break;
      default:
        description = "Okänt";
    }
    return description;
  }
}

export default Day;
