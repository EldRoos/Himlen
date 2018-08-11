import React, { Component } from "react";
import Map from "./map";
import Day from "./day";

const today = new Date();
//const lat = 59.330646;
//const lon = 18.058631;
const nodays = 10;
const endpoint =
  "https://opendata-download-metfcst.smhi.se/api/" +
  "category/pmp3g/version/2/geotype/point/lon/{lon}/lat/{lat}/data.json";

class Period extends Component {
  state = {};

  constructor() {
    super();
    //console.log("Period - Constructior");

    //this.initState();
    this.state = {
      days: [],
      approvedTime: "",
      referenceTime: "",
      timeSeries: 0,
      selected: 0,
      lat: 59.330646,
      lon: 18.058631,
      location: "hemma"
    };
    for (var i = 0; i < nodays; i++) {
      this.state.days.push({
        id: i + 1,
        date: this.dateStr(today, i),
        day: this.weekDay(this.addDays(today, i).getDay()),
        //date: "2018-00-00",
        //day: "Nåndag",
        mintemp: 0,
        maxtemp: 0,
        up: "00:00",
        down: "00:00",
        hours: []
      });
      this.getSunTimes(i);
    }
    this.getForecast();
    this.getLocation();
  }

  handleSelect = dayId => {
    const oldselected = this.state.selected;
    //console.log("Old Selected: " + oldselected + ", New Selected: " + dayId);
    const selected = oldselected === dayId ? 0 : dayId;
    this.setState({ selected });
  };

  render() {
    return (
      <React.Fragment>
        <Map lat={this.state.lat} lon={this.state.lon} />
        <div class="row">
          <div className="title col-lg-3 col-md-4 col-sm-5">Dagsöversikt</div>
          <div className="location col-lg-9 col-md-8 col-sm-7">
            <b>Plats:</b> {this.state.location}
          </div>
        </div>
        <div class="row">
          <table className="table col-sm-12">
            <thead>
              <tr className="headerrow">
                <th width="25%">Datum</th>
                <th width="25%">Dag</th>
                <th width="25%" title="Dagens högsta och lägsta temperatur">
                  Temperatur
                </th>
                <th width="25%" title="När solen går upp och ner">
                  Soltider
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.days.map(day => (
                <Day
                  key={day.id}
                  day={day}
                  selected={this.state.selected}
                  onSelect={this.handleSelect}
                />
              ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }

  dateStr(date, days) {
    var newdate = new Date(date);
    newdate.setDate(newdate.getDate() + days);

    var dd = newdate.getDate();
    var mm = newdate.getMonth() + 1; //January is 0!
    var yyyy = newdate.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    return yyyy + "-" + mm + "-" + dd;
  }

  dateToString(date) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    return yyyy + "-" + mm + "-" + dd;
  }

  weekDay(weekday) {
    var days = [
      "Söndag",
      "Måndag",
      "Tisdag",
      "Onsdag",
      "Torsdag",
      "Fredag",
      "Lördag"
    ];
    return days[weekday];
  }

  addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  // Slow - located in USA, should be replaces by local API
  getSunTimes(index) {
    //https://api.sunrise-sunset.org/json?lat=59.330646&date=2018-07-22&lng=18.058631
    const url =
      "https://api.sunrise-sunset.org/json?lat=" +
      this.state.lat +
      "&lng=" +
      this.state.lon +
      "&date=" +
      this.state.days[index].date +
      "&formatted=0";
    const _this = this;
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        const up = new Date(json.results.sunrise);
        var uptime =
          (up.getHours() < 10 ? "0" : "") +
          up.getHours() +
          ":" +
          (up.getMinutes() < 10 ? "0" : "") +
          up.getMinutes();
        const down = new Date(json.results.sunset);
        var downtime =
          (down.getHours() < 10 ? "0" : "") +
          down.getHours() +
          ":" +
          (down.getMinutes() < 10 ? "0" : "") +
          down.getMinutes();
        const days = [..._this.state.days];
        days[index].up = uptime;
        days[index].down = downtime;
        _this.setState({ days });
      });
  }

  // SMHI
  getForecast() {
    const _this = this;
    var url = endpoint
      .replace("{lat}", this.state.lat)
      .replace("{lon}", this.state.lon);
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        const oldstate = [..._this.state];
        oldstate.approvedTime = new Date(json.approvedTime)
          .toISOString()
          .replace(/[a-zA-Z]/g, " ")
          .substr(0, 16);
        oldstate.referenceTime = new Date(json.referenceTime)
          .toISOString()
          .replace(/[a-zA-Z]/g, " ")
          .substr(0, 16);
        if (json.timeSeries == null) return;

        var lastdate = "";
        var mintemp = Number.MAX_SAFE_INTEGER;
        var maxtemp = Number.MIN_SAFE_INTEGER;
        var index = 0;
        var k = 1;

        const days = [..._this.state.days];

        //Go through all hours and store data
        for (var i = 0; i < json.timeSeries.length; i++) {
          var timeSerie = json.timeSeries[i];
          var vaidtime = timeSerie.validTime;
          var date = vaidtime.substr(0, 10);
          var time = vaidtime.substr(11, 2);

          //Initiate date
          if (lastdate.length === 0) {
            lastdate = date;
          }
          // New day, store old day data
          else if (lastdate !== date) {
            //days[index].date = date;
            //days[index].day = "";
            days[index].mintemp = mintemp;
            days[index].maxtemp = maxtemp;
            mintemp = Number.MAX_SAFE_INTEGER;
            maxtemp = Number.MIN_SAFE_INTEGER;
            lastdate = date;
            index++;
            k = 1;
          }

          // Get all needed values
          var temp = 0,
            type = 0,
            direction = 0,
            speed = 0,
            gust = 0,
            size = 0,
            precip = 0.0;
          for (var j = 0; j < timeSerie.parameters.length; j++) {
            var parameter = timeSerie.parameters[j];
            var name = parameter.name;
            var value = Number(parameter.values);
            switch (name) {
              case "t":
                temp = value;
                if (temp > maxtemp) maxtemp = temp;
                if (temp < mintemp) mintemp = temp;
                break;
              case "Wsymb2":
                type = value;
                break;
              case "ws":
                speed = value;
                break;
              case "gust":
                gust = value;
                break;
              case "wd":
                direction = value;
                break;
              case "pmean":
                precip = value;
                break;
              default:
                break;
            }
          }

          // Calcultate arrow size icon for wind
          var wind = (speed * 2 + gust) / 3;
          if (wind >= 1.5 && wind < 3.5) size = 1;
          else if (wind >= 3.5 && wind < 6) size = 2;
          else if (wind >= 6 && wind < 9) size = 3;
          else if (wind >= 9 && wind < 13) size = 4;
          else if (wind >= 13 && wind < 19) size = 5;
          else if (wind >= 19 && wind < 28) size = 6;
          else if (wind >= 28 && wind < 100) size = 7;

          // Store hours info
          if (index < days.length) {
            days[index].hours.push({
              id: k,
              time: time,
              temp: temp,
              type: type,
              speed: speed,
              gust: gust,
              direction: direction,
              precip: precip,
              size: size
            });
            k++;
          }
        }

        _this.setState(oldstate);
      });

    //return url;
  }

  // Nominatim for OpenStreetMap
  getLocation() {
    const _this = this;
    //https://nominatim.openstreetmap.org/reverse?format=json&lat=59.330646&lon=18.058631
    var url =
      "https://nominatim.openstreetmap.org/reverse?format=json&lat=" +
      this.state.lat +
      "&lon=" +
      this.state.lon;
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        const location = json.display_name;
        _this.setState({ location });
      });
  }
}

export default Period;
