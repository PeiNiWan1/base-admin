export interface UserLoginType {
  phone: string
  password: string
}

export interface UserType {
  phone: string
  password: string
  role: string
  roleId: string
}

export interface UserLoginResponseType {
  token: string
  user: User
  [property: string]: any
}

export interface User {
  date_joined: string
  email: string
  first_name: string
  groups: string[]
  id: number
  is_active: boolean
  is_staff: boolean
  is_superuser: boolean
  last_login: null
  last_name: string
  password: string
  phone: string
  user_permissions: string[]
  username: string
  [property: string]: any
}
