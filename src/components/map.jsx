import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
//import { Map, TileLayer, CircleMarker, Popup } from "react-leaflet";
import Leaflet from "leaflet";

const markericon = new Leaflet.Icon({
  iconUrl: require("./img/leaflet/marker-icon-2x.png"),
  shadowUrl: require("./img/leaflet/marker-shadow.png"),
  iconSize: [52, 82], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

const southWest = [52.50044, 2.250475];
const northEast = [70.742227, 37.934697];
//const bounds = L.latLngBounds(southWest, northEast);

export default class DraggableMap extends Component {
  state = {
    center: {
      lat: 59.330646,
      lng: 18.058631
    },
    marker: {
      lat: 59.330646,
      lng: 18.058631
    },
    bounds: {
      southWest: { lat: 52.50044, lng: 2.250475 },
      northEast: { lat: 70.742227, lng: 37.934697 }
    },
    zoom: 7,
    draggable: true
  };
  refmarker = React.createRef();

  toggleDraggable = () => {
    this.setState({ draggable: !this.state.draggable });
  };

  updatePosition = () => {
    const { lat, lng } = this.refmarker.current.leafletElement.getLatLng();
    this.setState({
      marker: { lat, lng }
    });
  };

  render() {
    const position = [this.state.center.lat, this.state.center.lng];
    const markerPosition = [this.state.marker.lat, this.state.marker.lng];

    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          minZoom={5}
          maxZoom={13}
          maxBounds={this.state.bound}
        />
        <Marker
          icon={markericon}
          draggable={this.state.draggable}
          onDragend={this.updatePosition}
          //   onClick={this.updatePosition}
          position={markerPosition}
          ref={this.refmarker}
        >
          <Popup minWidth={90}>
            <span onClick={this.toggleDraggable}>
              {this.state.draggable ? "DRAG MARKER" : "MARKER FIXED"}
            </span>
          </Popup>
        </Marker>
      </Map>
    );
  }
}
