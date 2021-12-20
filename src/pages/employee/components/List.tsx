import { Employee } from "@/models";
import { PlusOutlined } from "@ant-design/icons";
import { PageContainer } from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import { Button } from "antd";
import { Link, useRouteMatch } from "react-router-dom";

const EmployeeListPage: React.FC = () => {

    const match = useRouteMatch();   
    console.log('以下打印match：');
    console.log(match);
    
    return (
        <PageContainer>            
            <ProTable<Employee, { search?: string }>
                rowKey="id"

                toolBarRender={() => [ 
                    <Link key="detail" to={`${match.path}/create`}>
                        <Button type="primary">
                            <PlusOutlined />添加员工
                        </Button> 
                    </Link>  
                ]}

                options={{
                    search: {
                        name: "search"
                    }
                }}

                columns={[
                    {
                        key: "index",
                        title: "序号",
                        valueType: "index",
                        dataIndex: ["id"]
                    },
                    {
                        key: "num", 
                        dataIndex: ["attributes", "num"],
                        title: "工号",
                    },
                    {
                        key: "displayName",
                        dataIndex: ["attributes", "displayName"],
                        title: "姓名"
                    },
                    {
                        key: "department",
                        search: false,
                        dataIndex: ["attributes", "department"],
                        title: "部门"
                    },
                    {
                        key: "merchant",
                        search: false,
                        dataIndex: ["attributes", "merchant","attributes", "displayName"],
                        title: "商户"
                    },
                    {
                        key: "option",
                        title: "操作",
                        valueType: "option",
                        dataIndex: ["id"],
                        render: (id, model, index, action) => [
                            // 向路由组件传递params参数  ?create
                            <Link key="detail" to={`${match.path}/${index}`}>详情</Link>,
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
                    const query = new Parse.Query(Employee);

                    query.limit(pageSize);
                    query.skip(offset);
                    query.withCount();

                    const data = (await query.find()) as unknown as { results: Employee[], count: number }
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

export default EmployeeListPage;