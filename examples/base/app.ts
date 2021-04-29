import axios, { AxiosError } from '../../src/index'

// axios('/base/get',{
//   method: 'get',
//   params: {
//     a: 1,
//     b: 2
//   }
// })

// axios({
//   method: 'post',
//   url: '/base/post',
//   data: {
//     a: 1,
//     b: 2
//   },
//   timeout: 2000
// }).then(res => {
//   console.log(res)
// }).catch((e: AxiosError) => {
//   console.log(e.message)
// })

// axios.post('/base/post', { msg: 'post' })


interface ResponseData<T = any> {
  code: number
  result: T
  message: string
}

interface User {
  name: string
  age: number
}

function getUser<T>() {
  return axios.get<ResponseData<T>>('/base/get')
    .then(res => res.data)
    .catch(err => console.error(err))
}


async function test() {
  const user = await getUser<User>()
  if (user) {
    console.log(user.result.name)
  }
}

test()
