import Leaflet from 'leaflet';
import mapConfig from '../map.config';

export default class MapSingleton {
  public readonly map = Leaflet.map(mapConfig.containerId);

  constructor() {
    if (this.map === null) {
      console.warn("Map isn't initialized.");
    }
  }

  private static Instance: Leaflet.Map | null = new MapSingleton().map;

  static getInstance(): Leaflet.Map | null {
    return this.Instance;
  }
}
