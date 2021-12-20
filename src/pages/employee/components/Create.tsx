import { PlusOutlined } from "@ant-design/icons";
import ProForm, { ModalForm, ProFormText } from "@ant-design/pro-form";
import { PageContainer } from "@ant-design/pro-layout";
import { Button, message } from "antd";


const Create: React.FC = () => {


    return (
    <PageContainer>
        <ModalForm<{
            name: string;
            company: string;
            }>
            title="添加员工"
            trigger={
            <Button type="primary">
              <PlusOutlined />
              添加员工
              </Button>
            }
            autoFocusFirstInput
            modalProps={{
              onCancel: () => console.log('run'),
            }}
            onFinish={async (values) => {
            // await waitTime(2000);
              console.log(values.name);
              message.success('提交成功');
              return true;
            }}
            >
            <ProForm.Group>
              <ProFormText width="md" name="number" label="工号" placeholder="请输入工号" />
              <ProFormText width="md" name="name" label="姓名" placeholder="请输入姓名" />
              <ProFormText width="md" name="department" label="部门" placeholder="请输入部门" />
            </ProForm.Group>
        </ModalForm> 
                           
    </PageContainer>
)
                    }
export default Create