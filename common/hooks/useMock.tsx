import React, { useEffect, useState } from 'react';
import { getColumns, getDataSource } from '../helper';

interface Props {
  rowCount?: number; // 行数
  dataType?: 'order'; // 订单数据
  userSetting?: boolean; // 开启用户配置
  asyncData?: boolean; // 异步数据
  asyncColumns?: boolean; // 异步列定义
  appendColumns?: any[]; // 追加列，为了演示对焦
}

export function useMock(props: Props) {
  // console.log('useMock', props)
  const { dataType = 'order', rowCount, appendColumns } = props;
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);

  useEffect(() => {
    const dataSource = getDataSource(dataType, rowCount);
    setDataSource(dataSource);
  }, [rowCount]);

  useEffect(() => {
    const baseColumns = getColumns(dataType);
    const columns = appendColumns?.length ? baseColumns.concat(appendColumns) : baseColumns;
    setColumns(columns);
  }, [appendColumns]);

  return {
    dataSource,
    columns,
  };
}