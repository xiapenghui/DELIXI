/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * 异常处理程序
 */

const errorHandler = (error) => {
  console.log('errorHandler12', error)
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }

  return response;
};
/**
 * 配置request请求时的默认参数
 */

const request = extend({
  errorHandler,
  // 默认错误处理
  // credentials: 'include', // 默认请求是否带上cookie
});
export default request;



// /* global window */
// import axios from 'axios'
// import qs from 'qs'
// import jsonp from 'jsonp'
// import lodash from 'lodash'
// import pathToRegexp from 'path-to-regexp'
// import { message } from 'antd'
// // import { YQL, CORS } from '../../config/config'

// import Cookies from 'js-cookie'
// // import { CORS } from '../../config/config';
// const fetch = (options) => {
//   let {
//     method = 'get',
//     data,
//     fetchType,
//     url,
//     headers
//   } = options
//   const cloneData = lodash.cloneDeep(data)

//   try {
//     let domin = ''
//     if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
//       domin = url.match(/[a-zA-z]+:\/\/[^/]*/)[0]
//       url = url.slice(domin.length)
//     }
//     const match = pathToRegexp.parse(url)
//     url = pathToRegexp.compile(url)(data)
//     for (let item of match) {
//       if (item instanceof Object && item.name in cloneData) {
//         delete cloneData[item.name]
//       }
//     }
//     url = domin + url
//   } catch (e) {
//     message.error(e.message)
//   }

//   if (fetchType === 'JSONP') {
//     return new Promise((resolve, reject) => {
//       jsonp(url, {
//         param: `${qs.stringify(data)}&callback`,
//         name: `jsonp_${new Date().getTime()}`,
//         timeout: 4000,
//       }, (error, result) => {
//         if (error) {
//           reject(error)
//         }
//         resolve({ statusText: 'OK', status: 200, data: result })
//       })
//     })
//   } else if (fetchType === 'YQL') {
//     url = `http://query.yahooapis.com/v1/public/yql?q=select * from json where url='${options.url}?${encodeURIComponent(qs.stringify(options.data))}'&format=json`
//     data = null
//   }

//   switch (method.toLowerCase()) {
//     case 'get':
//       return axios.get(url, {
//         params: cloneData,
//         headers: headers
//       })
//     case 'delete':
//       return axios.delete(url, {
//         data: cloneData,
//         headers: headers
//       })
//     case 'post':
//       return axios.post(url, cloneData, { headers })
//     case 'put':
//       return axios.put(url, cloneData, { headers })
//     case 'patch':
//       return axios.patch(url, cloneData)
//     default:
//       return axios(options)
//   }
// }

// export default function request(options) {

//   // if (options.url && options.url.indexOf('//') > -1) {  //判断options参数是否有域名
//   //   const origin = `${options.url.split('//')[0]}//${options.url.split('//')[1].split('/')[0]}`
//   //   // console.log("(options.url && options.url.indexOf('//') > -1", origin, options)
//   //   if (window.location.origin !== origin) {
//   //     if (CORS && CORS.indexOf(origin) > -1) {
//   //       console.log("cors", cors)
//   //       options.fetchType = 'CORS'
//   //     } else if (YQL && YQL.indexOf(origin) > -1) {
//   //       console.log("YQL", YQL)
//   //       options.fetchType = 'YQL'
//   //     } else {
//   //       console.log("JSONP")
//   //       options.fetchType = 'JSONP'
//   //     }
//   //   }
//   // }
//   const tokenParams = Cookies.get('token')
//   console.log('options-test',options)
//   const optionsParams = {
//     ...options,
//     headers: {
//       Authorization: tokenParams == null ? null : `Bearer ${tokenParams}`,
//       // 'Content-Type': options.label!=='processCreate'? 'application/json;charset=UTF-8':'multipart/form-data'
//       // 'Content-Type':'multipart/form-data'
//       // 'content-type': 'application/x-www-form-urlencoded'
//     }
//   }
//   return fetch(optionsParams).then((response) => {
//     console.log('fetchtest')
//     const { statusText, status } = response
//     let data = options.fetchType === 'YQL' ? response.data.query.results.json : response.data
//     if (data instanceof Array) {
//       data = {
//         list: data,
//       }
//     }
//     return Promise.resolve({
//       success: true,
//       message: statusText,
//       statusCode: status,
//       ...data,
//     })
//   }).catch((error) => {
//     const { response } = error
//     let msg
//     let statusCode
//     if (response && response instanceof Object) {
//       const { data, statusText } = response
//       statusCode = response.status
//       msg = data.message || statusText
//     } else {
//       statusCode = 600
//       msg = error.message || 'Network Error'
//     }
//     return Promise.reject({ success: false, statusCode, message: msg })
//   })
// }
