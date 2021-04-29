export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType // 用于指定response返回data类型
  timeout?: number
}

export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'patch'
  | 'PATCH'

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

// axios 函数返回的是一个 Promise 对象，我们可以定义一个 AxiosPromise 接口，它继承于 Promise<AxiosResponse> 这个泛型接口
export interface AxiosPromise extends Promise<AxiosResponse> {}

export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}

// 定义一个 Axios 类型接口，它描述了 Axios 类中的公共方法
export interface Axios {
  request<T = any>(config: AxiosRequestConfig): AxiosPromise

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
}

export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise

  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise
}
