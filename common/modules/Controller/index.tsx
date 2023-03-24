import { Divider, Form, Input, InputNumber, Select, Space, Switch } from 'jst-components';
import React, { useEffect, useMemo, useState } from 'react';
import styles from './index.less';

// 默认显示
const DefaultShowCtrl = {
  rowCount: true,
  pagination: false,
  stretchHeight: false,
  stickyTop: false,
};

export interface CtrlValues {
  rowCount: number;
  tableCtrl: {
    stretchHeight: boolean;
    stickyTop: number;
    pagination: any;
  };
}

const DefaultValues = {
  rowCount: 2,
  tableCtrl: {
    stickyTop: 0,
  },
};

interface Props {
  // 控制显示隐藏
  initialValues: any;
  showCtrl: {
    rowCount: boolean;
    pagination: boolean;
    stretchHeight: boolean;
    stickyTop: boolean;
  };
  onChange: (ctrlValues: CtrlValues) => void;
  dataSource: any[];
  // 修改默认的分页行为
  pagination: any;
  marginBottom: number;
  // 是否上方有折叠区域
  topCollapsable: boolean;
}

export default function Controller(props: Props) {
  const initialValues = { ...DefaultValues, ...props.initialValues };
  const showCtrl = { ...DefaultShowCtrl, ...props.showCtrl };
  const [current, setCurrent] = useState(1);
  // 默认折叠，能覆盖临界场景
  const [collapsed, setCollapsed] = useState(true);
  const { dataSource = [] } = props;

  const paginationOptions = useMemo(() => {
    return {
      mode: 'fixedBottom',
      current,
      pageSize: 50,
      total: dataSource.length,
      onChange: (pageNum: number, pageSize: number) => {
        setCurrent(pageNum);
      },
    };
  }, [setCurrent, dataSource]);

  const handleFormChange = (changedValues: any, allValues: any) => {
    // console.log('Controller handleFormChange', allValues);
    onChange(allValues);
  };

  const onChange = (formValues: any) => {
    const { rowCount, pagination, tableCtrl = {} } = formValues;
    tableCtrl.pagination = pagination ? paginationOptions : undefined;
    const data = { rowCount, tableCtrl };
    console.log('--> tableProps onChange', tableCtrl);
    props.onChange?.(data);
  };

  useEffect(() => {
    onChange(initialValues);
  }, []);

  return (
    <>
      {props.topCollapsable ? (
        <div
          className={styles.collapse}
          style={{ height: collapsed ? 40 : 120 }}
          onClick={() => setCollapsed((prev) => !prev)}
        >
          点击可{collapsed ? '展开' : '折叠'}
        </div>
      ) : null}
      <div style={{ padding: '0px 16px' }}>
        <Form layout="inline" initialValues={initialValues} onValuesChange={handleFormChange}>
          {showCtrl.rowCount ? (
            <Form.Item label="数据行数" name={'rowCount'}>
              <InputNumber min={0} max={2000} />
            </Form.Item>
          ) : null}

          {showCtrl.stickyTop ? (
            <Form.Item
              label="stickyTop"
              tooltip={'表头吸顶后，距离顶部的距离，默认为 0'}
              name={['tableCtrl', 'stickyTop']}
            >
              <InputNumber min={0} max={100} />
            </Form.Item>
          ) : null}

          {showCtrl.pagination ? (
            <Form.Item label="分页" tooltip={''} name={'pagination'} valuePropName="checked">
              <Switch />
            </Form.Item>
          ) : null}

          {showCtrl.stretchHeight ? (
            <Form.Item
              label={'stretchHeight'}
              tooltip="页面高度不足可视区域时自动撑满剩余高度，默认随页面滚动 stretchHeight:{mode: pageScroll}"
              name={['tableCtrl', 'stretchHeight']}
            >
              <StretchHeightSwitch />
            </Form.Item>
          ) : null}
        </Form>
      </div>
      <Divider dashed style={{ marginTop: 8, marginBottom: props.marginBottom ?? 16 }} />
    </>
  );
}

function StretchHeightSwitch(props: any) {
  const [data, setData] = useState(null);
  const [enable, setEnable] = useState(false);

  useEffect(() => {
    // console.log('StretchHeightSwitch change', data);
    props.onChange(data ? data : false);
  }, [data]);

  return (
    <Space size={16}>
      <Switch
        onChange={(checked: boolean) => {
          setEnable(checked);
          setData(checked ? { mode: 'pageScroll' } : null);
        }}
      />
      {enable ? (
        <Input.Group compact>
          <Select
            style={{ width: 100 }}
            defaultValue="pageScroll"
            onChange={(v) => {
              setData((prev) => {
                return { ...prev, mode: v };
              });
            }}
          >
            <Select.Option value="pageScroll">随页面滚动</Select.Option>
            <Select.Option value="tableScroll">表格内滚动</Select.Option>
          </Select>
          <InputNumber
            min={-100}
            max={100}
            placeholder={'偏移量'}
            onChange={(v) => {
              setData((prev) => {
                return { ...prev, offsetBottom: v };
              });
            }}
          />
        </Input.Group>
      ) : null}
    </Space>
  );
}