import request from '@/axios'
import type { UserLoginResponseType, UserType } from './types'

interface RoleParams {
  roleName: string
}

export const loginApi = (data: UserType): Promise<IResponse<UserLoginResponseType>> => {
  return request.post({ url: '/base/login/', data })
}

export const loginOutApi = (): Promise<IResponse> => {
  return request.post({ url: '/base/logout/' })
}

export const getUserListApi = ({ params }: AxiosConfig) => {
  return request.get<{
    code: string
    data: {
      list: UserType[]
      total: number
    }
  }>({ url: '/mock/user/list', params })
}

export const getAdminRoleApi = (
  params: RoleParams
): Promise<IResponse<AppCustomRouteRecordRaw[]>> => {
  return request.get({ url: '/mock/role/list', params })
}

export const getTestRoleApi = (params: RoleParams): Promise<IResponse<string[]>> => {
  return request.get({ url: '/mock/role/list2', params })
}

// 修改密码
export const changePassworddApi = (data: any): Promise<IResponse> => {
  return request.post({ url: '/base/users/changePassword/', data })
}
