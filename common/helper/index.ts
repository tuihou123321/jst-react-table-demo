// @ts-ignore
import { ArtColumn } from '../../../../../node_modules/jst-react-table';

export function getDataSource(dataType: string, rowCount: number) {
  const dataSample = dataType === 'order' ? orderDataSample : jstData;
  return copyDataSource(dataSample, rowCount);
}

export function getColumns(dataType: string) {
  const columns = dataType === 'order' ? orderColumns : jstColumns;
  return columns;
}

export function copyDataSource(dataSample: any, count = 2) {
  return [...Array(count)].map((_, index) => ({ ...dataSample, id: index }));
}

export const jstData = {
  name: '聚水潭',
  value: '水滴石穿，聚水成潭',
  date: '2014/1/24 17：32：00',
  base: '嘉兴、杭州、上海',
};

export const jstColumns = [
  { code: 'name', name: '公司名称', width: 150 },
  { code: 'value', name: '价值观', width: 150 },
  { code: 'date', name: '成立时间', width: 150 },
  { code: 'base', name: 'base地', width: 150 },
] as ArtColumn[];

export const orderDataSample = {
  oid: 30237046,
  soId: 21102140489,
  labels: '',
  goodsInfo: '商品信息文字图片',
  fullReceiver: '*X 139*****968 江苏省苏州市沧浪区****苏州**** 三****',
  shopName: '测试店铺',
  logisticsName: '顺丰快运',
  printCount: 1,
  isDeliveryPrinted: '已打印',
  saleOutStatus: '待发货',
  sellerFlag: '周末不要发货，我不在家',
  logs: '查看日志',
  weight: 1,
  actualPayAmt: 44,
  channelName: '',
  orderDate: '2021-10-20 00:00:01',
  payDate: '2021-10-20 01:00:11',
  actualPayAmt2: 44,
  payDate2: '2021-10-20 01:00:11',
};

export function getOrderDataSource(count: number) {
  return [...Array(count)].map((_, index) => ({
    ...orderDataSample,
    oid: orderDataSample.oid + index,
  }));
}

export const orderDataSource = [...Array(2000)].map((_, index) => ({
  ...orderDataSample,
  oid: orderDataSample.oid + index,
}));

export const orderColumns = [
  { code: 'oid', name: '订单号', width: 100, lock: true },
  { code: 'soId', name: '线上订单号', width: 100 },
  { code: 'labels', name: '标签', width: 100, lock: true },
  { code: 'goodsInfo', name: '商品信息', width: 100 },
  { code: 'fullReceiver', name: '收件人', width: 100 },
  { code: 'shopName', name: '店铺名称', width: 100 },
  { code: 'logisticsName', name: '快递公司/单号', width: 100 },
  { code: 'printCount', name: '快递单打印次数', width: 100, features: { sum: true } },
  { code: 'isDeliveryPrinted', name: '发货单打印', width: 100 },
  { code: 'saleOutStatus', name: '状态', width: 100 },
  { code: 'sellerFlag', name: '卖家备注 / 旗帜', width: 100 },
  { code: 'logs', name: '日志 / 详情', width: 100 },
  { code: 'weight', name: '重量', width: 100 },
  { code: 'actualPayAmt', name: '实付金额', width: 100, features: { sum: true } },
  { code: 'channelName', name: '分销商', width: 100 },
  { code: 'orderDate', name: '下单时间', width: 100, lock: true },
  { code: 'operate', name: '操作', width: 100, lock: true, render: () => '查看' },
] as ArtColumn[];

export const columnResizeUserSettingSample = {
  settingColumns: [
    { code: 'index', lock: 1, disabled: false, visible: true, width: 148 },
    { code: 'labels', lock: 0, disabled: false, visible: true, width: 172 },
    { code: 'goodsInfo', lock: 0, disabled: false, visible: true, width: 100 },
    { code: 'fullReceiver', lock: 0, disabled: false, visible: true, width: 100 },
  ],
};

export const compositeUserSettingSample = {
  settingColumns: [],
};

export const dataSource = [
  { prov: '湖北省', confirmed: 54406, cured: 4793, dead: 1457, t: '2020-02-15 19:52:02' },
  { prov: '广东省', confirmed: 1294, cured: 409, dead: 2, t: '2020-02-15 19:52:02' },
  { prov: '河南省', confirmed: 1212, cured: 390, dead: 13, t: '2020-02-15 19:52:02' },
  { prov: '浙江省', confirmed: 1162, cured: 428, dead: 0, t: '2020-02-15 19:52:02' },
  { prov: '湖南省', confirmed: 1001, cured: 417, dead: 2, t: '2020-02-15 19:52:02' },
];

export const columns = [
  { code: 'prov', name: '省份', width: 150 },
  { code: 'confirmed', name: '确诊', width: 100, align: 'right' },
  { code: 'cured', name: '治愈', width: 100, align: 'right' },
  { code: 'dead', name: '死亡', width: 100, align: 'right' },
  { code: 't', name: '最后更新时间', width: 180 },
] as ArtColumn[];

const orderDataV2 = {
  oid: 30237046,
  soId: 21102140489,
  labels: '',
  goodsInfo: '商品信息文字图片',
  fullReceiver: '*X 139*****968 江苏省苏州市沧浪区****苏州**** 三****',
  shopName: '测试店铺',
  logisticsName: '顺丰快运',
};

export const orderDataSourceV2 = [...Array(4)].map((_, i) => {
  return { ...orderDataV2, oid: 30237046 + i + '' };
});

export const orderColumnsV2 = [
  { code: 'oid', name: '订单号' },
  { code: 'soId', name: '线上订单号' },
  { code: 'labels', name: '标签' },
  { code: 'goodsInfo', name: '商品信息' },
  {
    code: 'fullReceiver',
    name: '收件人',
    features: { styles: { ellipsisRow: 2 } }, // 超过两行显示省略号 ...
  },
  { code: 'shopName', name: '店铺名称' },
  { code: 'logisticsName', name: '快递公司/单号' },
] as ArtColumn[];