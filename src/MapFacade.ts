import Leaflet, { LatLngExpression } from 'leaflet';
import MapSingleton from './ubike-map/MapSingleton';
import MapInitializer from './ubike-map/MapInitializer';
import MapMarkerLayer from './ubike-map/MapMarkerLayer';
import MapMarker from './ubike-map/MapMarker';
import { MapConfig } from './map.config';
import { UBikeInfo } from './data/data';

export default class UBikeMapFacade {
  private map: Leaflet.Map | null = MapSingleton.getInstance();
  private mapInitializer: MapInitializer;
  private mapMarkLayer: MapMarkerLayer;

  constructor(
    config: MapConfig,
    public tooltipTemplate: (data: UBikeInfo) => string
  ) {
    if (this.map === null) {
      throw new Error(`Map isn't correctly initialized.`);
    }

    this.mapInitializer = new MapInitializer(this.map, config);
    this.mapMarkLayer = new MapMarkerLayer(this.map);
    this.mapInitializer.initialize();
  }

  pinStops(data: UBikeInfo[]) {
    const markers = data.map((info) => {
      const marker = MapMarker.create(info.latLng);
      marker.bindTooltip(this.tooltipTemplate(info));

      return marker;
    });

    this.mapMarkLayer.addMarkers(markers);
  }

  clearStop() {
    this.mapMarkLayer.clear();
  }

  flyTo(latLng?: LatLngExpression) {
    if (latLng) {
      this.map?.flyTo(latLng);
    }
  }
}
