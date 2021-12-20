import { Route, Switch, useRouteMatch } from "react-router"

import ListPage from "./components/List";
import CreatePage from "./components/Create";
import EditPage from "./components/Edit";
import React from "react";
// import CreatePage from "./Create";

export default () => {

    const match = useRouteMatch()
    React.useEffect(() => {
        // current是获取本地数据；currentAsync是获取服务器数据
        Parse.User.currentAsync().then(user => {
            if(user?.get("employee")) {
                console.log('以下打印登录employee：')
                console.log(user)
            }
          })
        }, [])
    return (
        

        // 注册路由: 查看-新增-编辑-详情
        <Switch>
            <Route exact path={`${match.path}/?create`} component={CreatePage} />
            <Route exact path={match.path} component={ListPage} />
            <Route exact path={`${match.path}/:id/edit`} component={EditPage} />
            {/* <Route exact path={`${match.path}/:id`} component={DetailPage} /> */}
        </Switch>
    )
}