import Leaflet, { LatLngExpression, Marker } from 'leaflet';
import { MapConfig } from '../map.config';

declare namespace CustomMap {
  export interface Initializer {
    readonly map: Leaflet.Map;
    readonly config: MapConfig;
    initialize(): void;
  }

  export interface MarkerLayer {
    readonly map: Leaflet.Map;
    readonly layer: Leaflet.LayerGroup;
    addMarker(marker: Marker): void;
    addMarkers(markers: Marker[]): void;
    clear(): void;
  }

  export interface Marker {
    marker: Leaflet.Marker;
    bindTooltip(content: string): void;
  }
}
