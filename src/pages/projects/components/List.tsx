import { Order } from "@/models";
import { PageContainer } from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import { Button } from "antd";
import { Link, useRouteMatch } from "react-router-dom";

const OrderListPage: React.FC = () => {

    const match = useRouteMatch();

    console.log(match.path)
    console.log(match.url)
    return (
        <PageContainer>
            <ProTable<Order, { search?: string }>
                rowKey="id"
                search={{
                    // filterType: "light"
                }}
                options={{
                    search: {
                        name: "search"
                    }
                }}
                columns={[
                    {
                        key: "#",
                        title: "序号",
                        valueType: "index",
                        dataIndex: ["id"]
                    },
                    {
                        key: "order_id", 
                        dataIndex: ["attributes", "order_id"],
                        title: "订单号",
                    },
                    {
                        key: "amount",
                        dataIndex: ["attributes", "amount"],
                        title: "总金额"
                    },
                    {
                        key: "status",
                        dataIndex: ["attributes", "status"],
                        title: "订单状态"
                    },
                    {
                        key: "pay_type",
                        dataIndex: ["attributes", "pay_type"],
                        title: "支付方式"
                    },
                    {
                        key: "$",
                        title: "操作",
                        valueType: "option",
                        dataIndex: "id",
                        // 当前行的值，当前行数据，行索引,
                        render: (id, model, index, action) => [
                            // to={`${match.path}/${id}`}
                            <Link key="detail" to={`${match.path}/${index}`} 
                            onClick={() => {
                                console.log('--------------------');
                                console.log(id);
                                console.log(model);
                                console.log(index);
                                console.log(action);
                                console.log('--------------------');
                            }}
                            >详情</Link>,
                            <Link key="edit" to={`${match.path}/${index}/edit`}>编辑</Link>,
                            <Button key="delete" size="small" onClick={() => {
                                model.destroy().then(() => action?.reload())
                            }}>删除</Button>
                        ]
                    }
                ]}
                request={async (params) => {
                    // 定义每页显示的员工人数
                    const { pageSize = 20, current = 1 } = params;

                    const offset = pageSize * (current - 1);
                    const query = new Parse.Query(Order);

                    query.limit(pageSize);
                    query.skip(offset);
                    query.withCount();

                    const data = (await query.find()) as unknown as { results: Order[], count: number }
                    console.log('data')
                    console.log(data)
                    
                    return {
                        success: true,
                        total: data.count,
                        data: data.results
                    }
                    
                    // return query.find().then(list => ({
                    //     data: list,
                    //     total: list.length
                    // }));
                }}
            />
        </PageContainer>
    )


}

export default OrderListPage;





