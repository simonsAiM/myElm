/**
 * 存储localStorage
 * @param {*} name 名称
 * @param {*} content 内容
 * @returns 
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 * @param {*} name  名称
 * @returns 
 */
export const getStore = name =>{
  if (!name) return;
  return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 * @param {*} name 名称
 * @returns 
 */
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}