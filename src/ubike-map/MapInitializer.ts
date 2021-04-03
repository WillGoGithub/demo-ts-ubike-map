import Leaflet, { LatLng } from 'leaflet';
import { CustomMap } from './map';
import { MapConfig } from '../map.config';

class MapInitializer implements CustomMap.Initializer {
  constructor(
    public readonly map: Leaflet.Map,
    public readonly config: MapConfig
  ) {}

  public initialize() {
    const { map, config } = this;
    const { latLng, zoomLevel, tileLayerURL } = config;

    map.setView(latLng, zoomLevel);

    Leaflet.tileLayer(tileLayerURL).addTo(map);
  }
}

export default MapInitializer;
