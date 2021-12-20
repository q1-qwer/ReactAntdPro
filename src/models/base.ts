import Parse from "parse";

// 默认暴露一个类 BaseObject
export default class BaseObject<T> extends Parse.Object<T> {

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(className: string, attributes?: T, options?: any) {
        //@ts-ignore
        super(className, attributes, options);
    }

}