import { LatLngExpression } from 'leaflet';

const OpenDataURL =
  'https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.json';

type OriginUBikeInfo = {
  sno: string; // 站點代碼
  sna: string; // 場站中文名稱
  tot: string; // 場站總停車格
  sbi: string; // 場站目前車輛數量
  sarea: string; // 場站區域 (中文)
  mday: string; // 資料更新時間
  lat: string; // 緯度
  lng: string; // 經度
  ar: string; // 地區 (中文)
  sareaen: string; // 場站區域 (英文)
  snaen: string; // 場站名稱 (英文)
  aren: string; // 地址 (英文)
  bemp: string; // 空位數量
  act: string; // 全站禁用狀態
};

type UBikeInfo = {
  availableBikes: number; // 目前自行車數量 (sbi)
  totalBikes: number; // 所有自行車格數 (tot)
  latLng: LatLngExpression; // 經緯度 (lat, lng)
  regionName: string; // 站場區域名稱 (sarea)
  stopName: string; // 站場名稱 (sna)
};

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
