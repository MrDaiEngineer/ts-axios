import { isDate, isObject, isPlainObject } from './utils'

function encode(val: string): string {
  return encodeURIComponent(val)
}

export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }
  const parts: string[] = []

  Object.keys(params).forEach(key => {
    let val = params[key]
    if (val === null || val === undefined) return

    // 先对数组、对象、日期等类型数据的特殊之处进行处理，再通过统一方法实现（聚合）
    let values: string[] = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })
  let serializedParams = parts.join('&')
  if (serializedParams) {
    const markIndex = url.indexOf('#')
    // 删除url中的hash
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}
