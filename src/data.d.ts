import { LatLngExpression } from 'leaflet';

declare type District =
  | '中正區'
  | '大同區'
  | '中山區'
  | '松山區'
  | '大安區'
  | '萬華區'
  | '信義區'
  | '士林區'
  | '北投區'
  | '內湖區'
  | '南港區'
  | '文山區';

declare type OriginUBikeInfo = {
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

declare type UBikeInfo = {
  availableBikes: number; // 目前自行車數量 (sbi)
  totalBikes: number; // 所有自行車格數 (tot)
  latLng: LatLngExpression; // 經緯度 (lat, lng)
  regionName: District; // 站場區域名稱 (sarea)
  stopName: string; // 站場名稱 (sna)
};
