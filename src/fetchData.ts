import { LatLngExpression } from 'leaflet';
import { OriginUBikeInfo, UBikeInfo } from './data';

const OpenDataURL =
  'https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.json';

export default function fetchUBikeData(url = OpenDataURL) {
  return fetch(url)
    .then((result) => result.json())
    .then(({ retVal }) =>
      Object.keys(retVal).map((key) => retVal[key] as OriginUBikeInfo)
    )
    .then((originInfo) =>
      originInfo.map(
        (originInfo) =>
          ({
            availableBikes: parseInt(originInfo.sbi, 10),
            totalBikes: parseInt(originInfo.tot, 10),
            latLng: <LatLngExpression>[
              parseFloat(originInfo.lat),
              parseFloat(originInfo.lng),
            ],
            regionName: originInfo.sarea,
            stopName: originInfo.sna,
          } as UBikeInfo)
      )
    );
}
