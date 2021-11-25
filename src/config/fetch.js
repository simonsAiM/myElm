import { baseUrl } from "./env";

export default async(url='', data = {}, type='GET', method = 'fetch') => {
  type = type.toUpperCase()
  url = baseUrl + url

  if(type == 'GET') {
    let dataStr = '' // 数据拼接字符串
    Object.keys(data).forEach(key => {
      dataStr += `${key}=${data[key]}&`;
    })

    if (dataStr !== '') {
      dataStr = dataStr.slice(0, -1)
      url = `${url}?${dataStr}`
    }
  }
  
  if (window.fetch && method ==='fetch') {
    let requestConfig = {
      // credential: 'include',
      method: type,
      headers: {
        'Accept': 'applicaiton/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      cache: 'force-cache'
    }
  
    if (type ==='POST') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      })
    }

    try {
      const response = await fetch(url, requestConfig);
      const res = await response.text()
      return res
    } catch (err) {
      throw new Error(err)
    }
  } else {
    return new Promise((resolve, reject) => {
      let requestObj;
      if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest()
      } else {
        requestObj = new ActiveXObject;
      }

      let sendData = ''
      if (type == 'POST') {
        sendData = JSON.stringify(data)
      }

      requestObj.open(type, url, true)
      requestObj.setRequestHeader('Content-type','application/x-www-form-urlencoded')
      requestObj.send(sendData)

      requestObj.onreadystatechange = () => {
        if (requestObj.readyState == 4) {
          if (requestObj.status == 200) {
            let obj = requestObj.response
            if (typeof obj !== 'object') {
              obj = JSON.parse(obj)
            }

            resolve(obj)
          } else {
            reject(requestObj)
          }
        }
      }
    })
  }
}