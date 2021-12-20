import type { Employee } from "./Employee";

// 导出类型 UserAttributes
export type UserAttributes = {
    employee?: Employee
}

// 导出类型 User
export type User = Parse.User<UserAttributes>;