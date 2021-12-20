import request from "@/utils/request"

export const getProject = async () => {
    return request('./api/project')
} 