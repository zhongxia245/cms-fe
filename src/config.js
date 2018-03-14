let BASE_URL = ''

if (window.location.href.indexOf('127.0.0.1') || window.location.href.indexOf('localhost') || window.location.href.indexOf('192.168')) {
  BASE_URL = 'http://127.0.0.1:7001'
}

export {
  BASE_URL
}
