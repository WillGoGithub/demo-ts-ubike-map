import { LatLngExpression } from 'leaflet';

export type MapConfig = {
  latLng: LatLngExpression;
  zoomLevel: number;
  tileLayerURL: string;
  containerId: string;
};

export default {
  latLng: [25.033, 121.5657],
  zoomLevel: 13,
  tileLayerURL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  containerId: 'map',
} as MapConfig;
