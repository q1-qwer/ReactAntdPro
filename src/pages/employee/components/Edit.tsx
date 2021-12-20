import ProForm, { ProFormText } from "@ant-design/pro-form";
import { PageContainer } from "@ant-design/pro-layout";
import { Button, Card } from "antd";
import React, { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { Employee } from "@/models";


const Edit: React.FC = () => { 
    // initialValues需要在组件中直接使用，所以需要定义成一个外部的变量，且能被修改
    const [initialValues, setInitialValues] = useState(undefined)
    // 在这里测试数据可以直接被挂载到页面上
    // initialValues.name = '张三'  
    // initialValues.number = 123456
    // initialValues.department = '设计部'
    // initialValues.merchant = 'A公司'
    // console.log('initialValues：')
    // console.log(initialValues)

    const match = useRouteMatch(); 
    console.log('以下打印match')
    console.log(match)
    
    // useEffect在组件挂载之后执行
    React.useEffect(() => {
        const query = new Parse.Query(Employee)
        query.find().then(function(results) {
        //   console.log('以下打印results[1].attributes')
        //   console.log(results[1].attributes)
          setInitialValues({
            name: '123'
          })
        })
    }, [])
    
    console.log(initialValues)
    return (
        <PageContainer>
            <Card>
                <ProForm
                    initialValues={ initialValues }

                    // 提交按钮相关配置
                    submitter={{
                        // 配置按钮文本
                        searchConfig: {
                            resetText: '重置',
                            submitText: '提交',
                        },
                        // 配置按钮的属性
                        resetButtonProps: {
                            style: {
                                // 隐藏重置按钮
                                display: 'none',
                            },
                        },
                        // 提交按钮的 props？
                        submitButtonProps: {},

                        // 完全自定义整个区域
                        render: (props) => {
                            return [
                                <Button key="rest" onClick={() => props.form?.resetFields()}>
                                重置
                                </Button>,
                                <Button type="primary" key="submit" onClick={() => props.form?.submit?.()}>
                                提交
                                </Button>
                            ];
                        },
                    }}
                >

                <ProForm.Group key = "ProFormGroup" >
                  <ProFormText width="md" name="num" label="工号" />
                  <ProFormText width="md" name="displayName" label="姓名" />
                  <ProFormText width="md" name="department" label="部门" />
                </ProForm.Group>
             </ProForm>       
            </Card> 
        </PageContainer>
    )
}

export default Edit