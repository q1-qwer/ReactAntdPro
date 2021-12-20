import { Route, Switch, useRouteMatch } from "react-router"


import ListPage from "./components/List";
import DetailPage from "./components/Detail";
import CreatePage from "./components/Create";
import EditPage from "./components/Edit";

export default () => {

    const match = useRouteMatch();
    console.log('以下打印项目');
    
    console.log(match)

    return (
        <Switch>
            <Route path={match.path} component={ListPage} />
            <Route path={`${match.path}/?create`} component={CreatePage} />
            <Route path={`${match.path}/:id/edit`} component={EditPage} />
            <Route path={`${match.path}/:id`} component={DetailPage} />
        </Switch>
    )

}