import Leaflet from 'leaflet';
import { CustomMap } from './map';

class MapMarkerLayer implements CustomMap.MarkerLayer {
  public readonly layer = Leaflet.layerGroup();

  constructor(public readonly map: Leaflet.Map) {
    this.layer.addTo(map);
  }

  addMarker(m: CustomMap.Marker) {
    m.marker.addTo(this.layer);
  }

  addMarkers(mArray: CustomMap.Marker[]) {
    mArray.forEach((m) => {
      this.addMarker(m);
    });
  }

  clear() {
    this.layer.clearLayers();
  }
}

export default MapMarkerLayer;
