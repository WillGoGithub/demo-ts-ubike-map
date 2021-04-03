import Leaflet, { LatLngExpression } from 'leaflet';
import { CustomMap } from './map';

class MapMarker implements CustomMap.Marker {
  public marker: Leaflet.Marker;

  private constructor(latLng: LatLngExpression) {
    this.marker = Leaflet.marker(latLng);
  }

  static create(latLng: LatLngExpression): MapMarker {
    return new MapMarker(latLng);
  }

  public bindTooltip(content: string) {
    const { marker } = this;

    marker.bindTooltip(content);

    marker.on('mouseover', () => {
      marker.openTooltip();
    });

    marker.on('mouseleave', () => {
      marker.closeTooltip();
    });
  }
}

export default MapMarker;
