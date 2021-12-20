import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { rule, addRule, updateRule, removeRule } from './service';
import type { TableListItem, TableListPagination } from './data';
import type { Order } from '@/models/Order'
import { useModel } from 'umi';
/**
 * 添加节点
 * @param fields
 */
// 返回一个布尔值
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');
  // 传入参数是类型列表
  try {
    await addRule({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
// 返回一个布尔值
const handleUpdate = async (fields: FormValueType, currentRow?: TableListItem) => {
  const hide = message.loading('正在配置');
  // 传入参数是类型列表
  try {
    await updateRule({
      ...currentRow,
      ...fields,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 * 删除节点
 * @param selectedRows
 */
// 返回一个布尔值
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};


const TableList: React.FC = () => {
    // #
    const { initialState, setInitialState } = useModel('@@initialState');
    /** 新建窗口的弹窗 */
    const [createModalVisible, handleModalVisible] = useState<boolean>(false);
    /** 分布更新窗口的弹窗 */

    // 定义状态
    const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const actionRef = useRef<ActionType>();
    const [currentRow, setCurrentRow] = useState<TableListItem>();
    const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
    /** 国际化配置 */

    // 定义表头内容
    const columns: ProColumns<TableListItem>[] = [
        {
          title: '订单编号',
          dataIndex: 'name',
          render: (dom, entity) => {
            return (
              <a
                onClick={() => {
                  setCurrentRow(entity);
                  setShowDetail(true);
                }}
              >
                {dom}
              </a>
            );
          },
        },
        {
          title: '创建者',
          dataIndex: 'desc_name',
          valueType: 'textarea',
        },
        {
          title: '创建者ID',
          dataIndex: 'callNo',
          sorter: true,
          hideInForm: true,
          renderText: (val: string) => `${val}万`,
        },
        {
          title: '订单状态',
          dataIndex: 'status',
          hideInForm: true,
          valueEnum: {
            0: {
              text: '关闭',
              status: 'Default',
            },
            1: {
              text: '运行中',
              status: 'Processing',
            },
            2: {
              text: '已上线',
              status: 'Success',
            },
            3: {
              text: '异常',
              status: 'Error',
            },
          },
        },
        
        {
          title: '操作',
          dataIndex: 'option',
          valueType: 'option',
          render: (_, record) => [
            <a
              key="config"
              onClick={() => {
                handleUpdateModalVisible(true);
                setCurrentRow(record);
              }}
            >
              配置
            </a>,
            <a key="subscribeAlert" href="https://procomponents.ant.design/">
              订阅警报
            </a>,
          ],
        },
    ];

    // const fetchUserInfo = async () => {
    //   const userInfo = await initialState?.fetchUserInfo?.();
    //   if (userInfo) {
    //     console.log(userInfo);
        
    //     await setInitialState((s) => ({
    //       ...s,
    //       currentUser: userInfo,
    //     }));
    //   }
      
    // };

    return (
      <PageContainer>
        <ProTable<TableListItem, TableListPagination>
          headerTitle="订单列表"
          actionRef={actionRef}
          rowKey="key"
          search={{
            labelWidth: 120,
          }}
          toolBarRender={() => [
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                handleModalVisible(true);
              }}
            >
              <PlusOutlined /> 新建订单
            </Button>,
          ]}
          // 获取规则列表
          request={rule}
          columns={columns}
          rowSelection={{
            onChange: (_, selectedRows) => {
              setSelectedRows(selectedRows);
            },
          }}
        />
        {selectedRowsState?.length > 0 && (
          <FooterToolbar
            extra={
              <div>
                已选择{' '}
                <a
                  style={{
                    fontWeight: 600,
                  }}
                >
                  {selectedRowsState.length}
                </a>{' '}
                项 &nbsp;&nbsp;
                <span>
                  服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)} 万
                </span>
              </div>
            }
          >
            <Button
              onClick={async () => {
                await handleRemove(selectedRowsState);
                setSelectedRows([]);
                actionRef.current?.reloadAndRest?.();
              }}
            >
              批量删除
            </Button>
            <Button type="primary">批量审批</Button>
          </FooterToolbar>
        )}
        {/* 新建规则表单提交 */}
        <ModalForm
          title="新建规则222"
          width="400px"
          visible={createModalVisible}
          onVisibleChange={handleModalVisible}
          onFinish={async (value) => {
            const success = await handleAdd(value as TableListItem);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
        >
          {/* 提交表单提示项 */}
          <ProFormText
            rules={[
              {
                required: true,
                message: '规则名称为必填项111',
              },
            ]}
            width="md"
            name="name"
          />
          <ProFormTextArea width="md" name="desc_name" />
        </ModalForm>

        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value, currentRow);

            if (success) {
              handleUpdateModalVisible(false);
              setCurrentRow(undefined);

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
          }}
          updateModalVisible={updateModalVisible}
          values={currentRow || {}}
        />

        <Drawer
          width={600}
          visible={showDetail}
          onClose={() => {
            setCurrentRow(undefined);
            setShowDetail(false);
          }}
          closable={false}
        >
          {currentRow?.name && (
            <ProDescriptions<TableListItem>
              column={2}
              title={currentRow?.name}
              request={async () => ({
                data: currentRow || {},
              })}
              params={{
                id: currentRow?.name,
              }}
              columns={columns as ProDescriptionsItemProps<TableListItem>[]}
            />
          )}
        </Drawer>
      </PageContainer>
    );
};

export default TableList;
