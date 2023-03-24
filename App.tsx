// @ts-nocheck
import React, { useMemo, useState } from 'react';
import 'antd/dist/antd.less';
import { SumOptions, Table } from 'jst-react-table';
import Controller, { CtrlValues } from '../common/modules/Controller';
import { useMock } from '../common/hooks/useMock';
import { Button } from 'jst-components';
import { Block } from '../common/modules/Block';

// 为了 demo 演示，把关注字段突出显示
const appendColumns = [
  /*{
    code: 'actualPayAmt2',
    name: '实付金额',
    width: 100,
    // 自定义格式，存在兼容问题暂不支持
    features: { sum: true, format: (sum: any) => `${sum}元` },
  },*/
  {
    code: 'payDate2',
    name: '付款时间',
    width: 100,
    // render 方法会覆盖合计内容，业务方可通过 _sum 标记自行处理
    render: (value: any, row: any, rowIndex: number) => {
      if (row._sum) {
        return;
      }
      return '自定义内容';
    },
  },
  {
    code: 'operator',
    name: '操作',
    lock: true,
    // 合计：右侧锁列会自动处理
    render: (value: any, row: any, rowIndex: number) => {
      return <Button type={'link'}> 编辑 </Button>;
    },
  },
];

const controllerInitial = {
  pagination: true,
  tableCtrl: {
    stretchHeight: false,
  },
};

const controllerShowCtrl = {
  pagination: true,
  stretchHeight: true,
  stickyTop: true,
};

export default () => {
  const [ctrlValues, setCtrlValues] = useState<CtrlValues>({});
  const { rowCount, tableCtrl } = ctrlValues;
  const { dataSource, columns } = useMock({ rowCount, appendColumns });
  // NOTE: sum 要 memo
  const sum = useMemo(() => {
    return {
      /** 精度：默认小数点后 2 位 */
      // precision: 2,
      /** 精度自适应，整数不展示小数点，默认 true */
      // adaptive: false,
      /** 小计：table 会根据 column 的sum 标记计算 */
      subTotal: {
        // 可选，这里可以覆盖小计的字段
      },
      /** 总计，依赖服务端给到接口数据 */
      total: {
        actualPayAmt: 6000,
      },
    } as SumOptions;
  }, []);
  return (
    <>
      <Block />
      <Table
        toolbar={
          <Controller
            topCollapsable
            initialValues={controllerInitial}
            showCtrl={controllerShowCtrl}
            dataSource={dataSource}
            onChange={(values) => setCtrlValues(values)}
            marginBottom={0}
          />
        }
        dataSource={dataSource}
        columns={columns}
        sum={sum}
        features={{ rowSelect: { useKeyboard: true } }}
        {...tableCtrl}
      />
    </>
  );
};