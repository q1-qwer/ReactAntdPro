import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import Parse from "parse";

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

import * as models from "./models";
import _ from 'lodash';
import type { User, UserAttributes } from './models/User';

// 将组件与parse服务器连接
Parse.initialize("payment_gateway_dev2", "FF5z1z2TNrGtUtpJykTKR9rwCTVeWrfP");
Parse.serverURL = "http://10.100.203.20:13371/api";
Parse.CoreManager.set("REQUEST_ATTEMPT_LIMIT", 1);
global.Parse = Parse;

// 引入models中的数据 
_.forEach(models, (parseClass, className) => {
  console.log(parseClass, className);
  // parseClass是类构造函数, className是类名
  // 注册子类
  Parse.Object.registerSubclass(className, parseClass);
})


/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

// 在整个应用加载前请求用户信息或者一些全局依赖的基础数据。这些信息通常会用于 Layout 上的基础信息（通常是用户信息），
// 权限初始化，以及很多页面都可能会用到的基础数据。
// 在 umi 的运行时配置 src/app.ts  中添加运行时配置 getInitialState ，该配置是一个 async 的 function，
// 返回的数据会被默认注入到一个 namespace 为 @@initialState 的model 中。

export async function getInitialState(): Promise<{ //Promise是函数的返回值类型
  settings?: Partial<LayoutSettings>;
  currentUser?: models.Employee;
  fetchUserInfo?: () => Promise<models.Employee | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const user = await Parse.User.current<User>()?.fetchWithInclude("employee.merchant" as keyof UserAttributes);
      return user?.get("employee");
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.get("displayName"),
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          // <Link to="/umi/plugin/openapi" target="_blank">
          //   <LinkOutlined />
          //   <span>OpenAPI 文档</span>
          // </Link>,
          // <Link to="/~docs">
          //   <BookOutlined />
          //   <span>业务组件文档</span>
          // </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};

